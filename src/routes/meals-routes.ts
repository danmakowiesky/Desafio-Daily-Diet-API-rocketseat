import { FastifyInstance } from 'fastify'
import {knex} from '../database'
import {z} from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middleware/session-check-id'
export async function mealsRoutes(app: FastifyInstance) {

  app.get('/', {preHandler: checkSessionIdExists}, async (request) => {
    const sessionId = request.cookies.sessionId
    console.log(sessionId)
    const meals = await knex('meals').select('*').where({'session_id': sessionId})
    return {meals}
  })

  app.post('/', {preHandler : checkSessionIdExists}, async (request, reply) => {
    const createUsersBody = z.object({
      name: z.string(),
      description: z.string(),
      is_diet: z.boolean()
    })
    let sessionId = request.cookies.sessionId
    if(!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionID', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30 //30days
      })
    }
    const {name, description, is_diet} = createUsersBody.parse(request.body)
    await knex('meals').insert({
      id: randomUUID(),
      name, 
      description,
      is_diet,
      session_id: sessionId
    })
    reply.status(201).send()
  })
}
