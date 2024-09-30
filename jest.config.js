/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest", // Usando ts-jest para compilar TypeScript
  testEnvironment: "node", // Definindo o ambiente de teste como Node.js
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignorando diretórios
  moduleFileExtensions: ["ts", "js", "json", "node"], // Extensões de arquivo a serem testadas
  transform: {
    "^.+\\.ts$": "ts-jest", // Transforma arquivos TypeScript
  },
  moduleNameMapper: {
    "^validators/(.*)$": "<rootDir>/src/validators/$1",
  },
};
