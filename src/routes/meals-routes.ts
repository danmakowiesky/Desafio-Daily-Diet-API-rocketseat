import { FastifyInstance } from 'fastify'
import {knex} from '../database'
import {z} from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middleware/session-check-id'
export async function mealsRoutes(app: FastifyInstance) {

  app.get('/', {preHandler: checkSessionIdExists}, async (request) => {
    const sessionId = request.cookies.sessionId
    const meals = await knex('meals').select('*').where({'session_id': sessionId})
    return {meals}
  })

  app.get('/:id', {preHandler: checkSessionIdExists}, async (request) => {
    const sessionId = request.cookies.sessionId
    const findMealsByIdParamsSchema = z.object({
      id: z.string()
    })
    const {id} = findMealsByIdParamsSchema.parse(request.params)
    const meals = await knex('meals').select('*').where({'session_id': sessionId, id})
    return {meals}
  })

  app.delete('/:id', {preHandler: checkSessionIdExists}, async (request, reply) => {
    const sessionId = request.cookies.sessionId
    const deleteMealsByIdParamsSchema = z.object({
      id: z.string()
    })
    const {id} = deleteMealsByIdParamsSchema.parse(request.params)
    await knex('meals').where({'session_id': sessionId, id}).del()
    reply.status(200).send()

  })

  app.put('/:id',{ preHandler: checkSessionIdExists},async (request, response) => {
    const getMealParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const {id} = getMealParamsSchema.parse(request.params)
    const sessionId  = request.cookies.sessionId
    
    const editMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      is_diet: z.boolean(),
    })
    const { name, description, is_diet } = editMealBodySchema.parse(
      request.body,
    )

    await knex('meals')
      .where({'id': id, 'session_id': sessionId})
      .first()
      .update({
        name,
        description,
        is_diet,
      })

    return response.status(202).send()
  },
  )

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
