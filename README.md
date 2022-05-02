<p align="center">
  <a href="https://www.figma.com/proto/DbWXskHqLeU3ZASzgA41mP/TuyaCart?node-id=183%3A129&scaling=scale-down&page-id=0%3A1&starting-point-node-id=183%3A129" target="_blank"><img src="https://user-images.githubusercontent.com/53051441/154882789-0c993f10-4216-456c-bf1a-51254b84079b.png" width="320" alt="CrediTuya Logo" /></a>
</p>

  <p align="center">Backend service for CrediTuya application made in <a href="https://nestjs.com/" target="_blank">NestJS</a></p>
    <p align="center">
<img src="https://img.shields.io/github/issues/juansedo/tuya-credit-be?style=flat-square" alt="GitHub issues" />
<img src="https://img.shields.io/github/stars/juansedo/tuya-credit-be?style=flat-square" alt="GitHub stars" />
<img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square" alt="Mantained" />
<br />
<img src="https://github.com/juansedo/tuya-credit-be/actions/workflows/ci.yml/badge.svg" alt="NestJS CI" />
</p>

## Description

A full backend service for CrediTuya application.

## Requirements

- A `mariadb` database is required. You can start a local database using this [docker image](https://hub.docker.com/_/mariadb).

- Fill the `.env.example` file and change its name by `.env`

## Installation

```bash
$ npm install
```

## Running the migrations

```bash
# generate new migrations from *.entity.ts modified
npm run migrations:generate -- -n NAME # Change NAME

# migrations up
npm run migrations:run

# show applied migrations
npm run migrations:show

# migrations revert
npm run migrations:revert

# drop the whole schema
npm run migrations:drop
```

`src/database/migrations` is the migrations folder.

## Running the data seeders

```bash
npm run seeder:run
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Linters and formatters

```bash
# ESLint --fix
npm run lint

# prettier --write
npm run format
```

If you have any conflict between `.prettierrc` and linter rules, please restart ESLint server.

In VSCode, look for `ESLint: Restart ESLint Server`

![image](https://user-images.githubusercontent.com/52968530/156955385-d5ef4ade-9a8c-42d0-97c9-cf140f3b82cb.png)


## Contributors

|Username|Name||
|------|-------|-----|
|**hfbanilatq**|Hector Fabio Banilat Quintero|<a href="https://github.com/hfbanilatq"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width=30></a>|
|**dcalleg707**|David Calle González|<a href="https://github.com/dcalleg707"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width=30></a>|
|**juansedo**|Juan Sebastián Díaz Osorio|<a href="https://github.com/juansedo"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width=30></a>|
|**sanhidalgoo**|Santiago Hidalgo Ocampo|<a href="https://github.com/sanhidalgoo"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width=30></a>|
|**cmilojr**|Juan Camilo Jiménez Rojas|<a href="https://github.com/cmilojr"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width=30></a>|
|**Jriosv**|Julián Ríos Vásquez|<a href="https://github.com/jriosv"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width=30></a>|


## License

...
