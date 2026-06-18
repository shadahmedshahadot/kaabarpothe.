import httpStatus from 'http-status';
import { BookingDocumentStatus, BookingStatus, MessageSenderRole, NotificationType, Prisma } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import calculatePagination from '../../utils/pagination';

type ListQuery = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  status?: string;
  paymentStatus?: string;
  packageId?: string;
  userId?: string;
  search?: string;
};

const sanitizeDates = (input: any) => {
  if (input.departureDate) input.departureDate = new Date(input.departureDate);
  if (input.returnDate) input.returnDate = new Date(input.returnDate);
  if (input.pilgrimPassportExp) input.pilgrimPassportExp = new Date(input.pilgrimPassportExp);
  return input;
};

const sanitizeTravelers = (travelers: any[]) =>
  travelers.map(t => ({
    ...t,
    dateOfBirth: new Date(t.dateOfBirth),
    passportExpiry: new Date(t.passportExpiry),
  }));

const generateBookingCode = (type: string) =>
  `${type === 'HAJJ' ? 'HJ' : 'UM'}-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;

const statusToNotificationType: Record<string, NotificationType> = {
  PENDING_REVIEW: NotificationType.BOOKING_RECEIVED,
  DOCUMENTS_REQUIRED: NotificationType.DOCUMENTS_REQUESTED,
  UNDER_VERIFICATION: NotificationType.STATUS_UPDATED,
  WAITING_FOR_PAYMENT: NotificationType.STATUS_UPDATED,
  PAYMENT_RECEIVED: NotificationType.PAYMENT_APPROVED,
  VISA_PROCESSING: NotificationType.VISA_UPDATE,
  FLIGHT_RESERVED: NotificationType.FLIGHT_ASSIGNED,
  HOTEL_RESERVED: NotificationType.HOTEL_ASSIGNED,
  TRANSPORTATION_CONFIRMED: NotificationType.TRANSPORTATION_ASSIGNED,
  CONFIRMED: NotificationType.BOOKING_CONFIRMED,
  COMPLETED: NotificationType.BOOKING_COMPLETED,
  CANCELLED: NotificationType.BOOKING_CANCELLED,
  REJECTED: NotificationType.BOOKING_CANCELLED,
};

const statusLabel: Record<string, string> = {
  PENDING: 'Pending',
  PENDING_REVIEW: 'Pending Review',
  DOCUMENTS_REQUIRED: 'Documents Required',
  UNDER_VERIFICATION: 'Under Verification',
  WAITING_FOR_PAYMENT: 'Waiting for Payment',
  PAYMENT_RECEIVED: 'Payment Received',
  VISA_PROCESSING: 'Visa Processing',
  FLIGHT_RESERVED: 'Flight Reserved',
  HOTEL_RESERVED: 'Hotel Reserved',
  TRANSPORTATION_CONFIRMED: 'Transportation Confirmed',
  CONFIRMED: 'Confirmed',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  REJECTED: 'Rejected',
};

type Actor = { id: string; full_name: string; role: string } | JwtPayload | undefined;
const actorId = (a: Actor) => (a as any)?.id ?? null;
const actorName = (a: Actor) => (a as any)?.full_name ?? (a as any)?.name ?? 'System';
const actorRole = (a: Actor): MessageSenderRole =>
  (a as any)?.role === 'ADMIN' ? MessageSenderRole.ADMIN : MessageSenderRole.USER;

const recordTimelineTx = async (
  tx: Prisma.TransactionClient,
  bookingId: string,
  eventType: string,
  title: string,
  description: string | null,
  performer: Actor,
  visibleToUser = true,
  metadata?: any,
) => {
  await tx.bookingTimelineEvent.create({
    data: {
      bookingId,
      eventType,
      title,
      description,
      performedById: actorId(performer),
      performedByName: actorName(performer),
      visibleToUser,
      metadata,
    },
  });
};

const recordActivityTx = async (
  tx: Prisma.TransactionClient,
  bookingId: string | null,
  action: string,
  admin: Actor,
  details?: any,
  note?: string,
) => {
  await tx.adminActivityLog.create({
    data: {
      bookingId,
      adminId: actorId(admin),
      adminName: actorName(admin),
      action,
      details,
      note,
    },
  });
};

const notifyTx = async (
  tx: Prisma.TransactionClient,
  userId: string | null | undefined,
  bookingId: string,
  type: NotificationType,
  title: string,
  message: string,
  link?: string,
  metadata?: any,
) => {
  if (!userId) return;
  await tx.notification.create({
    data: { userId, bookingId, type, title, message, link, metadata },
  });
};

const CreateBooking = async (payload: any, user?: JwtPayload) => {
  const pkg = await prisma.package.findFirst({ where: { id: payload.packageId, isDeleted: false } });
  if (!pkg) throw new AppError(httpStatus.NOT_FOUND, 'Package not found');

  if (payload.flightId) {
    const flight = await prisma.flight.findFirst({ where: { id: payload.flightId, isDeleted: false } });
    if (!flight) throw new AppError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  if (payload.hotelId) {
    const hotel = await prisma.hotel.findFirst({ where: { id: payload.hotelId, isDeleted: false } });
    if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'Hotel not found');
  }
  if (payload.transportId) {
    const transport = await prisma.transport.findFirst({ where: { id: payload.transportId, isDeleted: false } });
    if (!transport) throw new AppError(httpStatus.NOT_FOUND, 'Transport not found');
  }

  const { travelers, requestedDocuments, ...rest } = sanitizeDates(payload);
  const bookingCode = rest.bookingCode || generateBookingCode(pkg.type);

  return prisma.$transaction(async tx => {
    const booking = await tx.booking.create({
      data: {
        ...rest,
        bookingCode,
        packageName: pkg.name,
        packageType: pkg.type,
        userId: user?.id ?? null,
        status: BookingStatus.PENDING_REVIEW,
        travelers: travelers ? { create: sanitizeTravelers(travelers) } : undefined,
      },
      include: { travelers: true, package: true },
    });

    await tx.bookingStatusHistory.create({
      data: {
        bookingId: booking.id,
        fromStatus: null,
        toStatus: BookingStatus.PENDING_REVIEW,
        changedById: actorId(user),
        changedByName: actorName(user),
        note: 'Booking request submitted',
      },
    });

    await recordTimelineTx(
      tx,
      booking.id,
      'BOOKING_SUBMITTED',
      'Booking Submitted',
      'Your booking request has been received. Our team will review it shortly.',
      user,
      true,
    );

    await recordActivityTx(tx, booking.id, 'BOOKING_CREATED', user, { bookingCode });

    if (Array.isArray(requestedDocuments) && requestedDocuments.length) {
      await tx.bookingDocument.createMany({
        data: requestedDocuments.map((d: any) => ({
          bookingId: booking.id,
          type: d.type ?? d,
          name: d.name ?? d.type ?? String(d),
          description: d.description ?? null,
          status: BookingDocumentStatus.REQUESTED,
        })),
      });
    }

    if (user?.id) {
      await notifyTx(
        tx,
        user.id,
        booking.id,
        NotificationType.BOOKING_RECEIVED,
        'Booking request received',
        `Your booking ${bookingCode} has been received and is pending review.`,
        `/pilgrim/bookings/${bookingCode}`,
      );
    }

    return booking;
  });
};

const GetAllBookings = async (query: ListQuery, user?: JwtPayload) => {
  const { page, limit, skip, sort, order } = calculatePagination(query);
  const where: Prisma.BookingWhereInput = { isDeleted: false };

  if (user && user.role !== 'ADMIN') {
    where.userId = user.id;
  } else if (query.userId) {
    where.userId = query.userId;
  }

  if (query.status) where.status = query.status as any;
  if (query.paymentStatus) where.paymentStatus = query.paymentStatus as any;
  if (query.packageId) where.packageId = query.packageId;
  if (query.search) {
    where.OR = [
      { bookingCode: { contains: query.search, mode: 'insensitive' } },
      { pilgrimName: { contains: query.search, mode: 'insensitive' } },
      { pilgrimEmail: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const sortField = ['createdAt', 'bookedDate', 'departureDate', 'totalAmount'].includes(sort) ? sort : 'createdAt';

  const [data, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortField]: order as 'asc' | 'desc' },
      include: {
        travelers: true,
        payments: true,
        package: true,
        assignedConsultant: { select: { id: true, full_name: true, email: true, avatar: true } },
      },
    }),
    prisma.booking.count({ where }),
  ]);
  return { data, meta: { page, limit, total } };
};

const GetSingleBooking = async (idOrCode: string, user?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({
    where: { OR: [{ id: idOrCode }, { bookingCode: idOrCode }], isDeleted: false },
    include: {
      travelers: true,
      payments: true,
      package: true,
      user: { select: { id: true, full_name: true, email: true, phone: true, avatar: true } },
      assignedConsultant: { select: { id: true, full_name: true, email: true, avatar: true } },
      statusHistory: { orderBy: { createdAt: 'asc' } },
      timelineEvents: { orderBy: { createdAt: 'asc' } },
      documents: { orderBy: { requestedAt: 'desc' } },
      messages: { orderBy: { createdAt: 'asc' } },
      assignments: {
        include: { staff: { select: { id: true, full_name: true, email: true, avatar: true } } },
        orderBy: { assignedAt: 'desc' },
      },
    },
  });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  if (user && user.role !== 'ADMIN' && booking.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't view this booking");
  }
  return booking;
};

const UpdateBooking = async (id: string, payload: any, admin?: JwtPayload) => {
  const exists = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  const { travelers, ...data } = sanitizeDates(payload);

  return prisma.$transaction(async tx => {
    if (travelers) {
      await tx.bookingTraveler.deleteMany({ where: { bookingId: id } });
      await tx.bookingTraveler.createMany({
        data: sanitizeTravelers(travelers).map((t: any) => ({ ...t, bookingId: id })),
      });
    }
    const updated = await tx.booking.update({
      where: { id },
      data,
      include: { travelers: true, payments: true, package: true },
    });
    await recordActivityTx(tx, id, 'BOOKING_UPDATED', admin, data);
    return updated;
  });
};

const DeleteBooking = async (id: string, admin?: JwtPayload) => {
  const exists = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!exists) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  await prisma.$transaction(async tx => {
    await tx.booking.update({ where: { id }, data: { isDeleted: true } });
    await recordActivityTx(tx, id, 'BOOKING_DELETED', admin);
  });
};

const UpdateStatus = async (id: string, payload: { status: BookingStatus; note?: string }, admin?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  const newStatus = payload.status;
  const oldStatus = booking.status;
  if (oldStatus === newStatus) return booking;

  return prisma.$transaction(async tx => {
    const updateData: any = { status: newStatus };
    if (newStatus === BookingStatus.PAYMENT_RECEIVED) updateData.paymentStatus = 'PAID';

    const updated = await tx.booking.update({
      where: { id },
      data: updateData,
      include: { travelers: true, package: true },
    });

    await tx.bookingStatusHistory.create({
      data: {
        bookingId: id,
        fromStatus: oldStatus,
        toStatus: newStatus,
        changedById: actorId(admin),
        changedByName: actorName(admin),
        note: payload.note,
      },
    });

    const title = `Status: ${statusLabel[newStatus] ?? newStatus}`;
    await recordTimelineTx(
      tx,
      id,
      `STATUS_${newStatus}`,
      title,
      payload.note ?? null,
      admin,
      true,
    );
    await recordActivityTx(tx, id, 'STATUS_UPDATED', admin, { from: oldStatus, to: newStatus }, payload.note);

    if (booking.userId) {
      await notifyTx(
        tx,
        booking.userId,
        id,
        statusToNotificationType[newStatus] ?? NotificationType.STATUS_UPDATED,
        `Booking ${booking.bookingCode} updated`,
        `Status changed to ${statusLabel[newStatus] ?? newStatus}.`,
        `/pilgrim/bookings/${booking.bookingCode}`,
      );
    }

    return updated;
  });
};

const AssignConsultant = async (
  id: string,
  payload: { staffId: string; role?: 'CONSULTANT' | 'STAFF'; note?: string },
  admin?: JwtPayload,
) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  const staff = await prisma.user.findUnique({ where: { id: payload.staffId } });
  if (!staff) throw new AppError(httpStatus.NOT_FOUND, 'Staff user not found');

  return prisma.$transaction(async tx => {
    const updated = await tx.booking.update({
      where: { id },
      data: { assignedConsultantId: staff.id },
      include: { assignedConsultant: { select: { id: true, full_name: true, email: true, avatar: true } } },
    });

    await tx.bookingAssignment.create({
      data: {
        bookingId: id,
        staffId: staff.id,
        role: payload.role === 'STAFF' ? 'STAFF' : 'CONSULTANT',
        assignedById: actorId(admin),
      },
    });

    await recordTimelineTx(
      tx,
      id,
      'CONSULTANT_ASSIGNED',
      'Consultant Assigned',
      `${staff.full_name} has been assigned to your booking.`,
      admin,
      true,
      { staffId: staff.id, staffName: staff.full_name },
    );

    await recordActivityTx(tx, id, 'CONSULTANT_ASSIGNED', admin, { staffId: staff.id, staffName: staff.full_name });

    if (booking.userId) {
      await notifyTx(
        tx,
        booking.userId,
        id,
        NotificationType.STATUS_UPDATED,
        'Consultant assigned',
        `${staff.full_name} is now handling your booking.`,
        `/pilgrim/bookings/${booking.bookingCode}`,
      );
    }
    return updated;
  });
};

const RequestDocuments = async (
  id: string,
  payload: { documents: Array<{ type: string; name?: string; description?: string }> },
  admin?: JwtPayload,
) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  if (!Array.isArray(payload.documents) || !payload.documents.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Provide at least one document');
  }

  return prisma.$transaction(async tx => {
    const created = await Promise.all(
      payload.documents.map(d =>
        tx.bookingDocument.create({
          data: {
            bookingId: id,
            type: d.type,
            name: d.name ?? d.type,
            description: d.description,
            status: BookingDocumentStatus.REQUESTED,
          },
        }),
      ),
    );

    await tx.booking.update({ where: { id }, data: { status: BookingStatus.DOCUMENTS_REQUIRED } });

    await recordTimelineTx(
      tx,
      id,
      'DOCUMENTS_REQUESTED',
      'Documents Requested',
      `Please upload: ${payload.documents.map(d => d.name ?? d.type).join(', ')}`,
      admin,
      true,
      { documents: created.map(d => ({ id: d.id, type: d.type, name: d.name })) },
    );

    await recordActivityTx(tx, id, 'DOCUMENTS_REQUESTED', admin, { count: created.length });

    if (booking.userId) {
      await notifyTx(
        tx,
        booking.userId,
        id,
        NotificationType.DOCUMENTS_REQUESTED,
        'Documents requested',
        `Please upload ${created.length} document(s) for booking ${booking.bookingCode}.`,
        `/pilgrim/bookings/${booking.bookingCode}`,
      );
    }

    return created;
  });
};

const UploadDocument = async (
  id: string,
  payload: { documentId?: string; type?: string; name?: string; fileUrl: string; fileName?: string },
  actor?: JwtPayload,
) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  return prisma.$transaction(async tx => {
    let doc;
    if (payload.documentId) {
      doc = await tx.bookingDocument.update({
        where: { id: payload.documentId },
        data: {
          fileUrl: payload.fileUrl,
          fileName: payload.fileName,
          status: BookingDocumentStatus.UPLOADED,
          uploadedAt: new Date(),
          uploadedById: actorId(actor),
          uploadedByRole: actorRole(actor),
        },
      });
    } else {
      doc = await tx.bookingDocument.create({
        data: {
          bookingId: id,
          type: payload.type ?? 'OTHER',
          name: payload.name ?? payload.fileName ?? 'Document',
          fileUrl: payload.fileUrl,
          fileName: payload.fileName,
          status: BookingDocumentStatus.UPLOADED,
          uploadedAt: new Date(),
          uploadedById: actorId(actor),
          uploadedByRole: actorRole(actor),
        },
      });
    }

    await recordTimelineTx(
      tx,
      id,
      'DOCUMENT_UPLOADED',
      'Document Uploaded',
      `${doc.name} uploaded.`,
      actor,
      true,
      { documentId: doc.id },
    );

    if (actorRole(actor) === MessageSenderRole.ADMIN) {
      await recordActivityTx(tx, id, 'DOCUMENT_UPLOADED', actor, { documentId: doc.id });
      if (booking.userId) {
        await notifyTx(
          tx,
          booking.userId,
          id,
          NotificationType.DOCUMENTS_UPLOADED,
          'Document available',
          `A document has been uploaded to your booking.`,
          `/pilgrim/bookings/${booking.bookingCode}`,
        );
      }
    }

    return doc;
  });
};

const VerifyDocument = async (
  id: string,
  documentId: string,
  payload: { status: 'VERIFIED' | 'REJECTED'; reason?: string },
  admin?: JwtPayload,
) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  return prisma.$transaction(async tx => {
    const doc = await tx.bookingDocument.update({
      where: { id: documentId },
      data: {
        status: payload.status as BookingDocumentStatus,
        verifiedAt: payload.status === 'VERIFIED' ? new Date() : null,
        rejectionReason: payload.status === 'REJECTED' ? payload.reason : null,
      },
    });

    await recordTimelineTx(
      tx,
      id,
      `DOCUMENT_${payload.status}`,
      `Document ${payload.status === 'VERIFIED' ? 'Verified' : 'Rejected'}`,
      `${doc.name}${payload.reason ? ` — ${payload.reason}` : ''}`,
      admin,
      true,
    );

    await recordActivityTx(tx, id, `DOCUMENT_${payload.status}`, admin, { documentId, reason: payload.reason });
    return doc;
  });
};

const SendMessage = async (
  id: string,
  payload: { content: string; attachments?: string[] },
  actor?: JwtPayload,
) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  if (actor && actor.role !== 'ADMIN' && booking.userId !== actor.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't message on this booking");
  }
  if (!payload.content?.trim()) throw new AppError(httpStatus.BAD_REQUEST, 'Message content required');

  return prisma.$transaction(async tx => {
    const msg = await tx.bookingMessage.create({
      data: {
        bookingId: id,
        senderId: actorId(actor),
        senderName: actorName(actor),
        senderRole: actorRole(actor),
        content: payload.content,
        attachments: payload.attachments ?? [],
      },
    });

    if (actorRole(actor) === MessageSenderRole.ADMIN) {
      await recordActivityTx(tx, id, 'MESSAGE_SENT', actor, { messageId: msg.id });
      if (booking.userId) {
        await notifyTx(
          tx,
          booking.userId,
          id,
          NotificationType.MESSAGE_RECEIVED,
          'New message',
          payload.content.slice(0, 120),
          `/pilgrim/bookings/${booking.bookingCode}`,
        );
      }
    }

    return msg;
  });
};

const ListMessages = async (id: string, user?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  if (user && user.role !== 'ADMIN' && booking.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't view these messages");
  }
  return prisma.bookingMessage.findMany({ where: { bookingId: id }, orderBy: { createdAt: 'asc' } });
};

const ListTimeline = async (id: string, user?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  if (user && user.role !== 'ADMIN' && booking.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't view this timeline");
  }
  const where: Prisma.BookingTimelineEventWhereInput = { bookingId: id };
  if (user && user.role !== 'ADMIN') where.visibleToUser = true;
  return prisma.bookingTimelineEvent.findMany({ where, orderBy: { createdAt: 'asc' } });
};

const ListDocuments = async (id: string, user?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  if (user && user.role !== 'ADMIN' && booking.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, "You can't view these documents");
  }
  return prisma.bookingDocument.findMany({ where: { bookingId: id }, orderBy: { requestedAt: 'desc' } });
};

const ListActivityLog = async (id: string) => {
  return prisma.adminActivityLog.findMany({ where: { bookingId: id }, orderBy: { createdAt: 'desc' } });
};

const ListStatusHistory = async (id: string, user?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  if (user && user.role !== 'ADMIN' && booking.userId !== user.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  return prisma.bookingStatusHistory.findMany({ where: { bookingId: id }, orderBy: { createdAt: 'asc' } });
};

const UpdateAdminNotes = async (id: string, notes: { adminNotes?: string; notes?: string }, admin?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  return prisma.$transaction(async tx => {
    const updated = await tx.booking.update({
      where: { id },
      data: { adminNotes: notes.adminNotes ?? booking.adminNotes, notes: notes.notes ?? booking.notes },
    });
    await recordActivityTx(tx, id, 'NOTES_UPDATED', admin, notes);
    return updated;
  });
};

const AssignFlight = async (id: string, flightId: string, admin?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  const flight = await prisma.flight.findFirst({ where: { id: flightId, isDeleted: false } });
  if (!flight) throw new AppError(httpStatus.NOT_FOUND, 'Flight not found');
  return prisma.$transaction(async tx => {
    const updated = await tx.booking.update({ where: { id }, data: { flightId, status: BookingStatus.FLIGHT_RESERVED } });
    await tx.bookingStatusHistory.create({
      data: { bookingId: id, fromStatus: booking.status, toStatus: BookingStatus.FLIGHT_RESERVED, changedById: actorId(admin), changedByName: actorName(admin), note: `Flight ${flight.flightNumber} assigned` },
    });
    await recordTimelineTx(tx, id, 'FLIGHT_ASSIGNED', 'Flight Reserved', `${flight.airlineName} ${flight.flightNumber}`, admin, true, { flightId });
    await recordActivityTx(tx, id, 'FLIGHT_ASSIGNED', admin, { flightId, flightNumber: flight.flightNumber });
    if (booking.userId) {
      await notifyTx(tx, booking.userId, id, NotificationType.FLIGHT_ASSIGNED, 'Flight reserved', `${flight.airlineName} ${flight.flightNumber} reserved.`, `/pilgrim/bookings/${booking.bookingCode}`);
    }
    return updated;
  });
};

const AssignHotel = async (id: string, hotelId: string, admin?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  const hotel = await prisma.hotel.findFirst({ where: { id: hotelId, isDeleted: false } });
  if (!hotel) throw new AppError(httpStatus.NOT_FOUND, 'Hotel not found');
  return prisma.$transaction(async tx => {
    const updated = await tx.booking.update({ where: { id }, data: { hotelId, status: BookingStatus.HOTEL_RESERVED } });
    await tx.bookingStatusHistory.create({
      data: { bookingId: id, fromStatus: booking.status, toStatus: BookingStatus.HOTEL_RESERVED, changedById: actorId(admin), changedByName: actorName(admin), note: `Hotel ${hotel.name} assigned` },
    });
    await recordTimelineTx(tx, id, 'HOTEL_ASSIGNED', 'Hotel Reserved', hotel.name, admin, true, { hotelId });
    await recordActivityTx(tx, id, 'HOTEL_ASSIGNED', admin, { hotelId, name: hotel.name });
    if (booking.userId) {
      await notifyTx(tx, booking.userId, id, NotificationType.HOTEL_ASSIGNED, 'Hotel reserved', `${hotel.name} reserved.`, `/pilgrim/bookings/${booking.bookingCode}`);
    }
    return updated;
  });
};

const AssignTransport = async (id: string, transportId: string, admin?: JwtPayload) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  const transport = await prisma.transport.findFirst({ where: { id: transportId, isDeleted: false } });
  if (!transport) throw new AppError(httpStatus.NOT_FOUND, 'Transport not found');
  return prisma.$transaction(async tx => {
    const updated = await tx.booking.update({ where: { id }, data: { transportId, status: BookingStatus.TRANSPORTATION_CONFIRMED } });
    await tx.bookingStatusHistory.create({
      data: { bookingId: id, fromStatus: booking.status, toStatus: BookingStatus.TRANSPORTATION_CONFIRMED, changedById: actorId(admin), changedByName: actorName(admin), note: `Transport ${transport.name} assigned` },
    });
    await recordTimelineTx(tx, id, 'TRANSPORTATION_ASSIGNED', 'Transportation Confirmed', transport.name, admin, true, { transportId });
    await recordActivityTx(tx, id, 'TRANSPORTATION_ASSIGNED', admin, { transportId, name: transport.name });
    if (booking.userId) {
      await notifyTx(tx, booking.userId, id, NotificationType.TRANSPORTATION_ASSIGNED, 'Transportation confirmed', `${transport.name} confirmed.`, `/pilgrim/bookings/${booking.bookingCode}`);
    }
    return updated;
  });
};

const UpdatePayment = async (
  id: string,
  payload: { paidAmount?: number; paymentStatus?: 'UNPAID' | 'PARTIAL' | 'PAID' | 'REFUNDED'; note?: string },
  admin?: JwtPayload,
) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  return prisma.$transaction(async tx => {
    const updated = await tx.booking.update({
      where: { id },
      data: {
        paidAmount: payload.paidAmount ?? booking.paidAmount,
        paymentStatus: payload.paymentStatus ?? booking.paymentStatus,
      },
    });
    if (payload.paymentStatus === 'PAID') {
      await tx.booking.update({ where: { id }, data: { status: BookingStatus.PAYMENT_RECEIVED } });
      await tx.bookingStatusHistory.create({
        data: { bookingId: id, fromStatus: booking.status, toStatus: BookingStatus.PAYMENT_RECEIVED, changedById: actorId(admin), changedByName: actorName(admin), note: payload.note ?? 'Payment received' },
      });
    }
    await recordTimelineTx(tx, id, 'PAYMENT_UPDATED', 'Payment Updated', payload.note ?? `Payment status: ${payload.paymentStatus ?? booking.paymentStatus}`, admin, true, payload);
    await recordActivityTx(tx, id, 'PAYMENT_UPDATED', admin, payload);
    if (booking.userId && payload.paymentStatus === 'PAID') {
      await notifyTx(tx, booking.userId, id, NotificationType.PAYMENT_APPROVED, 'Payment received', `We received your payment for ${booking.bookingCode}.`, `/pilgrim/bookings/${booking.bookingCode}`);
    }
    return updated;
  });
};

const UpdateVisa = async (
  id: string,
  payload: { visaStatus: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'; note?: string },
  admin?: JwtPayload,
) => {
  const booking = await prisma.booking.findFirst({ where: { id, isDeleted: false } });
  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  return prisma.$transaction(async tx => {
    const updated = await tx.booking.update({
      where: { id },
      data: { visaStatus: payload.visaStatus, status: payload.visaStatus === 'SUBMITTED' ? BookingStatus.VISA_PROCESSING : booking.status },
    });
    await recordTimelineTx(tx, id, `VISA_${payload.visaStatus}`, `Visa ${payload.visaStatus.toLowerCase()}`, payload.note ?? null, admin, true);
    await recordActivityTx(tx, id, `VISA_${payload.visaStatus}`, admin, payload);
    if (booking.userId) {
      await notifyTx(tx, booking.userId, id, NotificationType.VISA_UPDATE, `Visa ${payload.visaStatus.toLowerCase()}`, payload.note ?? `Visa status updated to ${payload.visaStatus}.`, `/pilgrim/bookings/${booking.bookingCode}`);
    }
    return updated;
  });
};

const BookingService = {
  CreateBooking,
  GetAllBookings,
  GetSingleBooking,
  UpdateBooking,
  DeleteBooking,
  UpdateStatus,
  AssignConsultant,
  RequestDocuments,
  UploadDocument,
  VerifyDocument,
  SendMessage,
  ListMessages,
  ListTimeline,
  ListDocuments,
  ListActivityLog,
  ListStatusHistory,
  UpdateAdminNotes,
  AssignFlight,
  AssignHotel,
  AssignTransport,
  UpdatePayment,
  UpdateVisa,
};
export default BookingService;
