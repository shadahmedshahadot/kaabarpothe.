import { Router } from 'express';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import SiteContentController from './siteContent.controller';
import SiteContentValidation from './siteContent.validation';

const router = Router();

router.get('/hero', SiteContentController.GetHero);
router.put(
  '/hero',
  auth(UserRole.ADMIN),
  validateRequest(SiteContentValidation.UpsertHeroSchema),
  SiteContentController.UpsertHero,
);

export const SiteContentRoutes = router;
