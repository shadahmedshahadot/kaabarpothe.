import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';

const HERO_KEY = 'hero';

const GetHero = async () => {
  const hero = await prisma.siteContent.findUnique({
    where: { key: HERO_KEY },
    include: {
      stats: { orderBy: { position: 'asc' } },
      reflectionItems: { orderBy: { position: 'asc' } },
    },
  });
  if (!hero) throw new AppError(httpStatus.NOT_FOUND, 'Hero content not found');
  return hero;
};

const UpsertHero = async (payload: any) => {
  const { stats, reflectionItems, ...data } = payload;
  return prisma.$transaction(async tx => {
    await tx.siteContent.upsert({
      where: { key: HERO_KEY },
      update: data,
      create: { key: HERO_KEY, ...data },
    });
    await tx.heroStat.deleteMany({ where: { siteContentKey: HERO_KEY } });
    await tx.heroReflectionItem.deleteMany({ where: { siteContentKey: HERO_KEY } });
    if (stats?.length) {
      await tx.heroStat.createMany({
        data: stats.map((s: any, i: number) => ({ ...s, siteContentKey: HERO_KEY, position: i })),
      });
    }
    if (reflectionItems?.length) {
      await tx.heroReflectionItem.createMany({
        data: reflectionItems.map((r: any, i: number) => ({ ...r, siteContentKey: HERO_KEY, position: i })),
      });
    }
    return tx.siteContent.findUnique({
      where: { key: HERO_KEY },
      include: {
        stats: { orderBy: { position: 'asc' } },
        reflectionItems: { orderBy: { position: 'asc' } },
      },
    });
  });
};

const SiteContentService = { GetHero, UpsertHero };
export default SiteContentService;
