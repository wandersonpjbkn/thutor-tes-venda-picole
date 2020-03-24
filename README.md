# Projeto 'Venda de Picolé'

## Configuração banco de dados localmente

O sistema utiliza o MongoDB como banco de dados e para o correto funcionamento é preciso algumas pré-configurações:

### Instalação

- Visite [este link](https://www.mongodb.com/download-center/community) para baixar a última versão do MongoDB
- Nas opções, escolha:
  - Version: 4.2 (current release)
  - OS: versão compativél ao OS do computador
  - Package: MSI
- Instale o MongoDB

### Banco

- Abra o prompt de comando e digite a linha abaixo para criar a pasta local do banco:
  - `mkdir c:\data\db`
- Ou crie essa pasta e subpasta diretamente pelo Windows Explorer
- Note: *precisa ser tudo em minisculo*

### PATH

- Por fim, verifique se foi adicionado a entrada abaixo em `Path` nas Variaveis de Ambiente do Windows, Variavéis do Sistema:
  - `C:\Program Files\MongoDB\Server\4.2\bin`

Havendo dúvidas, seguir as instruções [deste link](https://www.youtube.com/watch?v=sBdaRlgb4N8&feature=youtu.be) - *tudo em inglês*

## Execução

Inicialize o MongoDB
> Abra um prompt e execute `mongod`. Esse prompt necessita ficar aberto.

```cmd
Win + R
cmd /k mongod
```

Abra o VSCode ou similar, instale as dependências e inicialize o servidor
> No VSCode, navegue até a pasta do servidor, instale as dependências e inicialize-o

```bash
cd server
npm install
npm start
```

Abra o aplicativo
> Ainda no VSCode, navegue até `app\dist` e execute o `index.html`

```bach
app\dist\index.html
```

### Build e Watch

Para edição da aplicação, instale também as dependências do app e faça as edições em `src\js\main.js`

```bash
cd app
npm install
```

- Build

```bash
npm run build
```

- Watch

```bash
npm run serve
```

Para edição das folhas de estilo, faça-as em `src\scss\main.scss`. No VSCode, execute a tarefa `SCSS Compile` pelo atalho `CTRL+SHIFT+B`

## Tecnologias

- HTML5
- CSS3
- [SCSS](https://sass-lang.com/guide)
- [VueJS](https://vuejs.org/)
- [UIkit](https://getuikit.com/docs/introduction)
- NodeJS
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- MongoDB

## Tempo de trabalho

- Total: 23hs
- 04/12/2018: 11hs
- 05/12/2018: 12hs
