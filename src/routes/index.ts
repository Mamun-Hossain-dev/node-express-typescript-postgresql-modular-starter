import express from 'express'
import { authRoutes } from '../modules/auth/auth.routes'
import { postRoutes } from '../modules/post/post.routes'
import { userRoutes } from '../modules/user/user.routes'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/posts',
    route: postRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
