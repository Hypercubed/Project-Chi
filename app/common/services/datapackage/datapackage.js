const DataPackageService = require('chi-datapackage/dist/service');
const Normalizer = require('chi-datapackage/dist/normalizer');

const dataPackageService = new DataPackageService();

dataPackageService.Normalizer = Normalizer;

module.exports = dataPackageService;
