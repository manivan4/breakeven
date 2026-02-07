import fastify from 'fastify';
import cors from 'fastify-cors';
import dotenv from 'dotenv';
import { registerRoutes } from './routes';

dotenv.config();

const app = fastify({ logger: true });
app.register(cors, { origin: '*' });
registerRoutes(app);

const port = process.env.PORT || 4000;
app.listen(port as number, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`BreakEven API running at ${address}`);
});
