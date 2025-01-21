import {
  Model,
  Column,
  DataType,
  Table,
  AllowNull,
  Unique,
  Default,
  IsEmail,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import { UserEstresSession } from "../Clasificacion/userestressession";
import { UserResponses } from "./user_responses";
import { Empresas } from "../Global/empresas";
import { Role } from "../User/role"; 

@Table({
  timestamps: false,
  tableName: "users"
})
export class User extends Model {

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  username!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @IsEmail
  @Unique(true)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  permisopoliticas!: boolean;

  @AllowNull(true)
  @Default(0)
  @Column(DataType.INTEGER)
  funcyinteract!: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  profileImage!: string;
  
  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  userresponsebool!: boolean;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  testestresbool!: boolean;

  @AllowNull(true)
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  createdAt!: Date;

  @HasOne(() => UserEstresSession)
  userestressessions!: UserEstresSession;

  @HasOne(() => UserResponses)
  userresponses!: UserResponses;

  @ForeignKey(() => Empresas)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  empresa_id!: number;

  @BelongsTo(() => Empresas)
  empresa!: Empresas;

  @ForeignKey(() => Role) 
  @AllowNull(false)
  @Column(DataType.INTEGER)
  role_id!: number; 

  @BelongsTo(() => Role) 
  role!: Role;
}
