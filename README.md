# Memoo Mission

A [Memory game](https://news.ycombinator.com/) application. The project itself is homework for bene:studio. That's how the name originated.

In general, the project is built using the [Astro framework](https://astro.build/). It also utilizes [React](https://react.dev/) to render specific components. The final bundle is a SSG web application.

## Features

- [x] User settings
  - [x] Username
- [x] Game settings
  - [x] Time
  - [x] Pair
  - [x] Guesses (optional)
- [ ] Custom card faces
- [x] Game score
- [x] Animations

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

To serve the application, execute the following script. It will start the server on \_port 3000 by default.

```sh
# npm i -g serve
serve ./dist
```

For more information visit [Astro docs](https://docs.astro.build/en/guides/integrations-guide/node/).

## Test

### Unit tests

```sh
pnpm test
```

### E2E tests

```sh
pnpm e2e
```
