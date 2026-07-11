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
};
