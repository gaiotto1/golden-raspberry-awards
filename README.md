# Projeto Golden Raspberry Awards 🎬

Este é um projeto desenvolvido em **Next.js** com **React** que exibe informações sobre filmes e prêmios da categoria de Pior Filme do Golden Raspberry Awards. A aplicação permite visualizar, filtrar e navegar por uma lista de filmes vencedores e indicados, com integração a uma API para obtenção de dados em tempo real.

## Sumário

- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Documentação](#documentação)

---

## Visão Geral

Esta aplicação foi desenvolvida para oferecer uma interface de fácil uso onde os usuários podem:

- Filtrar filmes por ano e status de vencedor.
- Navegar entre as páginas de filmes.
- Visualizar detalhes sobre estúdios, produtores e anos com múltiplos vencedores.
- Consultar uma documentação completa dos componentes através do Storybook.

## Pré-requisitos

Certifique-se de ter o **Node.js** e **npm** (ou **yarn**) instalados. Você pode verificar a instalação usando:

```bash
node -v
npm -v
# ou
yarn -v
```

## Instalação

Para configurar e rodar o projeto localmente, siga os passos abaixo.

### 1. Clonar o Repositório

Primeiro, clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/gaiotto1/golden-raspberry-awards
cd golden-raspberry-awards
```

### 2. Instalar as depêndencias

```bash
npm install
# ou
yarn
```

### 3. Iniciando o projeto

```bash
npm run dev
# ou
yarn dev
```

## Documentação

A documentação pode ser acessada através do storybook, pelo comando abaixo:

```bash
npm run storybook
# ou
yarn storybook
```

O Storybook estará disponível em http://localhost:6006
