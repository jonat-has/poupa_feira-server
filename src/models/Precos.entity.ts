// precos.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Produtos } from './Produtos.entity';
import { Mercados } from './Mercados.entity';

@Entity()
export class Precos {
  @PrimaryGeneratedColumn()
  id_preco: number;

  @ManyToOne(() => Produtos, produto => produto.precos)
  produto: Produtos;

  @ManyToOne(() => Mercados, mercado => mercado.precos)
  mercado: Mercados;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  preco: number;
}


/*
Table: precos

Columns:
id_preco int PK 
id_produto int 
id_mercado int 
preco decimal(10,2)
*/