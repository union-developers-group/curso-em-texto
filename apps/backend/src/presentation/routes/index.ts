import type { FastifyPluginAsync } from 'fastify';

import * as routes from './modules/_barrel';

export const apiRoutes: FastifyPluginAsync = async (app) => {
  app.register(routes.exampleRoutes);
  app.register(routes.authRoutes);
  app.register(routes.generateTokenRoutes);
  app.register(routes.courseRoutes);
};
