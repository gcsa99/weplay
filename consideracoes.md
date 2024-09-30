Realizei a inclusão de algumas bibliotecas para realizar esta tarefa.
Comandos utilizados:
npm install express mysql2 sequelize dotenv
npm install --save-dev typescript @types/express jest ts-jest supertest @types/jest @types/supertest
npm install --save-dev eslint eslint-plugin-typescript
npm install --save-dev ts-jest

Por conta de incompatibilidades com o sequelize, foi necessário o arquivo tsconfig.json para ter compatibilidade com es6;

Ao iniciar, é gerado um warning por conta da versão do MySQL que nào é mais mantida pelo SEQUELIZE.
