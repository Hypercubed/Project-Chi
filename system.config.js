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
  production: true,
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
    "URIjs": "npm:URIjs@1.16.1",
    "_F": "github:Hypercubed/_F@0.0.11",
    "angular": "npm:angular@1.5.7",
    "angular-animate": "npm:angular-animate@1.5.7",
    "angular-cookies": "npm:angular-cookies@1.5.7",
    "angular-downloadsvg-directive": "npm:angular-downloadsvg-directive@0.1.5",
    "angular-growl": "npm:angular-growl-v2@0.7.5",
    "angular-intro.js": "npm:angular-intro.js@2.0.1",
    "angular-json-tree": "npm:angular-json-tree@1.0.1",
    "angular-loading-bar": "npm:angular-loading-bar@0.9.0",
    "angular-marked": "npm:angular-marked@1.2.1",
    "angular-route": "npm:angular-route@1.5.7",
    "angular-sanitize": "npm:angular-sanitize@1.5.7",
    "angular-touch": "npm:angular-touch@1.5.7",
    "angular-ui-bootstrap": "npm:angular-ui-bootstrap@1.3.3",
    "angular-ui-grid": "npm:angular-ui-grid@3.2.5",
    "angularjs-slider": "npm:angularjs-slider@2.13.0",
    "animate": "npm:animate.css@3.5.1",
    "assert": "npm:assert@1.4.1",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "babyparse": "npm:babyparse@0.4.6",
    "biojs-io-fasta": "npm:biojs-io-fasta@0.1.17",
    "biojs-vis-example": "npm:biojs-vis-example@0.1.4",
    "blobjs": "github:eligrey/Blob.js@master",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "chiasm": "npm:chiasm@0.3.0",
    "chiasm-charts": "npm:chiasm-charts@0.1.5",
    "chiasm-component": "npm:chiasm-component@0.2.3",
    "chiasm-layout": "npm:chiasm-layout@0.2.4",
    "chiasm-links": "npm:chiasm-links@0.2.3",
    "clipboard": "npm:clipboard@1.5.10",
    "codemirror": "github:codemirror/codemirror@5.14.2",
    "core-decorators": "npm:core-decorators@0.9.2",
    "core-js": "npm:core-js@1.2.6",
    "crlf-helper": "npm:crlf-helper@0.1.0",
    "crossfilter": "npm:crossfilter2@1.4.0-alpha.6",
    "css": "github:systemjs/plugin-css@0.1.21",
    "cuid": "npm:cuid@1.3.8",
    "d3": "npm:d3@3.5.17",
    "d3-plugins": "github:d3/d3-plugins@master",
    "d3-svg-legend": "npm:d3-svg-legend@1.10.0",
    "d3-tip": "github:Caged/d3-tip@0.6.7",
    "d3plus-text": "npm:d3plus-text@0.4.4",
    "font-awesome": "npm:font-awesome@4.6.1",
    "fs": "github:jspm/nodelibs-fs@0.1.2",
    "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
    "inlet": "github:enjalot/Inlet@0.1.1",
    "intro.js": "npm:intro.js@2.1.0",
    "jquery": "npm:jquery@2.2.4",
    "json": "github:systemjs/plugin-json@0.1.2",
    "jspm/nodelibs-assert": "github:jspm/nodelibs-assert@0.1.0",
    "lodash": "npm:lodash@3.10.1",
    "md": "github:guybedford/system-md@0.1.0",
    "mime-lookup": "npm:mime-lookup@0.0.2",
    "ml-matrix": "npm:ml-matrix@1.1.5",
    "ml-pca": "npm:ml-pca@1.1.1",
    "model-js": "npm:model-js@0.2.5",
    "mongodb-extended-json": "npm:mongodb-extended-json@1.6.3",
    "pivottable": "npm:pivottable@2.0.2",
    "polymer": "github:Polymer/polymer@1.4.0",
    "process": "npm:process@0.11.5",
    "q": "npm:q@1.4.1",
    "screenfull": "npm:screenfull@2.0.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "ui-codemirror": "github:angular-ui/ui-codemirror@0.3.0",
    "ui-select": "npm:ui-select@0.16.1",
    "universe": "npm:universe@0.7.0",
    "venn.js": "npm:venn.js@0.2.10",
    "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22",
    "webtreemap": "github:martine/webtreemap@gh-pages",
    "yaml": "npm:yaml@0.3.0",
    "github:Hypercubed/systemjs-plugin-html@0.0.8": {
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22"
    },
    "github:guybedford/system-md@0.1.0": {
      "showdown": "github:showdownjs/showdown@1.3.0"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
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
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.5"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:JSONStream@1.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "jsonparse": "npm:jsonparse@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "through": "npm:through@2.3.8"
    },
    "npm:URIjs@1.16.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angular-downloadsvg-directive@0.1.5": {
      "svgsaver": "npm:svgsaver@0.6.1"
    },
    "npm:angular-json-tree@1.0.1": {
      "angular": "npm:angular@1.5.7"
    },
    "npm:angular-marked@1.2.1": {
      "marked": "npm:marked@0.3.5"
    },
    "npm:angular-ui-grid@3.2.5": {
      "angular": "npm:angular@1.5.7",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angularjs-slider@2.13.0": {
      "angular": "npm:angular@1.5.7"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:async@1.5.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:babyparse@0.4.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:biojs-io-fasta@0.1.17": {
      "biojs-io-parser": "npm:biojs-io-parser@1.0.0",
      "msa-seqtools": "npm:msa-seqtools@0.1.8",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:biojs-io-parser@1.0.0": {
      "vow": "npm:vow@0.4.12",
      "xhr": "npm:xhr@2.2.0"
    },
    "npm:biojs-vis-example@0.1.4": {
      "d3": "npm:d3@3.5.17"
    },
    "npm:bson@0.4.23": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:chiasm-charts@0.1.5": {
      "chiasm-component": "npm:chiasm-component@0.2.3",
      "chiasm-dataset": "npm:chiasm-dataset@0.1.1",
      "d3": "npm:d3@3.5.17",
      "model-js": "npm:model-js@0.2.5"
    },
    "npm:chiasm-component@0.2.3": {
      "model-js": "npm:model-js@0.2.5"
    },
    "npm:chiasm-layout@0.2.4": {
      "chiasm-component": "npm:chiasm-component@0.2.3",
      "d3": "npm:d3@3.5.17",
      "lodash": "npm:lodash@3.10.1",
      "model-js": "npm:model-js@0.2.5"
    },
    "npm:chiasm@0.3.0": {
      "es6-promise": "npm:es6-promise@3.1.2",
      "lodash": "npm:lodash@3.10.1",
      "model-js": "npm:model-js@0.2.5",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:clipboard@1.5.10": {
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
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:crossfilter2@1.4.0-alpha.6": {
      "lodash.result": "npm:lodash.result@4.4.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:cuid@1.3.8": {
      "browser-fingerprint": "npm:browser-fingerprint@0.0.1",
      "core-js": "npm:core-js@1.2.6",
      "node-fingerprint": "npm:node-fingerprint@0.0.2",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:d3-interpolate@0.7.0": {
      "d3-color": "npm:d3-color@0.4.2"
    },
    "npm:d3-svg-legend@1.10.0": {
      "d3": "npm:d3@3.5.17"
    },
    "npm:d3-transition@0.2.8": {
      "d3-color": "npm:d3-color@0.4.2",
      "d3-dispatch": "npm:d3-dispatch@0.4.3",
      "d3-ease": "npm:d3-ease@0.7.0",
      "d3-interpolate": "npm:d3-interpolate@0.7.0",
      "d3-selection": "npm:d3-selection@0.7.1",
      "d3-timer": "npm:d3-timer@0.4.3"
    },
    "npm:d3plus-text@0.4.4": {
      "d3-array": "npm:d3-array@0.7.1",
      "d3-selection": "npm:d3-selection@0.7.1",
      "d3-transition": "npm:d3-transition@0.2.8"
    },
    "npm:delegate@3.0.1": {
      "closest": "npm:closest@0.0.1"
    },
    "npm:duplexer@0.1.1": {
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:es6-promise@3.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:event-stream@3.3.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "duplexer": "npm:duplexer@0.1.1",
      "from": "npm:from@0.1.3",
      "map-stream": "npm:map-stream@0.1.0",
      "pause-stream": "npm:pause-stream@0.0.11",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "split": "npm:split@0.3.3",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "stream-combiner": "npm:stream-combiner@0.0.4",
      "through": "npm:through@2.3.8",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:font-awesome@4.6.1": {
      "css": "github:systemjs/plugin-css@0.1.21"
    },
    "npm:for-each@0.3.2": {
      "is-function": "npm:is-function@1.0.1"
    },
    "npm:from@0.1.3": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:global@4.3.0": {
      "process": "npm:process@0.11.5"
    },
    "npm:good-listener@1.1.7": {
      "delegate": "npm:delegate@3.0.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:intro.js@2.1.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:is-function@1.0.1": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:isarray@1.0.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:jsonparse@1.2.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:lodash._basecallback@3.3.1": {
      "lodash._baseisequal": "npm:lodash._baseisequal@3.0.7",
      "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.pairs": "npm:lodash.pairs@3.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash._baseisequal@3.0.7": {
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.istypedarray": "npm:lodash.istypedarray@3.0.6",
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:lodash._basetostring@4.12.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash._stringtopath@4.8.0": {
      "lodash._basetostring": "npm:lodash._basetostring@4.12.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.keys@3.1.2": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1",
      "lodash.isarguments": "npm:lodash.isarguments@3.0.8",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash.pairs@3.0.1": {
      "lodash.keys": "npm:lodash.keys@3.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.result@4.4.0": {
      "lodash._stringtopath": "npm:lodash._stringtopath@4.8.0"
    },
    "npm:lodash.transform@3.0.4": {
      "lodash._arrayeach": "npm:lodash._arrayeach@3.0.0",
      "lodash._basecallback": "npm:lodash._basecallback@3.3.1",
      "lodash._basecreate": "npm:lodash._basecreate@3.0.3",
      "lodash._basefor": "npm:lodash._basefor@3.0.3",
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.isfunction": "npm:lodash.isfunction@3.0.8",
      "lodash.istypedarray": "npm:lodash.istypedarray@3.0.6",
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:map-stream@0.1.0": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:mime-lookup@0.0.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ml-pca@1.1.1": {
      "ml-matrix": "npm:ml-matrix@1.1.5",
      "ml-stat": "npm:ml-stat@1.2.0"
    },
    "npm:mongodb-extended-json@1.6.3": {
      "JSONStream": "npm:JSONStream@1.1.2",
      "async": "npm:async@1.5.2",
      "bson": "npm:bson@0.4.23",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "event-stream": "npm:event-stream@3.3.3",
      "lodash.isfunction": "npm:lodash.isfunction@3.0.8",
      "lodash.transform": "npm:lodash.transform@3.0.4",
      "moment": "npm:moment@2.13.0",
      "raf": "npm:raf@3.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:node-fingerprint@0.0.2": {
      "os": "github:jspm/nodelibs-os@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:parse-headers@2.0.1": {
      "for-each": "npm:for-each@0.3.2",
      "trim": "npm:trim@0.0.1"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pause-stream@0.0.11": {
      "through": "npm:through@2.3.8"
    },
    "npm:performance-now@0.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:pivottable@2.0.2": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "jquery": "npm:jquery@2.2.4",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.5": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:q@1.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:raf@3.2.0": {
      "performance-now": "npm:performance-now@0.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:reductio@0.6.2": {
      "crossfilter2": "npm:crossfilter2@1.4.0-alpha.6",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:split@0.3.3": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "through": "npm:through@2.3.8",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:stream-combiner@0.0.4": {
      "duplexer": "npm:duplexer@0.1.1"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:svgsaver@0.6.1": {
      "computed-styles": "npm:computed-styles@1.1.2"
    },
    "npm:through@2.3.8": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:ui-select@0.16.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:universe@0.7.0": {
      "crossfilter2": "npm:crossfilter2@1.4.0-alpha.6",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "q": "npm:q@1.4.1",
      "reductio": "npm:reductio@0.6.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
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
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
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
    },
    "npm:yaml@0.3.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
