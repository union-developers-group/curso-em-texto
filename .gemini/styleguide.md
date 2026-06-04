# Curso em Texto - Guia de Estilo e Arquitetura

## Introdução

Este guia de estilo define as convenções de código, arquitetura e padrões para o projeto **Curso em Texto** - uma plataforma open source de cursos livres em formato textual. O projeto utiliza uma arquitetura de monorepo com backend em Fastify/TypeScript e frontend em Next.js/React.

## Regras Gerais de Comunicação

- **SEMPRE responda em Português do Brasil** em todas as interações, comentários de código e documentação
- Use terminologia técnica em inglês (ex: "use case" ao invés de "caso de uso")

## Arquitetura do Projeto

### Estrutura de Monorepo

- **Apps**: `backend` e `frontend` como aplicações principais
- **Packages**: Configurações compartilhadas (`eslint-config`, `prettier-config`, `vitest-config`)
- **Gerenciamento**: Turborepo para otimização de builds e execução de tarefas

### Backend - Arquitetura em camadas (Layered architecture)

#### Estrutura de Pastas

apps/backend/src/
├── app/ # Configuração da aplicação
│ ├── server/ # Servidor Fastify
│ ├── adapters/ # Adaptadores HTTP
│ └── env/ # Variáveis de ambiente
├── data/ # Camada de dados
│ ├── schema/ # Schemas do Drizzle
│ ├── models/ # Modelos de dados
│ └── repositories/ # Interfaces de repositórios
├── presentation/ # Camada de apresentação
│ ├── routes/ # Definição de rotas
│ ├── controllers/ # Controladores
│ └── contracts/ # Contratos de API
├── services/ # Camada de serviços
│ ├── useCases/ # Casos de uso
│ └── contracts/ # Contratos de serviços
└── factories/ # Fábricas de dependências

#### Padrões Obrigatórios

- **Use Cases**: Toda lógica de negócio deve estar em casos de uso isolados
- **Repository Pattern**: Abstração de acesso a dados via interfaces
- **Dependency Injection**: Injeção de dependências via factories
- **Adapter Pattern**: Adaptação entre camadas (HTTP, banco de dados)

### Frontend - Next.js App Router

#### Estrutura de Pastas

apps/frontend/src/
├── app/ # App Router do Next.js
├── components/ # Componentes reutilizáveis
├── templates/ # Templates de páginas
├── hooks/ # Custom hooks
├── utils/ # Utilitários
└── styles/ # Estilos globais

#### Padrões Obrigatórios

- **Component-Driven Development**: Desenvolvimento baseado em componentes
- **Storybook**: Todo componente deve ter stories para documentação
- **CVA (Class Variance Authority)**: Gerenciamento de variantes de componentes
- **Template Pattern**: Separação entre templates e páginas

## Convenções de Código

### TypeScript

#### Configuração

- **Versão**: TypeScript 5+
- **Strict Mode**: Sempre habilitado
- **Type Safety**: Tipagem explícita em todas as interfaces públicas
- **Imports**: Use imports absolutos com alias `@/`
- **Exports**: Prefira **export named** sempre que possível. Apenas páginas do Next.js (`src/app/**/page.tsx`) devem usar `export default`, pois é exigência do framework. Todos os demais arquivos (componentes, templates, hooks, utils, funções, tipos, etc.) devem ser exportados com `export` nomeado.

#### Nomenclatura

- **Interfaces**: PascalCase com sufixo descritivo
  ```typescript
  interface ExampleModelData {
    id: number;
    firstName: string;
  }
  ```
- **Types**: PascalCase para tipos complexos
  ```typescript
  type CreateExampleInputType = Omit<
    CreateExampleData,
    'username'
  >;
  ```
- **Funções**: camelCase descritivo
  ```typescript
  const createExampleUseCase = () => {
    /* ... */
  };
  ```

### Backend - Fastify + Drizzle

#### Estrutura de Rotas

- **Organização**: Agrupe rotas por módulo em `presentation/routes/modules/`
- **Nomenclatura**: `[module]Routes.ts` (ex: `exampleRoutes.ts`)
- **Documentação**: Sempre inclua schema OpenAPI/Swagger
- **Validação**: Use Zod na versão 4 para validação de entrada

#### Exemplo de Rota

```typescript
export const exampleRoutes: FastifyPluginAsync = async (
  app,
) => {
  app.post(
    '/example/create',
    {
      schema: {
        description: 'Endpoint para criar um novo exemplo',
        tags: ['Example'],
        summary: 'Criar um novo exemplo',
        body: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
          },
        },
        response: {
          201: {
            description: 'Resposta de sucesso',
            type: 'object',
            properties: {
              id: { type: 'number' },
              firstName: { type: 'string' },
              // ...
            },
          },
        },
      },
    },
    adaptRoute(makeCreateExampleController()),
  );
};
```

#### Casos de Uso

- **Estrutura**: `UseCase<InputType, OutputType>`
- **Retorno**: Sempre use `UseCaseResponse<T>`
- **Validação**: Valide entradas no início do caso de uso
- **Tratamento de Erro**: Retorne erros descritivos em inglês

#### Exemplo de Caso de Uso

```typescript
export class CreateExampleUseCase
  implements
    UseCase<CreateExampleInputType, ExampleModelData>
{
  constructor(
    private readonly validator: Validator,
    private readonly exampleRepository: ExampleRepository,
  ) {}

  async execute({
    firstName,
    lastName,
    email,
  }: CreateExampleInputType): Promise<
    UseCaseResponse<ExampleModelData>
  > {
    const isEmailValid = this.validator.isEmail(email);

    if (!isEmailValid) {
      return {
        data: null,
        error: 'Email inválido',
      };
    }

    // Lógica de negócio...

    return {
      data: exampleData,
      error: null,
    };
  }
}
```

#### Repositórios

- **Interface**: Defina interface em `data/repositories/interfaces/`
- **Implementação**: Implemente em `data/repositories/`
- **Nomenclatura**: `[Entity]Repository` (ex: `ExampleRepository`)

#### Schemas de Banco

- **Drizzle ORM**: Use schemas tipados
- **Nomenclatura**: `[entity]Table` (ex: `exampleUsersTable`)
- **Campos**: Use camelCase para campos TypeScript

```typescript
export const exampleUsersTable = pgTable('example_users', {
  id: serial().primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  username: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
});
```

### Frontend - Next.js + React

#### Componentes

- **Estrutura**: Use CVA para variantes de componentes
- **Props**: Defina interface clara para props
- **Nomenclatura**: PascalCase para componentes
- **Arquivos**: Organize em pasta própria com `index.tsx`, `*.test.tsx`, `*.stories.tsx`

#### Exemplo de Componente

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export const exampleVariants = cva(
  'flex flex-col justify-center items-center bg-background-400 rounded-lg border border-background-200 mt-2',
  {
    variants: {
      size: {
        md: 'w-[21.3125rem]',
        lg: 'w-[27.5rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type ExampleVariants = VariantProps<typeof exampleVariants>;

export interface ExampleProps extends ExampleVariants {
  githubURL: string;
  className?: string;
}

export const Example = ({ githubURL, size, className }: ExampleProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div
        className={cn(exampleVariants({ size, className }))}
        data-testid="card-container"
      >
        {/* Conteúdo do componente */}
      </div>
    </div>
  );
};
```

#### Templates

- **Separação**: Separe templates de componentes
- **Props**: Defina interface clara para props do template
- **Nomenclatura**: `[Name]Template` (ex: `ExampleTemplate`)

#### Hooks Customizados

- **Nomenclatura**: `use[Name]` (ex: `useExample`)
- **Localização**: `src/hooks/`
- **Tipagem**: Sempre tipado com TypeScript

### Styling - Tailwind CSS

#### Configuração

- **Versão**: Tailwind CSS 4
- **Classes**: Use classes utilitárias do Tailwind
- **Variantes**: Use CVA para componentes com múltiplas variantes
- **Responsividade**: Mobile-first approach

#### Convenções

- **Espaçamento**: Use sistema de espaçamento do Tailwind (4, 8, 16, etc.)
- **Cores**: Use sistema de cores semânticas (background-400, text-primary, etc.)
- **Tipografia**: Use classes de tipografia do Tailwind

## Testes

### Backend - Vitest

- **Estrutura**: Teste casos de uso com mocks e stubs
- **Nomenclatura**: `[UseCase].test.ts`
- **Cobertura**: Mantenha alta cobertura de código

#### Exemplo de Teste

```typescript
describe('CreateExampleUseCase', () => {
  it('should return error if email is invalid', async () => {
    const { validatorStub, sut } = makeSut();

    vitest
      .spyOn(validatorStub, 'isEmail')
      .mockReturnValueOnce(false);

    const input = {
      ...exampleDataMock,
      email: 'email_invalido',
    };

    const response = await sut.execute(input);

    expect(response).toStrictEqual({
      data: null,
      error: 'Email inválido',
    });
  });
});
```

### Frontend - Vitest + Testing Library

- **Componentes**: Teste comportamento, não implementação
- **Nomenclatura**: `[Component].test.tsx`
- **Queries**: Use queries semânticas (getByRole, getByText, etc.)
- **Mocks**: Use mocks para dados de exemplo

#### Exemplo de Teste

```typescript
describe('<Example />', () => {
  it('should render link', () => {
    render(<Example {...exampleMock} />);

    const link = screen.getByRole('link', { name: 'Contribua no Github' });

    expect(link).toHaveAttribute('href', exampleMock.githubURL);
  });
});
```

### Storybook

- **Obrigatório**: Todo componente deve ter stories
- **Nomenclatura**: `[Component].stories.tsx`
- **Variantes**: Documente todas as variantes do componente
- **Mocks**: Use mocks para dados de exemplo

## Performance e Otimização

### Backend

- **Fastify**: Use recursos de performance do Fastify
- **Validação**: Valide dados de entrada eficientemente
- **Queries**: Otimize queries do banco de dados
- **Caching**: Implemente cache quando apropriado

### Frontend

- **Next.js**: Use recursos de otimização do Next.js
- **Bundle**: Monitore tamanho do bundle

## Segurança

### Backend

- **Validação**: Valide todas as entradas
- **Sanitização**: Sanitize dados antes de processar
- **Autorização**: Verifique permissões adequadamente

### Frontend

- **XSS**: Prevenha ataques XSS
- **CSRF**: Implemente proteção CSRF
- **Sanitização**: Sanitize dados do usuário

## Documentação

### API

- **Swagger**: Documente todas as rotas da API
- **Exemplos**: Forneça exemplos de uso
- **Códigos de Status**: Documente códigos de resposta

## Exemplos de Implementação

### Novo Caso de Uso (Backend)

1. Crie interface em `data/repositories/interfaces/`
2. Implemente repositório em `data/repositories/`
3. Crie caso de uso em `services/useCases/[Module]/`
4. Crie controller em `presentation/controllers/`
5. Crie rota em `presentation/routes/modules/`
6. Crie factory em `factories/controllers/`
7. Adicione testes unitários
8. Documente a rota com Swagger

### Novo Componente (Frontend)

1. Crie pasta do componente em `components/[Component]/`
2. Implemente componente com CVA se necessário
3. Crie arquivo `index.tsx`
4. Crie arquivo `[Component].test.tsx`
5. Crie arquivo `[Component].stories.tsx`
6. Crie arquivo `[Component].mock.ts`
7. Adicione ao template se necessário

## Conclusão

Este guia de estilo deve ser seguido rigorosamente para manter a consistência e qualidade do código no projeto Curso em Texto. Qualquer dúvida sobre implementação deve ser resolvida consultando este documento e os exemplos existentes no projeto.

**Lembre-se**: Sempre responda em Português do Brasil e mantenha a consistência com os padrões arquiteturais estabelecidos.
