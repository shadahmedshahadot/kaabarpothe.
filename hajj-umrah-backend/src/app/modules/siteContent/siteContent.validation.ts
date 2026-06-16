import { z } from 'zod';

const HeroStat = z.object({
  value: z.number(),
  suffix: z.string().optional().nullable(),
  decimals: z.number().int().optional().nullable(),
  label: z.string(),
});

const ReflectionItem = z.object({
  label: z.string(),
  value: z.string(),
});

const UpsertHeroSchema = z.object({
  body: z.object({
    videoId: z.string(),
    badge: z.string(),
    titleStart: z.string(),
    titleHighlight: z.string(),
    description: z.string(),
    ctaUmrah: z.string(),
    ctaHajj: z.string(),
    trustBadges: z.array(z.string()).default([]),
    reflectionEyebrow: z.string(),
    reflectionQuote: z.string(),
    reflectionRef: z.string(),
    reflectionItems: z.array(ReflectionItem).default([]),
    stats: z.array(HeroStat).default([]),
  }),
});

const SiteContentValidation = { UpsertHeroSchema };
export default SiteContentValidation;
