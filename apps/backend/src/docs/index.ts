import { FastifyOpenapiOptionsType } from '@/app/server/swagger';

export const docOptions: FastifyOpenapiOptionsType = {
  info: {
    title: 'Curso em Texto API',
    version: '0.0.1',
    description: 'Documentação da API do Curso em Texto',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/course/create': {
      post: {
        description: 'Endpoint para criar um novo curso',
        tags: ['Course'],
        summary: 'Criar um novo curso',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
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
                    items: { type: 'string' },
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
                    enum: [
                      'draft',
                      'revision',
                      'published',
                      'archived',
                      'blocked',
                    ],
                    default: 'draft',
                  },
                  isPublic: {
                    type: 'boolean',
                    default: false,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Curso criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    slug: { type: 'string' },
                    description: { type: 'string' },
                    shortDescription: { type: 'string', nullable: true },
                    authorId: { type: 'string' },
                    tags: {
                      type: 'array',
                      nullable: true,
                      items: { type: 'string' },
                    },
                    difficulty: { type: 'string' },
                    estimatedHours: { type: 'number' },
                    status: { type: 'string' },
                    isPublic: { type: 'boolean' },
                    enrollmentCount: { type: 'number' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          400: {
            description: 'Dados inválidos',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
          401: {
            description: 'Usuário não autenticado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
          500: {
            description: 'Erro interno do servidor',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
