# siggame/Vivi

[![Travis](https://img.shields.io/travis/siggame/vivi.svg?style=flat-square)](https://travis-ci.org/siggame/vivi)
[![Docker Pulls](https://img.shields.io/docker/pulls/siggame/vivi.svg?style=flat-square)](https://hub.docker.com/r/siggame/vivi/)
[![GitHub Tag](https://img.shields.io/github/tag/siggame/vivi.svg?style=flat-square)](https://github.com/siggame/vivi/tags)
[![Dependencies](https://img.shields.io/david/siggame/vivi.svg)](https://github.com/siggame/vivi)

## Table Of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributors](#contributors)
- [Change Log](#change-log)
- [License](#license)
- [Contributing](#contributing)
- [FAQ](#faq)

## Description

`Vivi` is a discord bot developed in Typescript. Why? Because we were told to do so.
The main functionality of `Vivi` is doing something we refer to as `gerty`. `Vivi` now can commit to a `status` repo we use to update the status website.
The other functionality of `Vivi` is that he will do meeting reminders for teams and allow teams to cancel a meeting for the week.

## Getting Started

How to get/install the service or library.

## FAQ

No one talks about this bot honestly.

## Usage

- Create a `.env` file:

```bash
  echo "GUILD_NAME=<GUILD NAME>
  PREFIX=<SOME PREFIX>
  TOKEN=<YOUR TOKEN>
  STATUS_REPO_NAME=<REPO NAME>
  STATUS_REPO_OWNER=<ORG NAME>
  STATUS_GITHUB_TOKEN=<YOUR PERSONAL ACCESS TOKEN>
  STATUS_CHANNEL_ID=<CHANNEL ID FOR UPDATE COMMAND>" > .env
```

- To run vivi:

```bash
  npm install
  npm run start
```

- Vivi will run until you ctrl-c out of the process
- It's probably not a good idea to run it when it already running. You should also check Discord to see if `vivi` is already connected to the server.

## Contributors
- [Quincy Conduff](https://github.com/user404d)
- [Dylan Warren](https://github.com/Uhuh)

## Change Log

View our [CHANGELOG.md](https://github.com/siggame/vivi/blob/master/CHANGELOG.md)

## License

View our [LICENSE.md](https://github.com/siggame/colisee/blob/master/LICENSE.md)

## Contributing

View our [CONTRIBUTING.md](https://github.com/siggame/colisee/blob/master/CONTRIBUTING.md)
