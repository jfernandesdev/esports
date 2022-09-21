# eSports <img src='https://github.com/jfernandesdev/esports/blob/a93cd06a3c75118335c0e3b04aa3790a12c1469d/web/public/favicon.svg' width='50px' />

Projeto Back-end, Front-end e Mobile desenvolvido durante o NLW#eSports by Rocketseat instruído por Diego Fernandes e Rodrigo Gonçalves. 🎮

### Descrição:
O projeto trata-se de uma plataforma que permite os usuários buscarem seu duo (dupla) em jogos online e publicar um anúncio para encontrar o parceiro perfeito para jogar seu jogo favorito juntos.

- [x] Projeto Back-end (API), Front-end e App Mobile;
- [x] Listagem de jogos em alta da Twitch;
- [x] Modal para publicação de novo anúncio;
- [x] Conecta os jogadores por meio de anúncios nos games;

O próximo nível...
- [x] Carousel dos banner dos games e anúncios;
- [x] Páginas dos games com os respectivos anúncios (features do app mobile na versão web);
- [x] Responsividade mobile;
- [x] Skeleton loading;
- [ ] Login social com Discord (em breve...)
- [ ] Testes unitários (em breve...)


## Tecnologias utilizadas: 🚀

### Server
- Node.js | 16.15.0
- Typescript | ^4.8.3 -D
- Prisma | ^4.3.1 -D
- Express | ^4.18.1

### Web
- ReactJs | ^18.2.0
- Vite | ^3.1.0 -D
- Typescript | ^4.6.4 -D
- TailwindCSS: ^3.1.8 -D
- React Router DOM | ^6.4.0
- Axios | ^0.27.2
- Radix UI | ^1.0.0

### Mobile
- Expo | ~46.0.9
- React Native | ^0.69.5
- Typescript | ^4.3.5 -D
- Axios | ^0.27.2

## Layout (design by @rocketseat) 🤩

### Desktop (screenshot):

| Home | Modal New Ad |
| --- | --- |
| <img src="https://github.com/jfernandesdev/esports/blob/f71897dc0a3aec14accce6d87b3e68ed6d729dc3/web/public/layout/desktop-1.png" /> | <img src="https://github.com/jfernandesdev/esports/blob/f71897dc0a3aec14accce6d87b3e68ed6d729dc3/web/public/layout/desktop-2.png" /> | 

| Game (página extra desenvolvida)| Let's play (página extra desenvolvida)|
| --- | --- |
| <img src="https://github.com/jfernandesdev/esports/blob/f71897dc0a3aec14accce6d87b3e68ed6d729dc3/web/public/layout/desktop-3.png" /> | <img src="https://github.com/jfernandesdev/esports/blob/f71897dc0a3aec14accce6d87b3e68ed6d729dc3/web/public/layout/desktop-4.png" /> |

### Mobile - Web (screenshot):

| Home | Modal New Ad | Game | Let's play |
| --- | --- | --- | --- |
| <img src="https://github.com/jfernandesdev/esports/blob/f71897dc0a3aec14accce6d87b3e68ed6d729dc3/web/public/layout/mobile-2.png" width='275px' /> | <img src="https://github.com/jfernandesdev/esports/blob/f71897dc0a3aec14accce6d87b3e68ed6d729dc3/web/public/layout/mobile-1.png" width='275px' /> | <img src="https://github.com/jfernandesdev/esports/blob/f71897dc0a3aec14accce6d87b3e68ed6d729dc3/web/public/layout/mobile-3.png" width='275px' /> | <img src="https://github.com/jfernandesdev/esports/blob/f71897dc0a3aec14accce6d87b3e68ed6d729dc3/web/public/layout/mobile-4.png" width='275px' /> |


###  Rodando o "Server" e "Web" localmente

Primeiro, instale as depedências e crie o banco de dados executando:
```sh
$ npm install
$ npx prisma migrate dev
```

Depois disso, para iniciar o servidor, execute:
```sh
$ npm run dev
```

###  Web

Para executar o cliente "Web" local:
```sh
$ npm install
$ npm run dev
```


### Dê uma olhada como o projeto ficou! 👀
https://esports-jfernandesdev.vercel.app/

<br>

<img src="https://i.ibb.co/Yckq764/footer-signature.png" alt="footer-signature" border="0"  width='400px' />
