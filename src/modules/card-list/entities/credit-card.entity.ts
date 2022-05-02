import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'credit_cards' })
export class CreditCard extends BaseEntity {
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
   * Credit card type
   * @example 'MASTERCARD', 'PRIVADA'
   */
  @Column({ type: 'varchar' })
  type: string;

  /**
   * Credit card last digits
   * @example '1234'
   */
  @Column({ type: 'char', length: 4 })
  lastDigits: string;

  /**
   * Credit card fee value
   * @example '14900.00'
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  fee: number;

  /**
   * Credit card fee mode
   * @example 'Monthly'
   * @example 'Monthly in use'
   */
  @Column({ type: 'varchar' })
  feeMode: string;

  /**
   * Credit card capacity in COP
   * @example '1000000.00'
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  capacity: number;

  /**
   * Credit card available amount in COP
   * @example '500000.00'
   */
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  available: number;

  /**
   * Credit card interest rate in %
   * @example '1.0097'
   */
  @Column({ type: 'decimal', precision: 5, scale: 4 })
  interestRate: number;

  /**
   * User key from Auth service
   */
  @Column({ type: 'varchar' })
  userKey: string;

  async getUser(): Promise<User> {
    const user = await User.findOne({ userKey: this.userKey });
    return user;
  }
}
