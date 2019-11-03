# Varedoo

Find your colleagues -  quickly!

## Project setup

Install Node version manager as described here:
```
https://github.com/nvm-sh/nvm
```
Then install Node:

```
nvm install 12
```
Install `yarn` package manager as described here:
```
https://yarnpkg.com/lang/en/docs/install/#debian-stable
```

Download and install Postgres 11 from:
```
https://www.postgresql.org/download/
```

Log in into the postgres shell:
```
psql ( enter the password for postgressql)
```
and then run the following SQL script:
```
create user varedoo;
create database varedoo;
alter user varedoo with encrypted password 'varedoo';
grant all privileges on database varedoo to varedoo;
```

Clone this repo and `cd` into the project's root folder, then run the following command to install project's dependencies:
```
yarn install
yarn run build
```
To start the server:
```
cd packages/server
yarn run start:node
```
Open `http://localhost:3000/` in your browser - happy hacking!
