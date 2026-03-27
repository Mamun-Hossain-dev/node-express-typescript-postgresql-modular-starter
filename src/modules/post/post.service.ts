import { Prisma } from '@prisma/client'
import AppError from '../../errors/AppError'
import pagination from '../../utils/pagination'
import { postRepository } from './post.repository'

type PostFilterOptions = {
  searchTerm?: string
  published?: boolean
  authorId?: string
}

type PostPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

const createPost = async (authorId: string, payload: { title: string; content: string; published?: boolean }) => {
  return postRepository.create({
    title: payload.title,
    content: payload.content,
    published: payload.published ?? false,
    author: {
      connect: { id: authorId },
    },
  })
}

const getPostById = async (id: string) => {
  const post = await postRepository.findById(id)
  if (!post) {
    throw new AppError(404, 'Post not found')
  }
  return post
}

const getAllPosts = async (
  filterOptions: PostFilterOptions,
  paginationOptions: PostPaginationOptions
) => {
  const { searchTerm, published, authorId } = filterOptions
  const { page, limit, skip, sortBy, sortOrder } = pagination(paginationOptions)

  const andConditions: Prisma.PostWhereInput[] = []

  if (searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' as Prisma.QueryMode } },
        { content: { contains: searchTerm, mode: 'insensitive' as Prisma.QueryMode } },
      ],
    })
  }

  if (published !== undefined) {
    andConditions.push({ published })
  }

  if (authorId) {
    andConditions.push({ authorId })
  }

  const whereCondition: Prisma.PostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const orderBy: Prisma.PostOrderByWithRelationInput =
    sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' }

  const [posts, total] = await Promise.all([
    postRepository.findMany({
      where: whereCondition,
      orderBy,
      skip,
      take: limit,
    }),
    postRepository.count(whereCondition),
  ])

  return {
    data: posts,
    meta: {
      total,
      page,
      limit,
    },
  }
}

const updatePostById = async (
  id: string,
  userId: string,
  updateData: Prisma.PostUpdateInput
) => {
  const existingPost = await postRepository.findById(id)
  if (!existingPost) {
    throw new AppError(404, 'Post not found')
  }

  if (existingPost.authorId !== userId) {
    throw new AppError(403, 'You are not authorized to update this post')
  }

  return postRepository.update(id, updateData)
}

const deletePostById = async (id: string, userId: string) => {
  const post = await postRepository.findById(id)
  if (!post) {
    throw new AppError(404, 'Post not found')
  }

  if (post.authorId !== userId) {
    throw new AppError(403, 'You are not authorized to delete this post')
  }

  return postRepository.remove(id)
}

export const postService = {
  createPost,
  getPostById,
  getAllPosts,
  updatePostById,
  deletePostById,
}
