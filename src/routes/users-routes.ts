import { FastifyInstance } from 'fastify'
import {knex} from '../database'
import {z} from 'zod'
import { randomUUID } from 'node:crypto'
export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    console.log('hello')
    return reply.status(200).send({message: 'usuario hello'})
  })

  app.post('/', async (request, reply) => {
    const createUsersBody = z.object({
      name: z.string()
    })
    const {name} = createUsersBody.parse(request.body)
    await knex('users').insert({
      id: randomUUID(),
      name
    })
    reply.status(201).send()
  })
}
