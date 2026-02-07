import { FastifyInstance } from 'fastify';
import { generatePlan } from '../services/planGenerator';
import { planInputSchema } from '@breakeven/shared';
import { saveBundle, getPlan } from '../utils/planStore';

export function registerPlanRoutes(app: FastifyInstance) {
  app.post('/v1/plan/generate', async (request, reply) => {
    const parseResult = planInputSchema.safeParse(request.body);
    if (!parseResult.success) {
      reply.code(400).send({ error: 'Invalid payload', details: parseResult.error.flatten() });
      return;
    }

    const input = parseResult.data;
    const fast = generatePlan(input, 'FAST');
    const steady = generatePlan(input, 'STEADY');
    saveBundle([fast, steady]);

    reply.send({ fast, steady });
  });

  app.get('/v1/plan/:planId', async (request, reply) => {
    const { planId } = request.params as { planId: string };
    const plan = getPlan(planId);
    if (!plan) {
      reply.code(404).send({ error: 'Plan not found' });
      return;
    }
    reply.send(plan);
  });
}
