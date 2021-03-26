# Liber Standalone Pages
### Testes

```
npm run test
```

### Build

```
npm run build
```

### Storybook

Para rodar o Storynook:

```
npm run storybook
```

Para exportar o Storybook:

```
npm run storybook:export
```

### Gerar Estrutura Padrão

Existe um arquivo Node.JS `util` chamado `create-component.js`. Para criar a estrutura padrão de um novo componente você pode usar este comando:

```
npm run generate NomeDoComponente
```

Isso vai gerar:

```
/src
  /NomeDoComponente
    NomeDoComponente.tsx
    NomeDoComponente.stories.tsx
    NomeDoComponente.test.tsx
    NomeDoComponente.types.ts
    NomeDoComponente.scss
```

Os templates podem ser modificados em `util/templates`.

Não esqueça de adicionar o componente no arquivo `index.ts` para exportar o componente!

### Hospedando via GitHub

Gere a build (`npm run build`), adicione, dê commit e push no conteúdo da pasta `build`.

Para instalar o pacote:

```
yarn add git+https://github.com/felipemelz-liber/poc-spa-pages.git#branch
```