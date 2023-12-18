// produtos.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Categorias } from './Categorias.entity';
import { Precos } from './Precos.entity';

@Entity()
export class Produtos {
  @PrimaryGeneratedColumn()
  id_produto: number;

  @Column({ length: 255, nullable: false })
  nome_produto: string;

  @ManyToOne(() => Categorias, categoria => categoria.produtos)
  categoria: Categorias;

  @Column({ length: 255, nullable: true })
  img_produto: string;

  @OneToMany(() => Precos, preco => preco.produto)
  precos: Precos[];

  @Column({ length: 255, nullable: false })
  medida: string;

}

/*
Table: produtos

Columns:
id_produto int PK 
nome_produto varchar(255) 
id_categoria int 
img_produto varchar(255)
medida varchar(255)
*/