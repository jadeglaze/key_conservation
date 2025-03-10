# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.


## TODO

- [ ] Check on different devices/screen sizes
  - [x] iPad Pro 11-inch M4
  - [ ] iPhone SE 
- [x] Add a splash of color
- [ ] Fix verticle stability of main board (it moves up/down when Play Again button is visible or not)
- [x] Adjust relative sizes in portrait mode so more of historical game visible (smaller main grid)
- [x] Fix buttons to be visible in landscape view
- [x] Fix game history to scroll properly in portrait view
- [ ] Fix upside-down orientation
- [ ] Add a logo/icon


Note: This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

