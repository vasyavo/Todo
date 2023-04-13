import {
  ApiProperty,
  ApiHideProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Index, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @ApiProperty({ minimum: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ format: 'email' })
  @Index({ unique: true })
  @Column()
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  firstName?: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  lastName?: string;
}
