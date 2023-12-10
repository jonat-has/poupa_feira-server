import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../models/User.entity'
import bcrypt from 'bcrypt'
import JsonWebToken from 'jsonwebtoken'

export default {

    async getAllUser(req: Request, res: Response) {
        const user = await AppDataSource
        .getRepository(User)
        .manager
        .find(User)

        console.log(user)
        res.send(user)
    },
    
    async getOneById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
      
        try {
          const user = await AppDataSource.getRepository(User).findOneBy( { id: id });
      
          if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
          }
      
          return res.status(200).json(user);
        } catch (error) {
          console.error('Erro ao buscar usuário por ID:', error);
          return res.status(500).json({ message: 'Ocorreu um erro ao buscar o usuário.', error });
        }
      },

    async registerUser(req: Request, res: Response) {
        const { nome, email, senha } = req.body;

        try {
         
          if (!nome || !email || !senha) {
            return res.status(422).json({ message: 'Preencha todos os campos!' })
          }

          const existingUser = await AppDataSource
          .getRepository(User)
          .findOneBy(
             { email: email }
             );

          if (existingUser) {
            return res.status(400).json({ message: 'O email já está em uso.' });
          }

          const salt = bcrypt.genSaltSync(10)

          const senhaHash = bcrypt.hashSync(senha, salt)
        
          await AppDataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
            { nome: nome, email: email ,senha: senhaHash}
            ])
            .execute()
      
          return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
        } catch (error) {
          console.error('Erro ao registrar usuário:', error);
          return res.status(500).json({ message: 'Ocorreu um erro ao registrar o usuário.' });
        }
    },

    async loginUser(req: Request, res: Response) {
        const { email, senha } = req.body;

        try {
          if (!email || !senha) {
            return res.status(422).json({ message: 'Preencha o email e a senha!' });
          }
      
          const user = await AppDataSource.getRepository(User).findOne({ where: { email } });
      
          if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
          }
      
          const senhaValida = await bcrypt.compare(senha, user.senha);
      
          if (!senhaValida) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
          }

          const secret = process.env.SECRET;
      
          const token = JsonWebToken.sign(
            {
            id: user.id
            },
           secret);
      
          return res.status(200).json({ message: 'Login bem-sucedido!', token });
        } catch (error) {
          console.error('Erro ao realizar o login:', error);
          return res.status(500).json({ message: 'Ocorreu um erro ao realizar o login.', error });
        }
    }
}