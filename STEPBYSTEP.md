###Example for Blackberry app on Windows
- [Readme first installation](https://github.com/CKGrafico/Cordova-BaseProject-Multiplatform#setup-first-time)
- [Create new project](https://github.com/CKGrafico/Cordova-BaseProject-Multiplatform#create-new-project)
- [Download BB10 SDK for Webworks](https://developer.blackberry.com/html5/download/)
- [Signing setup](https://developer.blackberry.com/html5/documentation/v1_0/signing_setup.html)
- Open console command in your project folder
	+ cd debug
	+ _initialize.bat (bug: check this 2 times)
	+ _watch.bat

- Edit your app in this folder
- Finish your app
	+ _build.bat
- Take a coffee <3
- Open console command in your project folder
	+ cordova platform add blackberry10
	+ cordova build
	+ cordova run blackberry10 --devicepass #### --keystorepass #### // testing in your phone