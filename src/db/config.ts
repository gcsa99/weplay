import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQLDB_DATABASE!,
  process.env.MYSQLDB_USER!,
  process.env.MYSQLDB_PASSWORD!,
  {
    host: process.env.MYSQLDB_HOST,
    dialect: "mysql",
    logging: false, // Desabilita o log do SQL
    dialectOptions: {
      connectTimeout: 10000,
    },
  }
);

// Teste de conexão
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Conexão ao banco de dados bem-sucedida.");
//   })
//   .catch((error) => {
//     console.error("Erro ao conectar ao banco de dados:", error);
//   });
