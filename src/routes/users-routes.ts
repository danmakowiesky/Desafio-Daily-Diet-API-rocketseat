import { FastifyInstance } from 'fastify'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    console.log('hello')
    return reply.status(200).send({message: 'usuario hello'})
  })
}
