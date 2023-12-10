// categorias.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produtos } from './Produtos.entity';

@Entity()
export class Categorias {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 255, nullable: false })
  nome_categoria: string;

  @Column({ length: 255, nullable: true })
  img_categoria: string;

  @OneToMany(() => Produtos, produto => produto.categoria)
  produtos: Produtos[];
}

/*
Table: categorias

Columns:
id_categoria int PK 
nome_categoria varchar(255) 
img_categoria varchar(255)
*/