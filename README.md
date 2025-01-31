# GoGoTogether – Conectando Pessoas, Facilitando Viagens

![GoGoTogether Logo](https://i.imgur.com/icgjsRQ.png)

## 1. Descrição

O **GoGoTogether** é um sistema de caronas colaborativas desenvolvido em TypeScript utilizando NestJS como framework back-end. O objetivo é conectar motoristas e passageiros de forma segura e eficiente, permitindo que usuários ofereçam e encontrem caronas de maneira simples e organizada.

------

## 2. Sobre esta API

A API **GoGoTogether** gerencia viagens compartilhadas entre usuários cadastrados, permitindo que motoristas publiquem viagens e passageiros encontrem caronas disponíveis de acordo com seus trajetos e horários.

### 2.1. Principais Funcionalidades

1. **Cadastro e autenticação de usuários**  
   - Nome 
   - CPF 
   - Data de nascimento  
   - Telefone  
   - E-mail  
   - Senha  
   - Foto de perfil  
   - Tipo de usuário (motorista ou passageiro)

2. **Gerenciamento de veículos (para motoristas)**  
   - Modelo  
   - Marca  
   - Ano  
   - Placa
   - Capacidade de passageiros  
   - Tipo de combustível

3. **Criação e gerenciamento de viagens**  
   - Origem e destino  
   - Data e hora de partida
   - Preço da viagem  
   - Distância e velocidade média  
   - Status da viagem (agendada, em andamento, concluída, cancelada)  
   - Filtros por origem, destino e data  

------

## 3. Diagrama de Classes

<img src="src\imgs\diagrama_classe.png"/>

------

## 4. Diagrama Entidade-Relacionamento (DER)

<img src="src\imgs\der.png"/>

------

## 5. Tecnologias utilizadas

| Item                          | Descrição  |
| ----------------------------- | ---------- |
| **Servidor**                  | Node.js    |
| **Linguagem de programação**  | TypeScript |
| **Framework**                 | NestJS     |
| **ORM**                       | TypeORM    |
| **Banco de dados Relacional** | MySQL      |

------

## 6. Configuração e Execução

1. Clone o repositório.  
2. Instale as dependências: npm install.  
3. Configure as variáveis de ambiente criando um arquivo .env.  
4. Execute a aplicação: npm run start:dev.  

---