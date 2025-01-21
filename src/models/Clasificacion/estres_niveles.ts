
import { AllowNull, Column, DataType, HasMany, Length, Model, Table } from "sequelize-typescript";
import { UserEstresSession } from "./userestressession";


@Table({
  timestamps: false,
  tableName: "estres_niveles"
})
export class EstresNiveles extends Model {
  @AllowNull(false)
  @Length({min:2,max:50})
  @Column(DataType.STRING)
  nombre!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  descripcion!: string;

  @HasMany(() => UserEstresSession)
  userEstresSessions!: UserEstresSession[];
}
