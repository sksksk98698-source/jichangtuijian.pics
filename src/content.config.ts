import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Astro 7 Content Layer API: each collection declares a `loader`.
// Authors add Markdown/MDX files under the `base` directories below.
const works = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      brandName: z.string().optional(),
      rank: z.number().optional(),
      affLink: z.string().optional(),
      promoCode: z.string().optional(),
      entryPrice: z.string().optional(),
      lineType: z.string().optional(),
      hasSpeedtestImage: z.boolean().default(false),
      speedtestImage: z.string().optional(),
      unlockImages: z.array(z.string()).default([]),
      dataStatus: z.enum(['measured', 'vendor', 'pending']).default('vendor'),
      verifiedDate: z.string().optional(),
      tech: z.array(z.string()).default([]),
      link: z.string().optional(),
      repo: z.string().optional(),
      thumbnail: image().optional(),
      order: z.number().optional(),
      publishDate: z.coerce.date(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      description: z.string(),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
    }),
});

export const collections = { works, blog };
