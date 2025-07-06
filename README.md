# 🎬 CineSearch - Aplicação de Filmes com React

![Banner](https://user-images.githubusercontent.com/seuusuario/banner-image.png)  
*Imagem ou gif do app em funcionamento*

---

## 📚 Sobre o Projeto

**CineSearch** é uma aplicação web moderna para buscar, listar e ver detalhes de filmes utilizando a API do [The Movie Database (TMDB)](https://www.themoviedb.org/). Desenvolvido com React, React Router e Tailwind CSS, o projeto oferece uma interface intuitiva e responsiva para os amantes do cinema.

---

## 🚀 Funcionalidades

- Listagem dos filmes mais populares e melhor avaliados  
- Busca de filmes por título com paginação (em desenvolvimento)  
- Visualização detalhada de cada filme (sinopse, nota, duração, gêneros, etc)  
- Navegação dinâmica utilizando React Router  
- Animações suaves com Framer Motion  
- Interface responsiva para desktop e dispositivos móveis  

---

## 🛠 Tecnologias Utilizadas

- [React](https://reactjs.org/)  
- [React Router DOM](https://reactrouter.com/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Framer Motion](https://www.framer.com/motion/)  
- [The Movie Database API (TMDB)](https://www.themoviedb.org/documentation/api)  
- Vite (bundler e ambiente de desenvolvimento)  

---
## 🔑 Obtenha sua chave da API TMDB

Para que a aplicação funcione corretamente, é necessário obter uma chave de API do [The Movie Database (TMDB)](https://www.themoviedb.org/). Siga os passos abaixo para conseguir a sua:

1. Acesse o site oficial: [https://www.themoviedb.org/](https://www.themoviedb.org/)  
2. Crie uma conta gratuita ou faça login, caso já tenha uma.  
3. No seu perfil, acesse a seção **Settings** (Configurações).  
4. Clique em **API** no menu lateral.  
5. Preencha o formulário para solicitar o acesso à API.  
6. Após a aprovação, você receberá uma **API Key** (chave de API).  
7. Copie essa chave e insira no arquivo `.env` do projeto na variável `VITE_API_KEY`.

> Sem essa chave, a aplicação não conseguirá buscar os dados dos filmes.

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v16 ou superior  
- [Yarn](https://yarnpkg.com/) ou npm  

### Passos

1. Clone o repositório  
```bash
git clone https://github.com/seuusuario/cinesearch.git
cd cinesearch
```
2. Instale as dependências
```bash
npm install
# ou
yarn install
```
