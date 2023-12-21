# Usa uma imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos necessários
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código-fonte
COPY . .

# Compila o código TypeScript para JavaScript
RUN npx tsc

# Porta em que a aplicação estará disponível
EXPOSE 8080

# Comando para iniciar sua aplicação quando o contêiner for executado
CMD ["npm", "start"]
