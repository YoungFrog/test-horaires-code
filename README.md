![Lines of code](https://img.shields.io/tokei/lines/git.esi-bru.be/pbt/displaytimetable?label=lines%20of%20code)
![Website](https://img.shields.io/website?url=http%3A%2F%2Fhoraires.esi-bru.be)

# Display timetable

Use [FullCalendar][1] to display students and teachers timetables[^1].

![Screenshot](.gitlab/screenshot2021.png)

# Live app

Timetables can be seen at https://horaires.esi-bru.be

# Compile and serve

## From docker

If you have Docker, just run
```bash
make
```
and connect to <https://localhost:8080>

## From the local machine

You need node and yarn. To install all the dependencies:

```bash
$ yarn
```

You also need iCalendar files and a config file (detailled explanation can be found below). The easiest is to grab those from our live app, e.g. :

```sh
wget -O- https://github.com/HEB-ESI/heb-esi.github.io/archive/refs/heads/gh-pages.tar.gz |
 tar -zx --strip-components=1 heb-esi.github.io-gh-pages/ical heb-esi.github.io-gh-pages/config
```

Alternatively you can generate them yourself from the ics (see the ics repo).

To compile (the compiled files will be generated in the `./dist` directory)

```bash
$ yarn build # Production
$ yarn dev   # Development
$ yarn watch # Dev + watch for changes
```

Alternatively, you can serve locally :

```bash
$ yarn serve # Dev + watch + serve
```

Pull requests and issues are welcome. 
Before commit, please verify if you respect the linting by executing the command `yarn lint`.

# Internals

Comme mentionné plus haute, nous utilisons [FullCalendar][1] pour afficher des
événements dans un beau calendrier dans le navigateur.

Les événements sont obtenus via des fichiers iCalendar (.ics) généralement
rangés dans une arborescence du type :

```
ical/
├── cours
│   ├── AGLR4.ics
│   ├── ...
│   └── WIRR4-rsml.ics
├── groupes
│   ├── B111.ics
│   ├── ...
│   └── SEC4B.ics
├── profs
│   ├── ABS.ics
│   ├── ...
│   └── YVO.ics
└── salles
    ├── 003.ics
    ├── ...
    └── 604.ics
```

Afin de ne pas coder en dur les noms des fichiers iCalendar utilisés, nous les
récupérons (via AJAX) grâce à un fichier de configuration.

Le nom du fichier de configuration (par défaut `calendars.json`) est
intégré en dur au moment de compiler le projet (voir fichier
`./src/utils/configUrl.json` -- le contenu de ce fichier est typiquement ajusté
par le processus de déploiement ; voir `.github/workflows/main.yml` pour un
exemple).

Les fichiers iCalendar sont générés par la personne en charge des horaires via
son logiciel Hyperplanning. Le fichier de configuration est généré
automatiquement à partir de là. Ceci permet de découpler les mises à jour du
code de celles des fichiers iCalendar.

## Fonctionnement du fichier de configuration

Le fichier de configuration `calendars.json` ressemble a ceci:

```json
{
    "default": "groupes",
    "root": "ical/",
    "data": {
        "profs": {
            "name": "enseignants",
            "items": [
                {
                    "name": "JLE - Juste Leblanc",
                    "code": "JLE"
                },
            ]
        },
        "groupes": {
            "name": "groupes",
            "items": [
                {
                    "name": "A341",
                    "code": "A341"
                },
            ]
        },
        "salles": {
            "name": "salles",
            "items": [
                {
                    "name": "101",
                    "code": "101"
                },
            ]
        },
        "cours": {
            "name": "cours",
            "items": [
                {
                    "name": "Algorithmique 1",
                    "code": "1ALG1A"
                },
            ]
        }
    }
}
```

- Le `name` est affiché à l'écran
- Le `code` est utilisé en interne et pour les liens
- Le `code` est également utilisé pour obtenir le nom du fichier iCalendar :
  `{root}/{category}/{code}.ics` où `root` est défini en début de json, `category` est l'une des quatre catégories, et `code` est le code de l'élément
- Le `code` doit être unique au sein de sa catégorie, et devrait être unique sur tout le fichier.

Un tel fichier de configuration peut être généré à partir des ics : voir le dépôt avec les ics pour le fonctionnement.

# Déploiement via Github

1. Créer un dépôt sur Github avec le contenu du présent dépôt (p.ex. fork)
2. définir le secret CALENDARS_JSON vers une url contenant les ics (TODO: faire une variable plutôt qu'un secret.). Par exemple /nom-du-depot-ics/calendars.json
3. in the action settings : give read AND WRITE permission to Workflow
4. une fois que la branche gh-pages a été créée (par le processus de déploiement normalement), on la définit comme branche utilisée par Github Pages (dans les paramètres)

# Contributors

- Pierre Bettens *pbt*
- Nicolas Richard *nri*
- Frédéric Servais *srv*
- Andrew Sassoye

*v1 « À l'arrache » par Pierre, Nicolas (Némo) et Frédéric (Sébastien)*  
*v2 « Marie revisitée » par Andrews*  
*v2.1 « Peu me chaut » par Nicolas (Némo)*  

[^1]: We used to use [Leonaard project][0] (dead link) together with [ical.js][2] to convert iCalendar (ics) to JSON.
Nowadays FullCalendar fully supports ics as a [Event Source][3] (still using ical.js).

[0]: https://github.com/leonaard/icalendar2fullcalendar

[1]: http://fullcalendar.io/

[2]: https://mozilla-comm.github.io/ical.js/

[3]: https://fullcalendar.io/docs/icalendar

[4]: https://downgit.github.io/#/home?url=https://github.com/HEB-ESI/heb-esi.github.io/tree/gh-pages/ical

[5]: https://github.com/HEB-ESI/heb-esi.github.io/tree/gh-pages/ical  
