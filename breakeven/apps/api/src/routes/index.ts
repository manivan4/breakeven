import { FastifyInstance } from 'fastify';
import { registerHealthRoutes } from './health';
import { registerProfileRoutes } from './profile';
import { registerNessieRoutes } from './nessie';
import { registerTransactionsRoutes } from './transactions';
import { registerPlanRoutes } from './plans';

export function registerRoutes(app: FastifyInstance) {
  registerHealthRoutes(app);
  registerProfileRoutes(app);
  registerNessieRoutes(app);
  registerTransactionsRoutes(app);
  registerPlanRoutes(app);
}
