SystemJS.config({
  production: false,
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  },
  map: {
    "babel-runtime": "npm:babel-runtime@5.8.38"
  }
});
