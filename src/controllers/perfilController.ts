import { NextFunction, Request, Response } from "express";
import { PerfilService } from "../services/perfilService";
import tratarErro from "utils/trataErro";

export class PerfilController {
  static async createPerfil(req: Request, res: Response, next: NextFunction) {
    try {
      const perfil = await PerfilService.createPerfil(req.body);
      res.status(201).json(perfil);
    } catch (error: any) {
      tratarErro(error, req.body, next);
    }
  }

  static async getAllPerfil(req: Request, res: Response, next: NextFunction) {
    try {
      const perfis = await PerfilService.getAllPerfil();
      res.status(200).json(perfis);
    } catch (error: any) {
      tratarErro(error, req.body, next);
    }
  }
  static async getPerfilById(req: Request, res: Response, next: NextFunction) {
    try {
      const perfil = await PerfilService.getPerfilById(req.params.id);
      res.status(200).json(perfil);
    } catch (error: any) {
      tratarErro(error, req.body, next);
    }
  }
  static async updatePerfil(req: Request, res: Response, next: NextFunction) {
    try {
      const perfil = await PerfilService.updatePerfil(req.params.id, req.body);
      res.status(200).json(perfil);
    } catch (error: any) {
      tratarErro(error, req.body, next);
    }
  }
  static async deletePerfil(req: Request, res: Response, next: NextFunction) {
    try {
      await PerfilService.deletePerfil(req.params.id);
      res.status(204).end();
    } catch (error: any) {
      tratarErro(error, req.body, next);
    }
  }
}
