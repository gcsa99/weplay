import { PerfilService } from "../src/services/perfilService";
import { PerfilModel } from "../src/models/perfilModel";
import { isValidCPF } from "../src/validators/validatorCPF";
import { isValidCNPJ } from "../src/validators/validatorCNPJ";

// Mocks
jest.mock("../src/models/perfilModel");
jest.mock("../src/validators/validatorCPF");
jest.mock("../src/validators/validatorCNPJ");

describe("PerfilService", () => {
  const perfilData = {
    email: "teste@example.com",
    emailConfirm: "teste@example.com",
    cnpj: "12.345.678/0001-95",
    cpf: "123.456.789-09",
    nome: "Nome Teste",
    celular: "11987654321",
    termo: true,
    pessoaJuridica: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createPerfil", () => {
    it("deve criar um perfil válido", async () => {
      (isValidCPF as jest.Mock).mockReturnValue(true);
      (isValidCNPJ as jest.Mock).mockReturnValue(true);
      (PerfilModel.create as jest.Mock).mockResolvedValue(perfilData);

      const result = await PerfilService.createPerfil(perfilData);

      expect(result).toEqual(perfilData);
      expect(PerfilModel.create).toHaveBeenCalledWith(perfilData);
    });

    it("deve lançar erro se os e-mails não forem iguais", async () => {
      const invalidData = {
        ...perfilData,
        emailConfirm: "diferente@example.com",
      };

      await expect(PerfilService.createPerfil(invalidData)).rejects.toThrow(
        "Os e-mails informados não são iguais."
      );
    });

    it("deve lançar erro se o CPF for inválido", async () => {
      (isValidCPF as jest.Mock).mockReturnValue(false);

      await expect(PerfilService.createPerfil(perfilData)).rejects.toThrow(
        "CPF inválido"
      );
    });

    it("deve lançar erro se o CNPJ for inválido quando pessoaJuridica for true", async () => {
      (isValidCPF as jest.Mock).mockReturnValue(true);
      (isValidCNPJ as jest.Mock).mockReturnValue(false);

      await expect(PerfilService.createPerfil(perfilData)).rejects.toThrow(
        "CNPJ inválido"
      );
    });

    it("deve lançar erro se o termo não for aceito", async () => {
      const invalidData = { ...perfilData, termo: false };
      (isValidCPF as jest.Mock).mockReturnValue(true);
      (isValidCNPJ as jest.Mock).mockReturnValue(true);

      await expect(PerfilService.createPerfil(invalidData)).rejects.toThrow(
        "Termo de uso não aceito"
      );
    });
  });

  describe("getAllPerfil", () => {
    it("deve retornar todos os perfis", async () => {
      const perfisMock = [perfilData];
      (PerfilModel.findAll as jest.Mock).mockResolvedValue(perfisMock);

      const result = await PerfilService.getAllPerfil();

      expect(result).toEqual(perfisMock);
      expect(PerfilModel.findAll).toHaveBeenCalled();
    });
  });

  describe("getPerfilById", () => {
    it("deve retornar um perfil pelo ID", async () => {
      (PerfilModel.findByPk as jest.Mock).mockResolvedValue(perfilData);

      const result = await PerfilService.getPerfilById("1");

      expect(result).toEqual(perfilData);
      expect(PerfilModel.findByPk).toHaveBeenCalledWith("1");
    });
  });

  describe("updatePerfil", () => {
    it("deve atualizar um perfil e retornar o perfil atualizado", async () => {
      (isValidCPF as jest.Mock).mockReturnValue(true);
      (isValidCNPJ as jest.Mock).mockReturnValue(true);
      (PerfilModel.update as jest.Mock).mockResolvedValue([1]);
      (PerfilModel.findByPk as jest.Mock).mockResolvedValue(perfilData);

      const result = await PerfilService.updatePerfil("1", perfilData);

      expect(result).toEqual(perfilData);
      expect(PerfilModel.update).toHaveBeenCalledWith(perfilData, {
        where: { id: "1" },
      });
    });
  });

  describe("deletePerfil", () => {
    it("deve deletar um perfil pelo ID", async () => {
      (PerfilModel.destroy as jest.Mock).mockResolvedValue(1);

      const result = await PerfilService.deletePerfil("1");

      expect(result).toBe(1);
      expect(PerfilModel.destroy).toHaveBeenCalledWith({ where: { id: "1" } });
    });
  });
});
