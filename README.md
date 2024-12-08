# Projeto Laravel 11 & React

Este projeto utiliza **Laravel 11** como backend e **React** (com Vite e Material UI) como frontend, proporcionando uma arquitetura moderna e escalável para desenvolvimento de aplicações web.

## Sumário

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Integrantes](#integrantes)

---

## Requisitos

Certifique-se de atender aos requisitos a seguir:

- **PHP** >= 8.3
- **Composer**
- **Node.js** >= 18
- **NPM** ou **Yarn**
- **Banco de Dados** (MySQL exigido pela atividade)
- **Git**

---

## Instalação

### Clonar o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```
## Configurar o backend (Laravel 11)

1. **Navegue para a pasta `backend`:**

    ```bash
    cd backend
    ```

2. **Instale as dependências:**

    ```bash
    composer install
    ```

3. **Crie o arquivo `.env`:**

    ```bash
    cp .env.example .env
    ```

4. **Configure o arquivo `.env`** com as informações do seu banco de dados e outras variáveis necessárias.

5. **Gere a chave da aplicação:**

    ```bash
    php artisan key:generate
    ```

6. **Execute as migrações e as seeds:**

    ```bash
    php artisan migrate --seed
    ```

7. *(Opcional)* **Configure o Passport (ou Sanctum, dependendo do seu sistema de autenticação):**

    ```bash
    php artisan passport:install
    # ou
    php artisan vendor:publish --tag="sanctum-config"
    ```

8. **Inicie o servidor local do Laravel:**

    ```bash
    php artisan serve
    ```

    O backend estará acessível em: [http://localhost:8000](http://localhost:8000).

---

## Configurar o frontend (React com Vite)

1. **Navegue para a pasta `frontend`:**

    ```bash
    cd frontend
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn
    ```

3. **Crie um arquivo `.env` na raiz do frontend:**

    ```bash
    touch .env
    ```

4. **Adicione a URL da API do backend ao `.env`:**

    ```env
    VITE_API_URL=http://localhost:8000/api
    ```

5. **Inicie o servidor local do Vite:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

    O frontend estará acessível em: [http://localhost:3039](http://localhost:3039).

---

## Como rodar o projeto

Após seguir as instruções de instalação:

1. **Certifique-se de que o backend está rodando:**

    - Inicie o servidor Laravel:
      ```bash
      php artisan serve
      ```
    - Certifique-se de que as migrações foram aplicadas.

2. **Certifique-se de que o frontend está rodando:**

    - Inicie o servidor Vite:
      ```bash
      npm run dev
      ```

3. **Acesse as aplicações:**
    - Frontend: [http://localhost:3039](http://localhost:3039)
    - Backend: [http://localhost:8000](http://localhost:8000)



# Sistema de Gerenciamento de Doações de Órgãos

Este projeto é uma aplicação web desenvolvida para gerenciar a doação e recepção de órgãos, incluindo funcionalidades específicas para administradores, receptores e doadores. Ele foi construído utilizando **Laravel** no backend e **MySQL** para o banco de dados, além de um frontend responsivo e intuitivo.

---

## 🛠 Funcionalidades Implementadas

### Backend (Laravel + MySQL)
- **Usuários**: Cadastro de usuários com informações gerais, endereço e perfil.
- **Perfis**: Definição de perfis para Administrador, Receptor e Doador.
- **Endereços**: Registro completo de endereços.
- **Órgãos**: Cadastro e gerenciamento de órgãos disponíveis para doação ou recepção.
- **Hospitais**: Cadastro de hospitais que fazem parte do sistema.
- **Relações Usuários-Órgãos**: Controle de relação entre usuários e órgãos, diferenciando entre receptores e doadores.
- **Hospitais-Usuários**: Controle de vínculo entre usuários e hospitais.
- **Autenticação e Autorização**: Implementação de login seguro e controle de acesso baseado em perfil.

### Frontend
- **Tela de Login**: Autenticação de usuários.
- **Tela de Cadastro**: Registro de novos usuários.
- **Dashboard**:
  - **Administrador**:
    - Listagem de usuários cadastrados (separados por perfil).
    - Cadastro e listagem de hospitais.
    - Cadastro e listagem de órgãos.
  - **Receptor**:
    - Exibição de órgãos que o usuário está aguardando.
  - **Doador**:
    - Exibição de órgãos que o usuário cadastrou para doação.

---

## 📂 Estrutura do Projeto

### Backend
- Estruturado seguindo os princípios **S.O.L.I.D** para modularidade e manutenibilidade.
- Uso de relacionamentos adequados entre tabelas.
- Diretórios organizados conforme as melhores práticas de Laravel.

### Frontend
- Design responsivo e intuitivo.
- Apresentação clara e bem estruturada das informações no dashboard e nas tabelas necessárias.

---

## Integrantes

Ana Júlia Dias Barreto - 2212188

Vitória Oliveira Gomes Melo - 2210249 

Luiz Fellipe Mendes de Oliveira - 2211333 

Breno Cappelle de Almeida - 2221510 

Maria Vitória Matos Costa Beber - 2211107

Luan Lamim Teodoro - 2117746

Gabriel Marques de Freitas - 2210601

Gustavo Henrique Santos Souza - 2210870

Jhonata dos Santos Alves - 2210576

Victor Hugo Nunes Batista de Sousa - 2213188