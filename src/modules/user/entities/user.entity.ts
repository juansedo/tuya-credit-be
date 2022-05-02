import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreditCard } from '../../card-list/entities/credit-card.entity';

@Entity({ name: 'users' })
@Unique(['document'])
export class User extends BaseEntity {
  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * User name
   * @example 'José Luis'
   */
  @Column({ type: 'varchar' })
  name: string;

  /**
   * User surname
   * @example 'Pérez Pérez'
   */
  @Column({ type: 'varchar' })
  surname: string;

  /**
   * User email
   * @example 'juan@ejemplo.com'
   */
  @Column({ type: 'varchar' })
  email: string;

  /**
   * User password
   */
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  /**
   * User document
   * @example '12345678'
   */
  @Column({ type: 'varchar' })
  document: string;

  /**
   * User key from Auth service
   */
  @Column({ type: 'varchar' })
  userKey: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  async getCards(): Promise<CreditCard[]> {
    const cards = await CreditCard.find({ userKey: this.userKey });
    return cards;
  }
}
