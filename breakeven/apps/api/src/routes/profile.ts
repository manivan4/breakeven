import { FastifyInstance } from 'fastify';
import { demoUser } from '../data/demoUser';

export function registerProfileRoutes(app: FastifyInstance) {
  app.get('/v1/profile', async () => demoUser);
}
