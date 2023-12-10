import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nome: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100 })
  senha: string;
}

/*
Table: user

Columns:
id int AI PK 
nome varchar(50) 
email varchar(50) 
senha varchar(25)
*/