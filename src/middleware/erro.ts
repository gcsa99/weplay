import { NextFunction, Request, Response } from "express";
import { sequelize } from "../db/config";

const erroMiddleware = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (err.handled) {
      return res.status(err.status || 500).json({ message: err.message });
    }
    // Salva o erro no banco de dados usando query manual
    await sequelize.query(
      "INSERT INTO Erro (mensagem, stack, dadosRecebidos, data) VALUES (?, ?, ?, NOW())",
      {
        replacements: [err.message, err.stack, JSON.stringify(req.body) || ""],
      }
    );

    // Retorna a resposta de erro ao cliente
    if (!res.headersSent) {
      res.status(err.status || 500).json({ message: err.message });
    }
  } catch (dbError) {
    console.error("Erro ao salvar log de erro no banco:", dbError);

    // Em caso de erro ao salvar no banco, retorna erro 500
    if (!res.headersSent) {
      res.status(500).json({ message: "Erro interno" });
    }
  }
};

export default erroMiddleware;
