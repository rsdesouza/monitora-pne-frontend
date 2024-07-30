# Frontend do Projeto Angular

Este projeto é o frontend de uma aplicação web desenvolvida com Angular e hospedada no Firebase Hosting. Ele interage com um backend Java no Google App Engine e utiliza Firebase Authentication para gerenciar a autenticação dos usuários.

## Estrutura do Projeto

O projeto foi criado usando Angular CLI e segue a estrutura padrão de diretórios do Angular:

- `src/`: Contém os arquivos principais do código-fonte.
  - `app/`: Contém os componentes, serviços e módulos da aplicação.
  - `assets/`: Contém arquivos estáticos como imagens e estilos.
  - `environments/`: Contém arquivos de configuração de ambiente para diferentes configurações (desenvolvimento, produção, etc.).
- `angular.json`: Arquivo de configuração do Angular CLI.
- `package.json`: Lista de dependências do projeto e scripts de build/serve.

## Pré-requisitos

Certifique-se de ter o Node.js e o Angular CLI instalados em sua máquina:

- [Node.js](https://nodejs.org/) (recomendado: versão 14 ou superior)
- Angular CLI:

  ```sh
  npm install -g @angular/cli
