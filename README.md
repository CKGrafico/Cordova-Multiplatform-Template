##Cordova Multiplatform Template
[![forks](https://img.shields.io/github/forks/CKGrafico/Cordova-Multiplatform-Template.svg?label=Forks)](https://github.com/ckgrafico/Cordova-Multiplatform-Template/fork)
[![stars](https://img.shields.io/github/stars/CKGrafico/Cordova-Multiplatform-Template.svg?label=Stars)](https://github.com/ckgrafico/Cordova-Multiplatform-Template/)
[![issues](https://img.shields.io/github/issues/CKGrafico/Cordova-Multiplatform-Template.svg?label=Issues)](https://github.com/CKGrafico/Cordova-Multiplatform-Template/issues)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?label=License)](https://github.com/CKGrafico/Cordova-Multiplatform-Template/blob/master/LICENSE)
[![taco](https://img.shields.io/badge/taco.tools-compatible-E58225.svg)](http://taco.tools/)

###Download from:
[![Visual Studio](https://img.shields.io/badge/Visual%20Studio◢-%2B30.000-9b4f96.svg)](https://visualstudiogallery.msdn.microsoft.com/407fc1f8-538b-4beb-b2b2-69afcb6fbd96)
[![Ionic Market](https://img.shields.io/badge/Ionic%20Market◢-.starter-4087fb.svg)](http://market.ionic.io/starters/multiplatform)
[![Github](https://img.shields.io/badge/Github◢-.zip-74C558.svg)](https://github.com/CKGrafico/Cordova-Multiplatform-Template/releases/latest)

###Important links
- [Cordova Multiplatform Template Website](http://cordova-multiplatform-template.js.org)
- [Frequently Asked Questions (FAQ)](https://github.com/CKGrafico/Cordova-Multiplatform-Template/wiki/Frequently-Asked-Questions-(FAQ)) 

###Instructions:
- #####With text editor and command line:
	- ######Dependencies:
		- Apache Cordova
		- Ionic
		- Nodejs
		
	- ######First steps:
		- Download template from [Ionic Market](http://market.ionic.io/starters/multiplatform)
		- `npm install` *download node packages* 
		- `bower install` *will download bower packages* (ionic is depending on 1.4.3 of angular and mock is on 1.4.7 which leads to conflict, so manual install) 
		- `gulp initialize` *download tsd dependencies*
		- `gulp` to compile once*
		- `ionic serve` or `cordova build 'platform'`, in order to get nice reload experience with serve you should create ionic-project file in app folder - you can take ionic-project-sample to start
		- `gulp test` for one test run of unit-tests in tests folder, `gulp test:auto` for continious runs (in develop)
		- `gulp protractor` for e2e tests from e2e folder in ionic and `gulp protractor:ripple` for ripple - in develop 

- #####With [Visual Studio](visualstudio.com)
	- ######Dependencies
		- Visual Studio 2015
		- Apache Cordova Tools *Check on Visual Studio installation process*
		
	- ######First steps:
		- Download template from [VSGallery](https://visualstudiogallery.msdn.microsoft.com/407fc1f8-538b-4beb-b2b2-69afcb6fbd96)
		- Create a new project *Type: Typescript > Apache Cordova*
		- Install dependencies *Task Runner > Gulp initialize*
		- Build
		
![Template UI](http://i.imgur.com/49FJsty.png)

###Technology
- [Apache Cordova](https://cordova.apache.org/)
- [Ionic Framework](http://ionicframework.com/)

###Collaborators
- [Quique Fdez](http://twitter.com/ckgrafico)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/CKGrafico/cordova-multiplatform-template/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

