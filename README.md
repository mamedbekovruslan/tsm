Для сборки .apk

npm run build

npx cap copy

cd android

./gradlew assembleDebug или для релизной сборки: ./gradlew assembleRelease

adb devices

cd android/app/build/outputs/apk/debug

adb install app-debug.apk
