SystemJS.config({
  production: false,
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  },
  map: {
    "babel-runtime": "npm:babel-runtime@5.8.38"
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
  }
});
