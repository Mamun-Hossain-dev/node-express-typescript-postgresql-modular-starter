import { Prisma } from '@prisma/client'
import prisma from '../../lib/prisma'

const create = async (data: Prisma.PostCreateInput) => {
  return prisma.post.create({
    data,
    include: {
      author: {
        omit: { password: true },
      },
    },
  })
}

const findById = async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        omit: { password: true },
      },
    },
  })
}

const findMany = async (params: {
  where?: Prisma.PostWhereInput
  orderBy?: Prisma.PostOrderByWithRelationInput
  skip?: number
  take?: number
}) => {
  return prisma.post.findMany({
    where: params.where,
    orderBy: params.orderBy,
    skip: params.skip,
    take: params.take,
    include: {
      author: {
        omit: { password: true },
      },
    },
  })
}

const count = async (where?: Prisma.PostWhereInput) => {
  return prisma.post.count({ where })
}

const update = async (id: string, data: Prisma.PostUpdateInput) => {
  return prisma.post.update({
    where: { id },
    data,
    include: {
      author: {
        omit: { password: true },
      },
    },
  })
}

const remove = async (id: string) => {
  return prisma.post.delete({
    where: { id },
  })
}

export const postRepository = {
  create,
  findById,
  findMany,
  count,
  update,
  remove,
}
