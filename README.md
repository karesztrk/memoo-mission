# Memoo Mission

A [Memory game](https://news.ycombinator.com/) application. The project itself
is homework for bene:studio. That's how the name originated.

In general, the project is built using the [Astro framework](https://astro.build/).
It also utilizes [React](https://react.dev/) to render specific components.
The final bundle is a SSG web application.

## Features

- [x] User settings
  - [x] Username
- [x] Game settings
  - [x] Time
  - [x] Pair
  - [x] Guesses (optional)
- [ ] Custom card
  - [x] Card faces from a static file
  - [ ] User selection
- [x] Score
  - [x] Game score
  - [ ] Score board
- [x] Animations
- [x] Light / Dark mode
- [ ] Persistence
- [ ] Content Security Policy

## Design & UX

The final look and feel are bene:studio mockup, which you can find on [Figma](https://www.figma.com/design/NUPxzSfmeo0NgNGW680kDI/Memory-Game?node-id=11-82118&t=NBBzNJoLaT8gFQKi-0).

## Build

```sh
pnpm build
```

## Dev

```sh
pnpm dev
```

## Run

### Local

To serve the application, execute the following script.
It will start the server on \_port 3000 by default.

```sh
# npm i -g serve
serve ./dist
```

For more information visit [Astro docs](https://docs.astro.build/en/guides/integrations-guide/node/).

### Docker

Build a Docker image (prefer [Buildx](https://docs.docker.com/build/concepts/overview/#buildx))
from the `Dockerfile`. Start a new container from the build image.

```sh
# install dockerx
docker build -t memoo-mission .
docker run --name memoo-mission -p 80:80 -d memoo-mission
# visit http://localhost:80/
```

## Test

### Unit tests

```sh
pnpm test
```

### E2E tests

```sh
pnpm e2e
```
