import { FastifyInstance } from 'fastify';
import demoTransactions from '../data/demo-transactions.json';

export function registerTransactionsRoutes(app: FastifyInstance) {
  app.get('/v1/transactions', async (request) => {
    const { mode } = request.query as { mode?: string };
    // For now just return demo data; could tailor by mode later.
    return { transactions: demoTransactions, source: 'demo' };
  });
}
