import type { MetadataRoute } from 'next'
import { SITE } from '@/constants/site'

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    '/admin',
    '/admin/*',
    '/pilgrim',
    '/pilgrim/*',
    '/login',
    '/register',
    '/booking',
    '/booking/*',
    '/api',
    '/api/*',
    '/_next/',
  ]

  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'Google-Extended',
    'GoogleOther',
    'Applebot-Extended',
    'PerplexityBot',
    'Perplexity-User',
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    'CCBot',
    'cohere-ai',
    'Bytespider',
    'Amazonbot',
    'DuckAssistBot',
    'MistralAI-User',
    'meta-externalagent',
    'FacebookBot',
  ]

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...aiBots.map(userAgent => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
