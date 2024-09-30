import { isValidCPF } from "validators/validatorCPF";
import { PerfilModel } from "../models/perfilModel";
import { isValidCNPJ } from "validators/validatorCNPJ";

export class PerfilService {
  static async createPerfil(data: any) {
    try {
      this.validaPerfil(data);
      return await PerfilModel.create(data);
    } catch (error: any) {
      throw error;
    }
  }

  static async getAllPerfil() {
    try {
      return await PerfilModel.findAll();
    } catch (error: any) {
      throw error;
    }
  }
  static async getPerfilById(id: string) {
    try {
      return await PerfilModel.findByPk(id);
    } catch (error: any) {
      throw error;
    }
  }
  static async updatePerfil(id: string, data: any) {
    try {
      this.validaPerfil(data);
      await PerfilModel.update(data, { where: { id } });
      return await PerfilModel.findByPk(id);
    } catch (error: any) {
      throw error;
    }
  }
  static async deletePerfil(id: string) {
    try {
      return await PerfilModel.destroy({ where: { id } });
    } catch (error: any) {
      throw error;
    }
  }
  static validaPerfil(data: any) {
    const { email, emailConfirm, cnpj, cpf, pessoaJuridica, termo } = data;

    // Validações
    if (email !== emailConfirm) {
      throw new Error("Os e-mails informados não são iguais.");
    }
    if (!isValidCPF(cpf)) {
      throw new Error("CPF inválido");
    }
    if (!isValidCNPJ(cnpj) && pessoaJuridica) {
      throw new Error("CNPJ inválido");
    }
    if (!termo) {
      throw new Error("Termo de uso não aceito");
    }
    // Removendo caracteres não numéricos
    data.cpf = cpf.replace(/\D/g, "");
    data.cnpj = cnpj.replace(/\D/g, "");
  }
}
