import bcrypt from 'bcrypt'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  private passwordHash: string

  public setPassword(password: string): void {
    this.passwordHash = bcrypt.hashSync(password, 8)
  }

  public checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash)
  }

  @CreateDateColumn()
  public createdAt: Timestamp

  @UpdateDateColumn()
  public updatedAt: Timestamp
}
