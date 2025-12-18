# Professor Marcos Backend

Este projeto é um backend modular em TypeScript, pronto para servir como base para aplicações como blogs, sistemas de usuários e outros sistemas web. Ele segue princípios de Clean Architecture, separando domínio, casos de uso, infraestrutura e testes.

---

## Visão Geral da Estrutura

```
├── docker-compose.yml         # Configuração do banco de dados (PostgreSQL + pgvector)
├── gerarKeys.js               # Geração de chaves RSA
├── jest.config.js             # Configuração de testes
├── package.json / tsconfig.json
├── DOCUMENTACAO.md            # Documentação detalhada
├── source/
│   ├── main.ts                # Ponto de entrada
│   ├── domain/                # Entidades e interfaces de negócio
│   ├── infra/                 # Controladores, banco, HTTP, repositórios, migrations
│   └── useCases/              # Casos de uso (ex: criar usuário, criar post)
├── test/                      # Testes automatizados
```

---

## Principais Pastas e Arquivos

### source/domain/
- **Entity/**: Entidades do domínio, como:
  - `User.ts`: Usuário do sistema
  - `Post.ts`: Postagem do blog
- **Interfaces/**: Contratos para repositórios e fábricas, como:
  - `UserRepositoryInterface.ts`, `PostRepositoryInterface.ts`
  - `RepositoryFactoryInterface.ts`

### source/infra/
- **controller/**: Controladores HTTP para cada recurso (`UserController.ts`, `PostController.ts`)
- **database/**: Configuração e conexão com o banco de dados
- **http/**: Infraestrutura do servidor Express, rotas e middlewares
  - **Middleware/**: Middlewares de autenticação
  - **Routes/**: Rotas HTTP para usuários, posts, etc
- **migrations/**: Scripts para criação/alteração de tabelas
- **repository/**: Implementações dos repositórios (banco e memória)
  - **database/**: Repositórios persistentes
  - **memory/**: Repositórios em memória para testes

### source/useCases/
Cada caso de uso tem sua própria pasta, com arquivos de input, output e lógica principal. Exemplos:
- `createUser/`, `createPost/`, `findPostById/`, `getAllPosts/`, `updatePost/`, etc.

---

## Fluxo de Funcionamento

1. **Requisição HTTP** chega ao controlador (ex: `PostController`)
2. O controlador chama o **caso de uso** correspondente (ex: `CreatePost`)
3. O caso de uso utiliza **entidades** e **repositórios** (via interfaces) para executar a lógica
4. O repositório acessa o banco de dados (ou memória)
5. O resultado retorna ao controlador, que responde ao cliente

---

## Exemplos de Endpoints

- `POST /users` — Cria um novo usuário
- `POST /posts` — Cria um novo post
- `GET /posts` — Lista todos os posts
- `GET /posts/:id` — Busca um post por ID
- `PUT /posts/:id` — Atualiza um post

---

## Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` com as variáveis do banco.

    DB_HOST=localhost
    DB_PORT=5432
    DB_DATABASE=db_professor_marcos
    DB_USERNAME=admin
    DB_PASSWORD=admin

3. Suba o banco de dados:
   ```bash
   docker compose up -d
   ```

4. Verifique se o contêiner está rodando:
    ```bash
   docker ps
   ```

5. Rode os Testes:
    ```bash
   npm run test
   ```

6. Suba a aplicação:
    ```bash
   npm run main
   ```

## Como Expandir

- Adicione novas entidades em `domain/Entity/`
- Crie novos casos de uso em `useCases/`
- Implemente controladores e rotas para novos recursos
- Crie migrations para novas tabelas

---

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests para melhorias!

---

## Licença

MIT
