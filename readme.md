# UniJOBS
Repositorio del proyecto de UniJOBS

Ahora, en el repo de UniJOBS se encuentran dos proyectos: las versiones nativas para iOS y Android en ```./unijobsNative``` y la versión web en ```./web```, junto con el servidor que alimentará a todas las aplicaciones.

## DOCS

- [Updrage Guide](docs/upgrade.md)
- [API](docs/api.md)
- [React: cómo funciona y cómo usarlo](docs/components.md)
- [Consumir datos de la API en nuestros componentes](docs/consumingData.md)
- [Cómo manejar rutas](https://github.com/rackt/react-router/tree/master/docs)

## Corre las aplicaciones

##### NOTA: en modo 'development', aparece un error en consola que habla sobre ```React.render```, el problema es en el package ```react-resolver``` que sigue usando ```react@0.13.0```. Realmente sólo es un warning y la aplicación seguirá funcionando hasta que salga ```react@0.15.x```.

### Requisitos:

#### Universales:
- [Node v4.x.x ó mayor](https://nodejs.org/en/) (de preferencia, usar [```nvm```](https://github.com/coreybutler/nvm-windows)) <- Es mejor si usan 4.2.x!
- [mongoDB](https://www.mongodb.org/) para la base de datos
- ```npm install -g react-native-cli```
- Genymotion, si quieres un emulador de Android más nice.
- [Git, of course](https://git-scm.com/)
- Si usas Windows, [ConEmu](https://github.com/Maximus5/ConEmu/releases) es el campeón para manejar terminal/consola/bash. [Copia mi configuración](https://gist.github.com/arhcstolen/c158e7992f829a4c6e2e)
- Prepara tu editor de texto para usar un linter (eslint, en este caso): [Sublime Text](https://medium.com/@dan_abramov/lint-like-it-s-2015-6987d44c5b48) | [Atom](https://atom.io/packages/linter-eslint)

#### para iOS (en Mac):
- Xcode 6.3 o mayor.
- instalar ```watchman``` vía ```brew```: ```brew install watchman```

#### para Android:
- Instalar el SDK Manager de Android y descargar:
  - Android SDK Build-tools version 23.0.1
  - Android 6.0 (API 23)
  - Android Support Repository
  - (todas las tools para las versiones que queramos soportar)

### Ahora a la acción

Primero:

```
$ git clone https://github.com/arhcstolen/unijobs.git
$ cd unijobs
```

#### Para trabajar en la versión web:
```
$ cd ./web
$ npm install
```

Tienes que tener instalado mongodb en tu computadora, cuando sea el caso, en terminal:
```
  $ mongod
```

En otra terminal, inicializa la base de datos con
```
  $ npm run seed
```

#### Modos de la aplicación

__Development__ (hot reload, assets sin minificar)
```
  $ npm run dev
```

__Production__ (no hot reload, assets comprimidos, minificados, etc).
```
  $ npm run start
```

__Production__ en _Windows_
```
  $ npm run win
```

__Testing__
```
  $ npm run test
```

__Linting__
```
  $ npm run lint
```

#### Para trabajar en las versiones nativas
Recuerda que para esto, ya necesitas tener instalado ___react-native-cli___ (checa los Requisitos Universales)
```
$ cd ./unijobsNative/
$ npm install
$ react-native start //esto inicaliza el packager de React Native
```

__iOS__
- Abre ```./ios/unijobsNative.xcodeproj``` en Xcode y dale run para ver la app en el simulador.
- Abre ```./index.ios.js``` en tu editor y hazle cambios.
- Dale a ⌘-R en el simulador para refrescar el proyecto y ver los nuevos cambios.

__Android__
- En otra terminal, ejecuta ```react-native run-android```

## TODO:
- Hacer más tests (componentes de React, endpoints de GraphQL, etc).
- Añadir más queries y madres a GraphQL __<-- EN PROGRESO__
- Crear la base de datos __<-- LISTO!__
- Conectar el servidor (y GraphQL) con una base de datos (MongoDB) __<-- LISTO!__
- Crear rutas (a la REST) para abstraer los queries de GraphQL (no estoy seguro sobre esto) __<- LOL, NOPE. NO SE HARÁ__
- Conectar datos a los componentes de React. __<-- EN PROGRESO__
- Implementar passwordless para registro de usuarios.
- Implementar lógica para sólo entrar a rutas estando autenticado.
- Agregar estilos (pa' que se vea kawaii).
- Implementar Flux architecture (Redux, principalmente), sólo y sólo si es necesario. __<-- SE SIGUE PENSANDO__

## Links interesantes

### UTILS

[La cagué en un commit, ¿cómo lo arreglo?](http://stackoverflow.com/questions/927358/how-do-you-undo-the-last-commit)

[Fusionar múltiples commits en uno solo](http://stackoverflow.com/questions/2563632/how-can-i-merge-two-commits-into-one)

[Lint like it's 2015](https://medium.com/@dan_abramov/lint-like-it-s-2015-6987d44c5b48)

[Egghead.io](https://egghead.io/)

[Hoja de referencia para Git/GitHub](https://training.github.com/kit/downloads/es/github-git-cheat-sheet.pdf)

### React Native
[Awesome React Native](https://github.com/jondot/awesome-react-native)

[React Native on GitHub](https://github.com/facebook/react-native)

[Use React Native](http://www.reactnative.com/)

### NodeJS
[Awesome Node](https://github.com/sindresorhus/awesome-nodejs)

### Teoría de React
[React on GitHub](github.com/facebook/react)

[Como usar Clases con ES6 y React](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)

[React: Container Components](https://medium.com/@learnreact/container-components-c0e67432e005#.8684ovp2n)

[React: Testing](https://medium.com/@MarcFly1103/react-to-changes-with-pure-components-caa761836e9f#.s8mzea356)

[React Router](https://github.com/rackt/react-router)

[Teoría de Higher Order Functions/Components](https://blog.risingstack.com/functional-ui-and-components-as-higher-order-functions/)

[Creando una app robusta con React](http://maketea.co.uk/2014/03/05/building-robust-web-apps-with-react-part-1.html)

[Smart and Dumb Components (vean el link de Container Components también)](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#3f35)

[Higher Order Components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

[Awesome React](https://github.com/enaqx/awesome-react)

### GraphQL

[GraphQL.org](http://graphql.org/)

[Aswesome GraphQL](https://github.com/chentsulin/awesome-graphql)

[Learn GraphQL](learngraphql.com)

### Testing

[Testing con Tape](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4)

[React to Changes with Pure Components](https://medium.com/@MarcFly1103/react-to-changes-with-pure-components-caa761836e9f)

[5 Preguntas que cada Unit Test debe responder](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)

### EcmaScript 6 y JavaScript en general

[Aprende ES6 a fondo](https://ponyfoo.com/articles/tagged/es6-in-depth)

[You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

## Cómo contribuir

1. Clona el repo
2. Crea una rama para los cambios y trabaja ahí.
3. Recuerda estar checando los cambios en master.
4. Cuando haya cambios en master, fusiónalos con los de tu rama experimental.
5. Cuando esté lista, sube la rama al repo y haz un pull request desde ahí.
6. Si encuentras un problema, abre un issue y escribe cómo sucedio, bajo que circunstancias, para poder replicarlo y ayudarnos entre todos.

**Protip:** hagan ```git rebase``` para fusionar los cambios, es mejor que ```git merge```

**Protip 2:** si pueden incluir tests, mejor!

## Si hay dudas, ya saben: @arhcstolen, arhc.hc@gmail.com y ya se saben mi Facebook :)
