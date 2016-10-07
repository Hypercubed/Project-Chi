SystemJS.config({
  production: false,
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  },
  "chi-datapackage": {
    "defaultJSExtensions": true,
    "meta": {
      "*.js": {
        "format": "cjs",
        "loader": "plugin-babel",
        "babelOptions": {
          "modularRuntime": false
        }
      }
    }
  },
  map: {
    "babel-runtime": "npm:babel-runtime@5.8.38"
  }
});
