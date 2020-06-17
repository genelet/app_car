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

npm i react-native-elements --save

this may not needed:
npm i --save react-native-vector-icons

npm install @react-native-community/picker --save

npx react-native run-android
