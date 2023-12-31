import { FastifyInstance } from 'fastify'
import {knex} from '../database'
import {z} from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middleware/session-check-id'
export async function usersRoutes(app: FastifyInstance) {
  app.get('/',{preHandler: checkSessionIdExists},  async (request) => {
    const sessionId = request.cookies.sessionId
    const users = await knex('users').select('*').where({'session_id': sessionId})
    return {users}
  })

  app.post('/', async (request, reply) => {
    const createUsersBody = z.object({
      name: z.string()
    })
    const {name} = createUsersBody.parse(request.body)
    let sessionId = request.cookies.sessionId
    if(!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionID', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30 //30days
      })
    }
    await knex('users').insert({
      id: randomUUID(),
      name,
      session_id: sessionId
    })
    reply.status(201).send()
  })
}
