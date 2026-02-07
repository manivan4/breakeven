import { FastifyInstance } from 'fastify';

export function registerHealthRoutes(app: FastifyInstance) {
  app.get('/v1/health', async () => ({ status: 'ok', service: 'breakeven-api' }));
}
