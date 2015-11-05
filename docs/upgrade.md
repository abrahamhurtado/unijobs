# Actualizar a la nueva versión de UniJOBS

Haz esto y estarás bien:

1. Guardaremos todo el progeso que llevas (sin commitear) con ```$ git stash```

2. Bajaremos la rama máster del remoto (GitHub) con ```$ git fetch origin master```

3. Nos movemos a máster local ```$ git checkout master```

4. Fusionaremos los cambios del remoto con master ```$ git rebase origin/master```

5. ¡Ésto debería ser todo!

6. Borra ```./node_modules``` en el root del proyecto: ```$ rm -rf ./node_modules```

7. Es recomendable que a partir de aquí vuelvas a instalar las dependencias. Tienes que hacer ```$ npm install``` en ```./web``` y ``./unijobsNative````

8. Resgresa a la rama donde estabas haciendo cambios ```$ git checkout [turama]```

9. Fusiona los nuevos cambios en tu rama ```git rebase master```

10. Aplica tus cambios guardados con ```$ git stash pop```.

11. Happy hacking!
