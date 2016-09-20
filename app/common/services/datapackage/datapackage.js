/* Note, must import chi-datapackage/dist because SystemJS does not support mixed ES6/CJS modules */

const DataPackageService = require('chi-datapackage/dist/service');
const Normalizer = require('chi-datapackage/dist/normalizer');

const dataPackageService = new DataPackageService();

dataPackageService.mime = dataPackageService.normalize.mime;
dataPackageService.Normalizer = Normalizer;

module.exports = dataPackageService;
