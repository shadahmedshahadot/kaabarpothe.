import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import NotificationController from './notification.controller';

const router = Router();

router.get('/', auth(UserRole.USER, UserRole.ADMIN), NotificationController.List);
router.get('/unread-count', auth(UserRole.USER, UserRole.ADMIN), NotificationController.UnreadCount);
router.patch('/read-all', auth(UserRole.USER, UserRole.ADMIN), NotificationController.MarkAllRead);
router.patch('/:id/read', auth(UserRole.USER, UserRole.ADMIN), NotificationController.MarkRead);
router.delete('/:id', auth(UserRole.USER, UserRole.ADMIN), NotificationController.Delete);

export const NotificationRoutes = router;
