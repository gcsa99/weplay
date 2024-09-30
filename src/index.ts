import express from "express";
import routes from "./routes/index";
import dotenv from "dotenv";
import { sequelize } from "db/config";

dotenv.config();
const app = express();
const port = process.env.PORT || 4568;

routes(app);
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
  });

export default app;
