// mercados.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Precos } from './Precos.entity';

@Entity()
export class Mercados {
  @PrimaryGeneratedColumn()
  id_mercado: number;

  @Column({ length: 255, nullable: false })
  nome_mercado: string;

  @Column({ length: 255, nullable: true })
  localizacao: string;

  @Column({ length: 255, nullable: true })
  img_mercado: string;

  @OneToMany(() => Precos, preco => preco.mercado)
  precos: Precos[];

  @Column({length: 255, nullable: true})
  info: string;
}


/*
Table: mercados

Columns:
id_mercado int PK 
nome_mercado varchar(255) 
localizacao varchar(255) 
img_mercado varchar(255)
*/