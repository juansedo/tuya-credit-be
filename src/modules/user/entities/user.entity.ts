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
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreditCard } from '../../card-list/entities/credit-card.entity';
import { createHmac } from 'crypto';
import Permission from 'src/common/constants/permission';

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
  @Column({ type: 'varchar' })
  @Exclude()
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

  /**
   * Array with user permissions
   */
  @Column({
    type: 'set',
    enum: Permission,
    default: [Permission.USER],
  })
  @Exclude()
  public permissions: Permission[];

  /**
   * User valid refresh token
   */
  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeUpdate()
  async setRefreshTokenHash(refreshToken: string) {
    if (refreshToken) {
      const salt = await bcrypt.genSalt();
      const hasher = createHmac('sha256', process.env.REFRESH_JWT_SECRET);
      const key = hasher.update(refreshToken).digest('hex');
      this.refreshToken = await bcrypt.hash(key, salt);
    }
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
