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

npm install --save react-native-device-info
npm audit fix

npx react-native link // needed for icons to show up!
npx react-native run-android

Server:
change
LogFormat "%h %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined
to 
LogFormat "%h %{X-Unique-ID}i %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined
Release

Follow
https://reactnative.dev/docs/signed-apk-android
in particular,  buildType has to be
release {
  signingConfig signingConfigs.release
}


vi app/build.gradle
change version code xyz
change version name x.y.z
cp those sized launcher PNGs to android/app/src/main/res/mipmap-(abcd)dpi/

before making the aab file, follow https://reactnative.dev/docs/removing-default-permissions
to remove few permissions.
