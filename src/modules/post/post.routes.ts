import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { userRole } from '../user/user.constants'
import { postController } from './post.controller'
import {
  createPostZodSchema,
  getAllPostsZodSchema,
  getPostParamZodSchema,
  updatePostZodSchema,
} from './post.validation'

const router = express.Router()

router.post(
  '/',
  auth(userRole.admin, userRole.user),
  validateRequest(createPostZodSchema),
  postController.createPost
)

router.get('/', validateRequest(getAllPostsZodSchema), postController.getAllPosts)

router.get('/:id', validateRequest(getPostParamZodSchema), postController.getPostById)

router.patch(
  '/:id',
  auth(userRole.admin, userRole.user),
  validateRequest(getPostParamZodSchema),
  validateRequest(updatePostZodSchema),
  postController.updatePostById
)

router.delete(
  '/:id',
  auth(userRole.admin, userRole.user),
  validateRequest(getPostParamZodSchema),
  postController.deletePostById
)

export const postRoutes = router
