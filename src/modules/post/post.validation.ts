import z from 'zod'

export const postBaseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  published: z.boolean().default(false).optional(),
})

export const createPostZodSchema = z.object({
  body: postBaseSchema,
})

export const updatePostZodSchema = z.object({
  body: postBaseSchema.partial(),
})

export const getPostParamZodSchema = z.object({
  params: z.object({
    id: z.string().uuid('must be a valid UUID'),
  }),
})

export const getAllPostsZodSchema = z.object({
  query: z.object({
    // filtering
    searchTerm: z.string().trim().optional(),
    published: z
      .string()
      .transform(val => val === 'true')
      .optional(),
    authorId: z.string().uuid().optional(),

    // pagination
    page: z.coerce.number().positive().optional(),
    limit: z.coerce.number().positive().max(100).optional(),

    // sorting
    sortBy: z.enum(['title', 'createdAt', 'updatedAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
})
