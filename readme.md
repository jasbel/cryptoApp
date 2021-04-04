## Crypto App

Is to aplication for can you view state up or down of crypto-coin if the world



link course (View Comment)?
<!-- https://github.com/alesanabria/curso-react-native-cryptoTracker -->

## Deploy Android

Seguir https://reactnative.dev/docs/signed-apk-android or video https://www.youtube.com/watch?v=SXFnpo-6u1U&list=WL&index=5

keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

* generate key move to android/app


ADD in android\gradle.properties code:

MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
<!-- MYAPP_UPLOAD_STORE_PASSWORD=Miromero777
MYAPP_UPLOAD_KEY_PASSWORD=Miromero777 -->
MYAPP_UPLOAD_STORE_PASSWORD=******
MYAPP_UPLOAD_KEY_PASSWORD=******

ADD in android\app\build.gradle android {...}

android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}

Run code
cd android
./gradlew bundleRelease

UPDATE VERSION
====================
* change name and config version on android\app\build.gradle
defaultConfig {
        applicationId "com.mycryptoapp"
        ...
        versionCode 1
        versionName "1.0"
}

cd android
./gradlew assembleRelease