---
id: 'drupal-local-development'
title: 'Local Development'
slug: '/backend-starters/decoupled-drupal/local-development'
sidebar_position: 1
---

## Before You Begin

The example local environment configurations outlined below are based on
[Lando](https://lando.dev/). To install Lando, follow the
[Lando installation instructions](https://docs.lando.dev/getting-started/installation.html).

Depending on your role, you may only need a local backend environment, or you
may instead prefer a local environment that can run both the back-end and
front-end. The following sections outline the steps to set up a local
environment for each of these use cases.

## Backend Only Setup

If you are creating a local environment for your Drupal backend only, you can
use the default Pantheon recipe provided by Lando. For more information, see the
[Getting Started section of the Lando Pantheon Plugin documentation](https://docs.lando.dev/pantheon/getting-started.html).

## Combined Frontend and Backend Setup

- Create `.lando.yml` in the root of the project.
- Copy the following config into `.lando.yml`

```
name: %SITE_NAME%
recipe: pantheon
config:
  framework: drupal9
  site: %SITE_NAME%
  id: %PANTHEON_SITE_ID%

proxy:
  frontend:
    - %SITE_NAME%-fe.lndo.site:%PORT-NUMBER%

excludes:
  - frontend/node_modules
  - node_modules

services:
  frontend:
    type: node:16
    globals:
      npm: latest
    build:
      - "npm install --prefix ./frontend"
    port: %PORT-NUMBER%
    ssl: true
    scanner: false

tooling:
  node:
    service: frontend
  npm:
    service: frontend
    cmd:
      - "npm --prefix ./frontend"
  yarn:
    service: frontend
    cmd:
      - "yarn --cwd=/app/frontend"
```

Note: Replace `%SITE-NAME%`, `%PANTHEON_SITE_ID%`, and `%PORT-NUMBER%`, with
site name, site id and required port number for the frontend site.

- Clone the Front-end Site code base into the `./frontend` directory. You will
  most likely want to add this directory to your `.gitignore` file for the
  project.
  ```
  cd frontend
  git clone git@github.com:pantheon-systems/example-fe-site.git .
  ```
- Consult `.env.example` to create the required environment variables files for
  your Front-end Site.
- Run `lando start` to start the containers.
- Install the Drupal site and select profiles like:
  pantheon_decoupled_umami_demo & pantheon_decoupled_profile.
- To start your Front-end site, run `lando npm run develop`. It will now be
  available at the URL specified in the `proxy` section of the `.lando.yml`
  file.
