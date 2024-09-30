import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/config";

export class PerfilModel extends Model {}
//Aqui mantive apenas as validações mais básicas necessárias
PerfilModel.init(
  {
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isCelular(value: string) {
          if (!/^\d{11}$/.test(value)) {
            throw new Error("Celular inválido");
          }
        },
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    termo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    pessoaJuridica: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Perfil",
    tableName: "Perfil",
    freezeTableName: true,
  }
);
