SystemJS.config({
  production: true,
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/",
    "local:": "jspm_packages/local/",
    "project-chi/": "src/"
  },
  packages: {
    "npm:jspm-nodelibs-util@0.2.1": {
      "map": {
        "./isBuffer.js": "./isBufferBrowser.js"
      }
    }
  }
});
