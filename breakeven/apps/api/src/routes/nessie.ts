import { FastifyInstance } from 'fastify';
import { connectNessie } from '../integrations/nessie';

export function registerNessieRoutes(app: FastifyInstance) {
  app.post('/v1/nessie/connect', async (request, reply) => {
    const connection = await connectNessie();
    reply.send(connection);
  });
}
