# car_recall

for git:

npx react-native init Recalls

git checkout git@github.com:genelet/app_car.git Recalls

note that in metro.config.json, it adds:
```
  resolver: {
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx']
  },
```
so to accept 'jsx'

cd Recalls

npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer

npm install react-native-elements react-native-vector-icons @react-native-community/picker --save

npx react-native link // needed for icons to show up!
npx react-native run-android

Release

Follow
https://reactnative.dev/docs/signed-apk-android
in particular,  buildType has to be
release {
  signingConfig signingConfigs.release
}

before making the aab file, follow https://reactnative.dev/docs/removing-default-permissions
to remove few permissions.
