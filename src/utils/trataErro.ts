import { NextFunction } from "express";

// Método para tratar erros do serviço centralizadamente
export default function tratarErro(error: any, dadosEnviados: object , next: NextFunction, codigo : number = 400) {
  error.code = codigo;
  error.handled = true;
  error.dadosEnviados = dadosEnviados;
  next(error);
}
