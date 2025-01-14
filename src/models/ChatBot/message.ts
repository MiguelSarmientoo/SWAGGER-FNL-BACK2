import { User } from "../User/user";
import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "messages",
})
export class Message extends Model {
  @AllowNull(false)
  @Column(DataType.TEXT)
  content!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id_receptor!: number;

  @BelongsTo(() => User)
  user_receptor!: User;

  @Column(DataType.STRING)
  sentimientos!: string;

  @Column(DataType.STRING)
  factor_psicosocial!: string;

  @Column(DataType.INTEGER)
  score!: number;

  @Column(DataType.TEXT)
  keyword_frequency!: string;

  @Column(DataType.INTEGER)
  message_length!: number;

  @CreatedAt
  created_at!: Date;
}
