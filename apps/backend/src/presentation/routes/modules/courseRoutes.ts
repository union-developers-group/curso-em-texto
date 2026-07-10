import { adaptRoute } from '@/app/adapters/http/fastify/adaptRoute';
import { makeUpdateCourseStructureController } from '@/factories/controllers/Course/UpdateCourseStructureControllerFactory';
import { authMiddleware } from '@/presentation/middlewares/auth/authMiddleware';
import { FastifyPluginAsync } from 'fastify';

export const courseRoutes: FastifyPluginAsync = async (app) => {
  app.patch(
    '/course/structure',
    {
      preHandler: [authMiddleware],
      schema: {
        description:
          'Endpoint to update the course structure. Sending an empty modules array removes all removable modules. Sending an empty lessons array for a module removes all removable lessons from that module.',
        summary: 'Update course structure',
        tags: ['Course'],
        body: {
          type: 'object',
          required: ['courseId', 'modules'],
          properties: {
            courseId: {
              type: 'string',
            },
            modules: {
              type: 'array',
              items: {
                type: 'object',
                required: ['title', 'order', 'lessons'],
                properties: {
                  id: {
                    type: 'string',
                  },
                  title: {
                    type: 'string',
                  },
                  order: {
                    type: 'number',
                  },
                  lessons: {
                    type: 'array',
                    items: {
                      type: 'object',
                      required: ['title', 'content', 'order'],
                      properties: {
                        id: {
                          type: 'string',
                        },
                        title: {
                          type: 'string',
                        },
                        content: {
                          type: 'string',
                        },
                        order: {
                          type: 'number',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        response: {
          200: {
            description: 'Course structure updated successfully',
            type: 'object',
            properties: {
              courseId: {
                type: 'string',
              },
              modules: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                    },
                    title: {
                      type: 'string',
                    },
                    order: {
                      type: 'number',
                    },
                    lessons: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                          },
                          title: {
                            type: 'string',
                          },
                          content: {
                            type: 'string',
                          },
                          order: {
                            type: 'number',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            type: 'object',
            properties: {
              error: {
                type: 'string',
              },
            },
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
              error: {
                type: 'string',
              },
            },
          },
          500: {
            description: 'Internal server error',
            type: 'object',
            properties: {
              error: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    adaptRoute(makeUpdateCourseStructureController())
  );
};
