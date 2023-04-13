import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiHideProperty,
} from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from '@user/user.entity';

@Entity('todos')
export class Todo {
  @ApiProperty({ minimum: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ default: false })
  @Column({ default: false })
  done: boolean;

  @ApiPropertyOptional()
  @ManyToOne(() => User)
  user: User;

  @ApiHideProperty()
  @Exclude()
  @Column()
  userId: number;
}
