import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import pick from '../../utils/pick'
import sendResponse from '../../utils/sendResponse'
import { postService } from './post.service'

const createPost = catchAsync(async (req: Request, res: Response) => {
  const authorId = req.user?.userId as string
  const result = await postService.createPost(authorId, req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Post created successfully',
    data: result,
  })
})

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const result = await postService.getPostById(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post retrieved successfully',
    data: result,
  })
})

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const filterOptions = pick(req.query, ['searchTerm', 'published', 'authorId'])
  const paginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])

  const result = await postService.getAllPosts(filterOptions, paginationOptions)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Posts retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const updatePostById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const userId = req.user?.userId as string

  const result = await postService.updatePostById(id, userId, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post updated successfully',
    data: result,
  })
})

const deletePostById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string
  const userId = req.user?.userId as string

  await postService.deletePostById(id, userId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post deleted successfully',
  })
})

export const postController = {
  createPost,
  getPostById,
  getAllPosts,
  updatePostById,
  deletePostById,
}
