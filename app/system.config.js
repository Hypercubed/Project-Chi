System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system",
      "es7.decorators",
      "es7.classProperties"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  buildCSS: true,
  separateCSS: true,
  buildHTML: true,

  packages: {
    "": {
      "defaultJSExtensions": true,
      "meta": {
        "*.md": {
          "loader": "md",
          "mdOptions": {
            "tables": true
          }
        }
      }
    }
  },

  map: {
    "FileSaver": "github:eligrey/FileSaver.js@master",
    "ManifestWebDesign/angular-gridster": "github:ManifestWebDesign/angular-gridster@0.13.5",
    "URIjs": "npm:URIjs@1.15.1",
    "_F": "github:Hypercubed/_F@0.0.11",
    "angular": "npm:angular@1.5.3",
    "angular-animate": "npm:angular-animate@1.5.3",
    "angular-annotation-decorator": "github:bendrucker/angular-annotation-decorator@1.0.0",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@0.13.4",
    "angular-cookies": "npm:angular-cookies@1.5.3",
    "angular-downloadsvg-directive": "npm:angular-downloadsvg-directive@0.1.5",
    "angular-gridster": "github:ManifestWebDesign/angular-gridster@0.13.5",
    "angular-growl": "npm:angular-growl-v2@0.7.5",
    "angular-intro.js": "npm:angular-intro.js@1.3.0",
    "angular-loading-bar": "npm:angular-loading-bar@0.8.0",
    "angular-marked": "npm:angular-marked@1.0.0",
    "angular-mocks": "github:angular/bower-angular-mocks@1.4.1",
    "angular-route": "npm:angular-route@1.5.3",
    "angular-sanitize": "npm:angular-sanitize@1.5.3",
    "angular-slider": "github:angular-slider/angularjs-slider@2.11.0",
    "angular-ui/bootstrap-bower": "github:angular-ui/bootstrap-bower@0.13.4",
    "assert": "npm:assert@1.3.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "babyparse": "npm:babyparse@0.4.3",
    "blobjs": "github:eligrey/Blob.js@master",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "chiasm": "npm:chiasm@0.2.0",
    "chiasm-component": "npm:chiasm-component@0.2.1",
    "chiasm-layout": "npm:chiasm-layout@0.2.2",
    "chiasm-links": "npm:chiasm-links@0.2.1",
    "clean-css": "npm:clean-css@3.4.8",
    "clipboard": "npm:clipboard@1.5.9",
    "codemirror": "github:codemirror/codemirror@5.3.0",
    "core-decorators": "npm:core-decorators@0.9.2",
    "core-js": "npm:core-js@1.2.6",
    "crlf-helper": "npm:crlf-helper@0.1.0",
    "crossfilter": "github:square/crossfilter@1.3.12",
    "css": "github:systemjs/plugin-css@0.1.16",
    "d3": "npm:d3@3.5.13",
    "d3-plugins": "github:d3/d3-plugins@master",
    "d3-svg-legend": "npm:d3-svg-legend@1.5.0",
    "d3-tip": "github:Caged/d3-tip@0.6.7",
    "d3plus-text": "npm:d3plus-text@0.3.0",
    "expression-bar": "npm:expression-bar@0.1.4",
    "fs": "github:jspm/nodelibs-fs@0.1.2",
    "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
    "inlet": "github:enjalot/Inlet@0.1.1",
    "intro": "npm:intro.js@2.0.0",
    "intro.js": "npm:intro.js@2.0.0",
    "jquery": "npm:jquery@2.1.4",
    "json": "github:systemjs/plugin-json@0.1.0",
    "lasso": "github:skokenes/D3-Lasso-Plugin@master",
    "lodash": "npm:lodash@3.10.1",
    "md": "github:guybedford/system-md@0.1.0",
    "mime-lookup": "npm:mime-lookup@0.0.2",
    "model": "npm:model-js@0.2.4",
    "model-js": "npm:model-js@0.2.4",
    "polymer": "github:Polymer/polymer@1.0.8",
    "process": "github:jspm/nodelibs-process@0.1.2",
    "screenfull": "npm:screenfull@2.0.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "ui-codemirror": "github:angular-ui/ui-codemirror@0.3.0",
    "ui-grid": "github:angular-ui/bower-ui-grid@3.0.5",
    "ui-select": "npm:ui-select@0.16.1",
    "venn": "npm:venn.js@0.2.4",
    "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22",
    "webtreemap": "github:martine/webtreemap@gh-pages",
    "github:Hypercubed/systemjs-plugin-html@0.0.8": {
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22"
    },
    "github:angular/bower-angular-mocks@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:guybedford/system-md@0.1.0": {
      "showdown": "github:showdownjs/showdown@1.3.0"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.5": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:URIjs@1.15.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angular-animate@1.5.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angular-downloadsvg-directive@0.1.5": {
      "svgsaver": "npm:svgsaver@0.6.1"
    },
    "npm:angular-intro.js@1.3.0": {
      "intro.js": "npm:intro.js@2.0.0"
    },
    "npm:angular-marked@1.0.0": {
      "marked": "npm:marked@0.3.5"
    },
    "npm:angular-sanitize@1.5.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babyparse@0.4.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:biojs-events@0.0.4": {
      "backbone-events-standalone": "npm:backbone-events-standalone@0.2.7"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:chai@3.2.0": {
      "assertion-error": "npm:assertion-error@1.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "deep-eql": "npm:deep-eql@0.1.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "type-detect": "npm:type-detect@1.0.0"
    },
    "npm:chiasm-component@0.2.1": {
      "model-js": "npm:model-js@0.2.4"
    },
    "npm:chiasm-layout@0.2.2": {
      "chiasm-component": "npm:chiasm-component@0.2.1",
      "model-js": "npm:model-js@0.2.4"
    },
    "npm:chiasm@0.2.0": {
      "chai": "npm:chai@3.2.0",
      "lodash": "npm:lodash@3.10.1",
      "model-js": "npm:model-js@0.2.4",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:clean-css@3.4.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.8.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.4.4",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:clipboard@1.5.9": {
      "good-listener": "npm:good-listener@1.1.7",
      "select": "npm:select@1.0.6",
      "tiny-emitter": "npm:tiny-emitter@1.0.2"
    },
    "npm:closest@0.0.1": {
      "matches-selector": "npm:matches-selector@0.0.1"
    },
    "npm:commander@2.8.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:d3-svg-legend@1.5.0": {
      "d3": "npm:d3@3.5.13"
    },
    "npm:d3plus-text@0.3.0": {
      "d3": "npm:d3@3.5.13"
    },
    "npm:deep-eql@0.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "type-detect": "npm:type-detect@0.1.1"
    },
    "npm:delegate@3.0.1": {
      "closest": "npm:closest@0.0.1"
    },
    "npm:expression-bar@0.1.4": {
      "biojs-events": "npm:biojs-events@0.0.4",
      "d3": "npm:d3@3.5.13",
      "jquery": "npm:jquery@2.1.4",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:good-listener@1.1.7": {
      "delegate": "npm:delegate@3.0.1"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:intro.js@2.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:jquery@2.1.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:mime-lookup@0.0.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:model-js@0.2.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.0.34": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:source-map@0.4.4": {
      "amdefine": "npm:amdefine@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.0.34"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:svgsaver@0.6.1": {
      "computed-styles": "npm:computed-styles@1.1.2"
    },
    "npm:ui-select@0.16.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
