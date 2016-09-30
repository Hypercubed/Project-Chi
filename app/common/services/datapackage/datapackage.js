/* Note, must import chi-datapackage/dist because SystemJS does not support mixed ES6/CJS modules */

const store = require('chi-datapackage/dist/store');
const Normalizer = require('chi-datapackage/dist/normalizer');

const dataPackageService = store.dataPackageService;

dataPackageService.Normalizer = Normalizer;
dataPackageService.Resource = store.Resource;
dataPackageService.Package = store.Package;
dataPackageService.makeResource = store.makeResource;
dataPackageService.makePackage = store.makePackage;
dataPackageService.mime = dataPackageService.normalize.mime;

module.exports = dataPackageService;
