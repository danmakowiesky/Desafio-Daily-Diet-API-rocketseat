import { FastifyInstance } from 'fastify'
import {knex} from '../database'
import {z} from 'zod'
import { randomUUID } from 'node:crypto'
export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const users = await knex('users').select('*')
    return {users}
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
