import { adaptRoute } from '@/app/adapters/http/fastify/adaptRoute';
import { makeCreateCourseController } from '@/factories/controllers/Course/CreateCourseControllerFactory';
import { makeUpdateCourseStructureController } from '@/factories/controllers/Course/UpdateCourseStructureControllerFactory';
import { authMiddleware } from '@/presentation/middlewares/auth/authMiddleware';
import { FastifyPluginAsync } from 'fastify';

export const courseRoutes: FastifyPluginAsync = async (app) => {
  app.post(
    '/course/create',
    {
      preHandler: [authMiddleware],
      schema: {
        description: 'Endpoint to create a new course',
        summary: 'Create course',
        tags: ['Course'],
        body: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            title: {
              type: 'string',
              minLength: 5,
              maxLength: 255,
            },
            description: {
              type: 'string',
              minLength: 50,
            },
            shortDescription: {
              type: 'string',
              maxLength: 500,
            },
            tags: {
              type: 'array',
              maxItems: 10,
              items: {
                type: 'string',
              },
            },
            difficulty: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced'],
              default: 'beginner',
            },
            estimatedHours: {
              type: 'number',
              default: 0,
            },
            status: {
              type: 'string',
              enum: ['draft', 'revision', 'published', 'archived', 'blocked'],
              default: 'draft',
            },
            isPublic: {
              type: 'boolean',
              default: false,
            },
          },
        },
        response: {
          201: {
            description: 'Course created successfully',
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              slug: {
                type: 'string',
              },
              description: {
                type: 'string',
              },
              shortDescription: {
                type: 'string',
                nullable: true,
              },
              authorId: {
                type: 'string',
              },
              tags: {
                type: 'array',
                nullable: true,
                items: {
                  type: 'string',
                },
              },
              difficulty: {
                type: 'string',
              },
              estimatedHours: {
                type: 'number',
              },
              status: {
                type: 'string',
              },
              isPublic: {
                type: 'boolean',
              },
              enrollmentCount: {
                type: 'number',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
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
    adaptRoute(makeCreateCourseController())
  );

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
