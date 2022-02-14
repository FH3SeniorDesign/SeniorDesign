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
yarn android
```

### iOS setup

#### Simulator

- Open a terminal and run the following commands in the project directory:

```sh
yarn install
npx pod-install
yarn start
```

- In a new terminal tab, run the following command in the project directory to start the emulator:

```sh
yarn ios
```

#### Device

- Open a terminal and run the following commands in the project directory:

```sh
yarn install
npx pod-install
```

- Register for an Apple developer account and use it to sign the application. It is required for iOS device testing. Here is [documentation](https://reactnative.dev/docs/running-on-device) regarding how.

- Once you click `Build` on XCode, the app will be built and installed on your iPhone. As long as your iPhone is on the same WiFi as your laptop, changes you save on TS/JS app files will be automatically built and updated on your iPhone.

> Trouble shooting (from my experience):
> - You may need to manually "trust" the installed app in Settings before you can open it (due to unidentified developer). [Here's](https://developer.apple.com/forums/thread/660288) how.
> - iOS builds on XCode that fail due to "semantic errors" usually can be fixed by simply cleaning your project build and rebuilding.
> - If you have `nvm` installed, you may run into `Command PhaseScriptExecution failed with a nonzero exit code` when building in XCode. This particular issue seems to be caused by `nvm` and `react native` using clashing environment variables. You can fix by either uninstalling `nvm` if you don't use it or unlinking `nvm` with `nvm unalias default`. See [this](https://github.com/facebook/react-native/issues/31181#issuecomment-811574602).

## Commands

- `yarn start`: start Metro Bundler
- `yarn android`: start Android emulator
- `yarn ios`: start iOS emulator
- `yarn test`: run unit tests
- `yarn lint`: lint code

For more information, refer to the `scripts` section of `package.json`.

## Additional resources

- [React+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react)
- [VisionCamera Frame Processors](https://mrousavy.com/react-native-vision-camera/docs/guides/frame-processors)
