# Senior Design

## Environment setup

- Follow the official [React Native setup instructions](https://reactnative.dev/docs/environment-setup) under the **React Native CLI Quickstart** tab for your specified OS (skip the **Creating a new application** and the **Running your React Native application** sections).

### Android setup

- Open a terminal and run the following commands in the project directory:

```sh
yarn install
yarn start
```

- In a new terminal tab, run the following command in the project directory to start the emulator:

```sh
yarn run android
```

### iOS setup

- Open a terminal and run the following commands in the project directory:

```sh
yarn install
npx pod-install
yarn start
```

- In a new terminal tab, run the following command in the project directory to start the emulator:

```sh
yarn run ios
```

## Commands

- `yarn start`: start Metro Bundler
- `yarn run android`: start Android emulator
- `yarn run ios`: start iOS emulator
- `yarn run test`: run unit tests
- `yarn run lint`: lint code

For more information, refer to the `scripts` section of `package.json`.

## Additional resources

- [React+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react)
- [VisionCamera Frame Processors](https://mrousavy.com/react-native-vision-camera/docs/guides/frame-processors)
