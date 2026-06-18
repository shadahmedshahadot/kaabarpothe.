import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { userRouter } from '../modules/user/user.router';
import { PackageRoutes } from '../modules/package/package.routes';
import { HotelRoutes } from '../modules/hotel/hotel.routes';
import { FlightRoutes } from '../modules/flight/flight.routes';
import { TransportRoutes } from '../modules/transport/transport.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';
import { InquiryRoutes } from '../modules/inquiry/inquiry.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { FaqRoutes } from '../modules/faq/faq.routes';
import { TestimonialRoutes } from '../modules/testimonial/testimonial.routes';
import { SiteContentRoutes } from '../modules/siteContent/siteContent.routes';
import { UserDocumentRoutes } from '../modules/userDocument/userDocument.routes';
import { UploadRoutes } from '../modules/upload/upload.routes';
import { NotificationRoutes } from '../modules/notification/notification.routes';

const router = express.Router();

type Route = {
  path: string;
  route: express.Router;
};

const routes: Route[] = [
  { path: '/auth', route: AuthRoutes },
  { path: '/user', route: userRouter },
  { path: '/packages', route: PackageRoutes },
  { path: '/hotels', route: HotelRoutes },
  { path: '/flights', route: FlightRoutes },
  { path: '/transports', route: TransportRoutes },
  { path: '/bookings', route: BookingRoutes },
  { path: '/payments', route: PaymentRoutes },
  { path: '/inquiries', route: InquiryRoutes },
  { path: '/blogs', route: BlogRoutes },
  { path: '/faqs', route: FaqRoutes },
  { path: '/testimonials', route: TestimonialRoutes },
  { path: '/site-content', route: SiteContentRoutes },
  { path: '/documents', route: UserDocumentRoutes },
  { path: '/uploads', route: UploadRoutes },
  { path: '/notifications', route: NotificationRoutes },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
