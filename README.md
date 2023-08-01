# react-ui

This library is reserved for common UI components used by React applications, according to the Design System specifications.

## Storybook

You can view and try out the components in storybook. You can access it at:

- locally with `yarn start`
- DEV env <https://storybook.internal-dev.parts.tvh.com>
- PROD env <https://storybook.internal-prod.parts.tvh.com>

## Contributing

All changes must be reviewed and approved by the design system team. Just create a Merge Request and they will be notified. Once your pipeline has passed and you have at least 1 approve from the team, you can merge your MR or ask the team to merge it.

## Development

You can develop and test components in storybook or in a client app like the apps in fe-parts.

For live testing in a client app you can use [yarn link](https://classic.yarnpkg.com/lang/en/docs/cli/link/).
Run these commands in this repo

```shell
yarn build
cd dist
yarn link
cd ..
yarn watch
```

and this command in the client repo (fe-parts for example)

```shell
yarn link @tvh/react-ui
```

This will tell the app to use the js files from this repo instead of the version in node_modules.

Static files are only updated by `yarn postbuild` so you have to run this again if you are changing assets.

Use [yarn unlink](https://classic.yarnpkg.com/en/docs/cli/unlink) when you are done.

You could also just install to the client app from the local checkout with `yarn add ../react-ui/dist` instead of linking but this will not track changes, so you would have to run it again after every change.

### Testing versions or branches

The development approach above can be used to test different release versions or dev branches. Just checkout the desired tag or branch.

## Running unit tests

Run `yarn test` to execute the unit tests via [Jest](https://jestjs.io).

## Publish/Deploy

A new version of this library is published on every push to master. Here is the master pipeline that does this <https://jenkins-paas.tools.parts.tvh.com/job/CI/job/common-tools/job/react-ui/job/master/>

The deployment configurations for storybook are in <https://gitlab.tools.parts.tvh.com/digital-delivery/common-tools/react-ui-deploy>

## Versioning

This project uses semantic versioning based on commit messages. You can read more about it at <https://semantic-release.gitbook.io/semantic-release/>

A list of library versions with changelogs is available at <https://gitlab.tools.parts.tvh.com/digital-delivery/common-tools/react-ui/-/releases>