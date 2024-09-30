import express from "express";
import perfil from "./perfilRoute";
import erroMiddleware from "middleware/erro";

const router = (app: express.Application) => {
  // Usando o express.json() para fazer o parse do corpo da requisição para JSON
  app.use(express.json());
  app.use(perfil);
  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      erroMiddleware(err, req, res, next);
    }
  );
};

export default router;
