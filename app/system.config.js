System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
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
    "URIjs": "npm:URIjs@1.15.1",
    "_F": "github:Hypercubed/_F@0.0.11",
    "angular": "github:angular/bower-angular@1.5.5",
    "angular-animate": "github:angular/bower-angular-animate@1.5.5",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@0.13.4",
    "angular-cookies": "github:angular/bower-angular-cookies@1.5.5",
    "angular-downloadsvg-directive": "npm:angular-downloadsvg-directive@0.1.5",
    "angular-growl": "npm:angular-growl-v2@0.7.5",
    "angular-intro.js": "npm:angular-intro.js@1.3.0",
    "angular-loading-bar": "npm:angular-loading-bar@0.8.0",
    "angular-marked": "npm:angular-marked@1.0.0",
    "angular-route": "github:angular/bower-angular-route@1.5.5",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.5.5",
    "angular-slider": "github:angular-slider/angularjs-slider@2.11.0",
    "angular-ui/bootstrap-bower": "github:angular-ui/bootstrap-bower@0.13.4",
    "assert": "npm:assert@1.3.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "babyparse": "npm:babyparse@0.4.3",
    "biojs-io-fasta": "npm:biojs-io-fasta@0.1.15",
    "biojs-vis-example": "npm:biojs-vis-example@0.1.4",
    "blobjs": "github:eligrey/Blob.js@master",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "chiasm": "npm:chiasm@0.3.0",
    "chiasm-charts": "npm:chiasm-charts@0.1.5",
    "chiasm-component": "npm:chiasm-component@0.2.3",
    "chiasm-layout": "npm:chiasm-layout@0.2.4",
    "chiasm-links": "npm:chiasm-links@0.2.3",
    "clipboard": "npm:clipboard@1.5.9",
    "codemirror": "github:codemirror/codemirror@5.3.0",
    "core-decorators": "npm:core-decorators@0.9.2",
    "core-js": "npm:core-js@1.2.6",
    "crlf-helper": "npm:crlf-helper@0.1.0",
    "crossfilter": "github:square/crossfilter@1.3.12",
    "css": "github:systemjs/plugin-css@0.1.21",
    "d3": "npm:d3@3.5.16",
    "d3-plugins": "github:d3/d3-plugins@master",
    "d3-svg-legend": "npm:d3-svg-legend@1.5.0",
    "d3-tip": "github:Caged/d3-tip@0.6.7",
    "d3plus-text": "npm:d3plus-text@0.3.0",
    "fs": "github:jspm/nodelibs-fs@0.1.2",
    "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
    "inlet": "github:enjalot/Inlet@0.1.1",
    "intro": "npm:intro.js@2.0.0",
    "intro.js": "npm:intro.js@2.0.0",
    "jquery": "npm:jquery@2.2.3",
    "json": "github:systemjs/plugin-json@0.1.2",
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
    "github:angular/bower-angular-animate@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-cookies@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-route@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-sanitize@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:guybedford/system-md@0.1.0": {
      "showdown": "github:showdownjs/showdown@1.3.0"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
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
    "npm:angular-downloadsvg-directive@0.1.5": {
      "svgsaver": "npm:svgsaver@0.6.1"
    },
    "npm:angular-intro.js@1.3.0": {
      "intro.js": "npm:intro.js@2.0.0"
    },
    "npm:angular-marked@1.0.0": {
      "marked": "npm:marked@0.3.5"
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
    "npm:biojs-io-fasta@0.1.15": {
      "biojs-io-parser": "npm:biojs-io-parser@1.0.0",
      "msa-seqtools": "npm:msa-seqtools@0.1.8",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:biojs-io-parser@1.0.0": {
      "vow": "npm:vow@0.4.12",
      "xhr": "npm:xhr@2.2.0"
    },
    "npm:biojs-vis-example@0.1.4": {
      "d3": "npm:d3@3.5.16"
    },
    "npm:chiasm-charts@0.1.5": {
      "chiasm-component": "npm:chiasm-component@0.2.3",
      "chiasm-dataset": "npm:chiasm-dataset@0.1.1",
      "d3": "npm:d3@3.5.16",
      "model-js": "npm:model-js@0.2.4"
    },
    "npm:chiasm-component@0.2.3": {
      "model-js": "npm:model-js@0.2.4"
    },
    "npm:chiasm-layout@0.2.4": {
      "chiasm-component": "npm:chiasm-component@0.2.3",
      "d3": "npm:d3@3.5.16",
      "lodash": "npm:lodash@3.10.1",
      "model-js": "npm:model-js@0.2.4"
    },
    "npm:chiasm@0.3.0": {
      "es6-promise": "npm:es6-promise@3.1.2",
      "lodash": "npm:lodash@3.10.1",
      "model-js": "npm:model-js@0.2.4",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:clipboard@1.5.9": {
      "good-listener": "npm:good-listener@1.1.7",
      "select": "npm:select@1.0.6",
      "tiny-emitter": "npm:tiny-emitter@1.0.2"
    },
    "npm:closest@0.0.1": {
      "matches-selector": "npm:matches-selector@0.0.1"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:d3-svg-legend@1.5.0": {
      "d3": "npm:d3@3.5.16"
    },
    "npm:d3plus-text@0.3.0": {
      "d3": "npm:d3@3.5.16"
    },
    "npm:delegate@3.0.1": {
      "closest": "npm:closest@0.0.1"
    },
    "npm:es6-promise@3.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:for-each@0.3.2": {
      "is-function": "npm:is-function@1.0.1"
    },
    "npm:global@4.3.0": {
      "process": "npm:process@0.11.2"
    },
    "npm:good-listener@1.1.7": {
      "delegate": "npm:delegate@3.0.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:intro.js@2.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:is-function@1.0.1": {
      "events": "github:jspm/nodelibs-events@0.1.1",
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
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:parse-headers@2.0.1": {
      "for-each": "npm:for-each@0.3.2",
      "trim": "npm:trim@0.0.1"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:svgsaver@0.6.1": {
      "computed-styles": "npm:computed-styles@1.1.2"
    },
    "npm:ui-select@0.16.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vow@0.4.12": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:xhr@2.2.0": {
      "global": "npm:global@4.3.0",
      "is-function": "npm:is-function@1.0.1",
      "once": "npm:once@1.1.1",
      "parse-headers": "npm:parse-headers@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "xtend": "npm:xtend@4.0.1"
    }
  }
});
