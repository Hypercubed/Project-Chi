SystemJS.config({
  nodeConfig: {
    "paths": {
      "github:": "jspm_packages/github/",
      "npm:": "jspm_packages/npm/",
      "project-chi/": "src/"
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ],
    "es2015": true,
    "stage3": true
  },
  buildCSS: true,
  separateCSS: true,
  buildHTML: true,
  packages: {
    "project-chi": {
      "main": "project-chi.js",
      "format": "esm"
    },
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
    "babel": "npm:babel-core@5.8.38"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
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
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "babyparse": "npm:babyparse@0.4.6",
    "biojs-io-fasta": "npm:biojs-io-fasta@0.1.17",
    "biojs-vis-example": "npm:biojs-vis-example@0.1.4",
    "blobjs": "github:eligrey/Blob.js@master",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "chi-datapackage": "npm:chi-datapackage@2.0.0",
    "chiasm": "npm:chiasm@0.3.0",
    "chiasm-charts": "npm:chiasm-charts@0.1.5",
    "chiasm-component": "npm:chiasm-component@0.2.3",
    "chiasm-data-reduction": "npm:chiasm-data-reduction@0.3.0",
    "chiasm-layout": "github:chiasm-project/chiasm-layout@0.3.0",
    "chiasm-links": "npm:chiasm-links@0.2.3",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "clipboard": "npm:clipboard@1.5.10",
    "codemirror": "github:codemirror/codemirror@5.14.2",
    "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
    "core-decorators": "npm:core-decorators@0.9.2",
    "core-js": "npm:core-js@2.4.1",
    "crlf-helper": "npm:crlf-helper@0.1.0",
    "crossfilter": "npm:crossfilter2@1.4.0-alpha.6",
    "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
    "css": "github:systemjs/plugin-css@0.1.23",
    "cuid": "npm:cuid@1.3.8",
    "d3": "npm:d3@3.5.17",
    "d3-plugins": "github:d3/d3-plugins@master",
    "d3-svg-legend": "npm:d3-svg-legend@1.10.0",
    "d3-tip": "github:Caged/d3-tip@0.6.7",
    "d3plus-text": "npm:d3plus-text@0.4.4",
    "dgram": "github:jspm/nodelibs-dgram@0.2.0-alpha",
    "dns": "github:jspm/nodelibs-dns@0.2.0-alpha",
    "ecc-jsbn": "npm:ecc-jsbn@0.1.1",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "font-awesome": "npm:font-awesome@4.6.1",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "github:jspm/nodelibs-https@0.2.0-alpha",
    "inlet": "github:enjalot/Inlet@0.1.1",
    "intro.js": "npm:intro.js@2.1.0",
    "jodid25519": "npm:jodid25519@1.0.2",
    "jquery": "npm:jquery@3.1.0",
    "js-yaml": "npm:js-yaml@3.6.1",
    "jsbn": "npm:jsbn@0.1.0",
    "json": "github:systemjs/plugin-json@0.1.2",
    "json5": "npm:json5@0.5.0",
    "jsontableschema": "github:frictionlessdata/jsontableschema-js@master",
    "jspm/nodelibs-assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "lodash": "npm:lodash@4.13.1",
    "md": "github:guybedford/system-md@0.1.0",
    "mime-lookup": "npm:mime-lookup@0.0.2",
    "ml-matrix": "npm:ml-matrix@1.1.5",
    "ml-pca": "npm:ml-pca@1.1.1",
    "model-js": "npm:model-js@0.2.5",
    "mongodb-extended-json": "npm:mongodb-extended-json@1.6.3",
    "net": "github:jspm/nodelibs-net@0.2.0-alpha",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "pivottable": "npm:pivottable@2.0.2",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.12",
    "polymer": "github:Polymer/polymer@1.4.0",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "punycode": "github:jspm/nodelibs-punycode@0.2.0-alpha",
    "q": "npm:q@1.4.1",
    "querystring": "github:jspm/nodelibs-querystring@0.2.0-alpha",
    "screenfull": "npm:screenfull@2.0.0",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "text": "github:systemjs/plugin-text@0.0.8",
    "tls": "github:jspm/nodelibs-tls@0.2.0-alpha",
    "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
    "tweetnacl": "npm:tweetnacl@0.13.3",
    "ui-codemirror": "github:angular-ui/ui-codemirror@0.3.0",
    "ui-select": "npm:ui-select@0.16.1",
    "universe": "npm:universe@0.8.0",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "venn.js": "npm:venn.js@0.2.10",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha",
    "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22",
    "webtreemap": "github:martine/webtreemap@gh-pages",
    "zlib": "github:jspm/nodelibs-zlib@0.2.0-alpha"
  },
  packages: {
    "github:Hypercubed/systemjs-plugin-html@0.0.8": {
      "map": {
        "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22"
      }
    },
    "github:guybedford/system-md@0.1.0": {
      "map": {
        "showdown": "github:showdownjs/showdown@1.3.0"
      }
    },
    "github:twbs/bootstrap@3.3.6": {
      "map": {
        "jquery": "npm:jquery@3.1.0"
      }
    },
    "npm:JSONStream@1.1.2": {
      "map": {
        "jsonparse": "npm:jsonparse@1.2.0",
        "through": "npm:through@2.3.8"
      }
    },
    "npm:URIjs@1.16.1": {
      "map": {}
    },
    "npm:angular-downloadsvg-directive@0.1.5": {
      "map": {
        "svgsaver": "npm:svgsaver@0.6.1"
      }
    },
    "npm:angular-json-tree@1.0.1": {
      "map": {
        "angular": "npm:angular@1.5.7"
      }
    },
    "npm:angular-marked@1.2.1": {
      "map": {
        "marked": "npm:marked@0.3.5"
      }
    },
    "npm:angular-ui-grid@3.2.5": {
      "map": {
        "angular": "npm:angular@1.5.7"
      }
    },
    "npm:angularjs-slider@2.13.0": {
      "map": {
        "angular": "npm:angular@1.5.7"
      }
    },
    "npm:async@1.5.2": {
      "map": {}
    },
    "npm:babyparse@0.4.6": {
      "map": {}
    },
    "npm:biojs-io-fasta@0.1.17": {
      "map": {
        "biojs-io-parser": "npm:biojs-io-parser@1.0.0",
        "msa-seqtools": "npm:msa-seqtools@0.1.8"
      }
    },
    "npm:biojs-io-parser@1.0.0": {
      "map": {
        "vow": "npm:vow@0.4.12",
        "xhr": "npm:xhr@2.2.0",
        "request": "npm:request@2.73.0",
        "node-request": "npm:request@2.73.0"
      }
    },
    "npm:biojs-vis-example@0.1.4": {
      "map": {
        "d3": "npm:d3@3.5.17"
      }
    },
    "npm:bson@0.4.23": {
      "map": {}
    },
    "npm:chiasm-charts@0.1.5": {
      "map": {
        "chiasm-component": "npm:chiasm-component@0.2.3",
        "chiasm-dataset": "npm:chiasm-dataset@0.1.1",
        "d3": "npm:d3@3.5.17",
        "model-js": "npm:model-js@0.2.5"
      }
    },
    "npm:chiasm-component@0.2.3": {
      "map": {
        "model-js": "npm:model-js@0.2.5"
      }
    },
    "npm:chiasm-data-reduction@0.3.0": {
      "map": {
        "chiasm-component": "npm:chiasm-component@0.2.3",
        "data-reduction": "npm:data-reduction@0.3.0",
        "model-js": "npm:model-js@0.2.5"
      }
    },
    "npm:chiasm@0.3.0": {
      "map": {
        "es6-promise": "npm:es6-promise@3.2.1",
        "lodash": "npm:lodash@4.13.1",
        "model-js": "npm:model-js@0.2.5"
      }
    },
    "npm:clipboard@1.5.10": {
      "map": {
        "good-listener": "npm:good-listener@1.1.7",
        "select": "npm:select@1.0.6",
        "tiny-emitter": "npm:tiny-emitter@1.0.2"
      }
    },
    "npm:closest@0.0.1": {
      "map": {
        "matches-selector": "npm:matches-selector@0.0.1"
      }
    },
    "npm:core-js@1.2.6": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:core-util-is@1.0.2": {
      "map": {}
    },
    "npm:crossfilter2@1.4.0-alpha.6": {
      "map": {
        "lodash.result": "npm:lodash.result@4.4.0",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:cuid@1.3.8": {
      "map": {
        "browser-fingerprint": "npm:browser-fingerprint@0.0.1",
        "core-js": "npm:core-js@1.2.6",
        "node-fingerprint": "npm:node-fingerprint@0.0.2"
      }
    },
    "npm:d3-interpolate@0.1.4": {
      "map": {
        "d3-color": "npm:d3-color@0.2.8"
      }
    },
    "npm:d3-interpolate@0.7.0": {
      "map": {
        "d3-color": "npm:d3-color@0.4.2"
      }
    },
    "npm:d3-scale@0.1.5": {
      "map": {
        "d3-arrays": "npm:d3-arrays@0.3.1",
        "d3-color": "npm:d3-color@0.2.8",
        "d3-format": "npm:d3-format@0.3.6",
        "d3-interpolate": "npm:d3-interpolate@0.1.4",
        "d3-time": "npm:d3-time@0.0.7",
        "d3-time-format": "npm:d3-time-format@0.1.5"
      }
    },
    "npm:d3-svg-legend@1.10.0": {
      "map": {
        "d3": "npm:d3@3.5.17"
      }
    },
    "npm:d3-time-format@0.1.5": {
      "map": {
        "d3-time": "npm:d3-time@0.0.7"
      }
    },
    "npm:d3-transition@0.2.8": {
      "map": {
        "d3-color": "npm:d3-color@0.4.2",
        "d3-dispatch": "npm:d3-dispatch@0.4.3",
        "d3-ease": "npm:d3-ease@0.7.0",
        "d3-interpolate": "npm:d3-interpolate@0.7.0",
        "d3-selection": "npm:d3-selection@0.7.1",
        "d3-timer": "npm:d3-timer@0.4.3"
      }
    },
    "npm:d3plus-text@0.4.4": {
      "map": {
        "d3-array": "npm:d3-array@0.7.1",
        "d3-selection": "npm:d3-selection@0.7.1",
        "d3-transition": "npm:d3-transition@0.2.8"
      }
    },
    "npm:data-reduction@0.3.0": {
      "map": {
        "d3-arrays": "npm:d3-arrays@0.4.1",
        "d3-scale": "npm:d3-scale@0.1.5",
        "d3-time": "npm:d3-time@0.0.7"
      }
    },
    "npm:delegate@3.0.1": {
      "map": {
        "closest": "npm:closest@0.0.1"
      }
    },
    "npm:duplexer@0.1.1": {
      "map": {}
    },
    "npm:es6-promise@3.2.1": {
      "map": {}
    },
    "npm:event-stream@3.3.3": {
      "map": {
        "duplexer": "npm:duplexer@0.1.1",
        "from": "npm:from@0.1.3",
        "map-stream": "npm:map-stream@0.1.0",
        "pause-stream": "npm:pause-stream@0.0.11",
        "split": "npm:split@0.3.3",
        "stream-combiner": "npm:stream-combiner@0.0.4",
        "through": "npm:through@2.3.8"
      }
    },
    "npm:font-awesome@4.6.1": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.23"
      }
    },
    "npm:for-each@0.3.2": {
      "map": {
        "is-function": "npm:is-function@1.0.1"
      }
    },
    "npm:from@0.1.3": {
      "map": {}
    },
    "npm:global@4.3.0": {
      "map": {
        "process": "npm:process@0.11.5",
        "min-document": "npm:min-document@2.18.0",
        "node-min-document": "npm:min-document@2.18.0"
      }
    },
    "npm:good-listener@1.1.7": {
      "map": {
        "delegate": "npm:delegate@3.0.1"
      }
    },
    "npm:inherits@2.0.1": {
      "map": {}
    },
    "npm:intro.js@2.1.0": {
      "map": {}
    },
    "npm:is-function@1.0.1": {
      "map": {}
    },
    "npm:isarray@1.0.0": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:jquery@3.1.0": {
      "map": {}
    },
    "npm:jsonparse@1.2.0": {
      "map": {}
    },
    "npm:lodash._basecallback@3.3.1": {
      "map": {
        "lodash._baseisequal": "npm:lodash._baseisequal@3.0.7",
        "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash.pairs": "npm:lodash.pairs@3.0.1"
      }
    },
    "npm:lodash._baseisequal@3.0.7": {
      "map": {
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash.istypedarray": "npm:lodash.istypedarray@3.0.6",
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:lodash._basetostring@4.12.0": {
      "map": {}
    },
    "npm:lodash._stringtopath@4.8.0": {
      "map": {
        "lodash._basetostring": "npm:lodash._basetostring@4.12.0"
      }
    },
    "npm:lodash.keys@3.1.2": {
      "map": {
        "lodash._getnative": "npm:lodash._getnative@3.9.1",
        "lodash.isarguments": "npm:lodash.isarguments@3.0.8",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash.pairs@3.0.1": {
      "map": {
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:lodash.result@4.4.0": {
      "map": {
        "lodash._stringtopath": "npm:lodash._stringtopath@4.8.0"
      }
    },
    "npm:lodash.transform@3.0.4": {
      "map": {
        "lodash._arrayeach": "npm:lodash._arrayeach@3.0.0",
        "lodash._basecallback": "npm:lodash._basecallback@3.3.1",
        "lodash._basecreate": "npm:lodash._basecreate@3.0.3",
        "lodash._basefor": "npm:lodash._basefor@3.0.3",
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash.isfunction": "npm:lodash.isfunction@3.0.8",
        "lodash.istypedarray": "npm:lodash.istypedarray@3.0.6",
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:map-stream@0.1.0": {
      "map": {}
    },
    "npm:mime-lookup@0.0.2": {
      "map": {}
    },
    "npm:ml-pca@1.1.1": {
      "map": {
        "ml-matrix": "npm:ml-matrix@1.1.5",
        "ml-stat": "npm:ml-stat@1.2.0"
      }
    },
    "npm:mongodb-extended-json@1.6.3": {
      "map": {
        "JSONStream": "npm:JSONStream@1.1.2",
        "async": "npm:async@1.5.2",
        "bson": "npm:bson@0.4.23",
        "event-stream": "npm:event-stream@3.3.3",
        "lodash.isfunction": "npm:lodash.isfunction@3.0.8",
        "lodash.transform": "npm:lodash.transform@3.0.4",
        "moment": "npm:moment@2.13.0",
        "raf": "npm:raf@3.2.0"
      }
    },
    "npm:node-fingerprint@0.0.2": {
      "map": {}
    },
    "npm:parse-headers@2.0.1": {
      "map": {
        "for-each": "npm:for-each@0.3.2",
        "trim": "npm:trim@0.0.1"
      }
    },
    "npm:pause-stream@0.0.11": {
      "map": {
        "through": "npm:through@2.3.8"
      }
    },
    "npm:performance-now@0.2.0": {
      "map": {}
    },
    "npm:pivottable@2.0.2": {
      "map": {
        "jquery": "npm:jquery@3.1.0"
      }
    },
    "npm:process@0.11.5": {
      "map": {}
    },
    "npm:punycode@1.3.2": {
      "map": {}
    },
    "npm:q@1.4.1": {
      "map": {}
    },
    "npm:raf@3.2.0": {
      "map": {
        "performance-now": "npm:performance-now@0.2.0"
      }
    },
    "npm:reductio@0.6.2": {
      "map": {
        "crossfilter2": "npm:crossfilter2@1.4.0-alpha.6"
      }
    },
    "npm:split@0.3.3": {
      "map": {
        "through": "npm:through@2.3.8"
      }
    },
    "npm:stream-combiner@0.0.4": {
      "map": {
        "duplexer": "npm:duplexer@0.1.1"
      }
    },
    "npm:string_decoder@0.10.31": {
      "map": {}
    },
    "npm:svgsaver@0.6.1": {
      "map": {
        "computed-styles": "npm:computed-styles@1.1.2"
      }
    },
    "npm:through@2.3.8": {
      "map": {}
    },
    "npm:ui-select@0.16.1": {
      "map": {}
    },
    "npm:universe@0.8.0": {
      "map": {
        "crossfilter2": "npm:crossfilter2@1.4.0-alpha.6",
        "q": "npm:q@1.4.1",
        "reductio": "npm:reductio@0.6.2",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:vow@0.4.12": {
      "map": {}
    },
    "npm:xhr@2.2.0": {
      "map": {
        "global": "npm:global@4.3.0",
        "is-function": "npm:is-function@1.0.1",
        "once": "npm:once@1.1.1",
        "parse-headers": "npm:parse-headers@2.0.1",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:xtend@4.0.1": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.7.1"
      }
    },
    "npm:request@2.73.0": {
      "map": {
        "aws-sign2": "npm:aws-sign2@0.6.0",
        "bl": "npm:bl@1.1.2",
        "combined-stream": "npm:combined-stream@1.0.5",
        "form-data": "npm:form-data@1.0.0-rc4",
        "is-typedarray": "npm:is-typedarray@1.0.0",
        "isstream": "npm:isstream@0.1.2",
        "forever-agent": "npm:forever-agent@0.6.1",
        "caseless": "npm:caseless@0.11.0",
        "oauth-sign": "npm:oauth-sign@0.8.2",
        "json-stringify-safe": "npm:json-stringify-safe@5.0.1",
        "aws4": "npm:aws4@1.4.1",
        "stringstream": "npm:stringstream@0.0.5",
        "extend": "npm:extend@3.0.0",
        "har-validator": "npm:har-validator@2.0.6",
        "hawk": "npm:hawk@3.1.3",
        "node-uuid": "npm:node-uuid@1.4.7",
        "http-signature": "npm:http-signature@1.1.1",
        "tough-cookie": "npm:tough-cookie@2.2.2",
        "mime-types": "npm:mime-types@2.1.11",
        "tunnel-agent": "npm:tunnel-agent@0.4.3",
        "qs": "npm:qs@6.2.0"
      }
    },
    "npm:form-data@1.0.0-rc4": {
      "map": {
        "async": "npm:async@1.5.2",
        "combined-stream": "npm:combined-stream@1.0.5",
        "mime-types": "npm:mime-types@2.1.11"
      }
    },
    "npm:bl@1.1.2": {
      "map": {
        "readable-stream": "npm:readable-stream@2.0.6"
      }
    },
    "npm:combined-stream@1.0.5": {
      "map": {
        "delayed-stream": "npm:delayed-stream@1.0.0"
      }
    },
    "npm:hawk@3.1.3": {
      "map": {
        "hoek": "npm:hoek@2.16.3",
        "sntp": "npm:sntp@1.0.9",
        "boom": "npm:boom@2.10.1",
        "cryptiles": "npm:cryptiles@2.0.5"
      }
    },
    "npm:http-signature@1.1.1": {
      "map": {
        "assert-plus": "npm:assert-plus@0.2.0",
        "jsprim": "npm:jsprim@1.3.0",
        "sshpk": "npm:sshpk@1.8.3"
      }
    },
    "npm:har-validator@2.0.6": {
      "map": {
        "chalk": "npm:chalk@1.1.3",
        "commander": "npm:commander@2.9.0",
        "is-my-json-valid": "npm:is-my-json-valid@2.13.1",
        "pinkie-promise": "npm:pinkie-promise@2.0.1"
      }
    },
    "npm:mime-types@2.1.11": {
      "map": {
        "mime-db": "npm:mime-db@1.23.0"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:readable-stream@2.0.6": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:sshpk@1.8.3": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0",
        "getpass": "npm:getpass@0.1.6",
        "asn1": "npm:asn1@0.2.3",
        "dashdash": "npm:dashdash@1.14.0"
      }
    },
    "npm:sntp@1.0.9": {
      "map": {
        "hoek": "npm:hoek@2.16.3"
      }
    },
    "npm:boom@2.10.1": {
      "map": {
        "hoek": "npm:hoek@2.16.3"
      }
    },
    "npm:cryptiles@2.0.5": {
      "map": {
        "boom": "npm:boom@2.10.1"
      }
    },
    "npm:is-my-json-valid@2.13.1": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "generate-function": "npm:generate-function@2.0.0",
        "jsonpointer": "npm:jsonpointer@2.0.0",
        "generate-object-property": "npm:generate-object-property@1.2.0"
      }
    },
    "npm:jsprim@1.3.0": {
      "map": {
        "extsprintf": "npm:extsprintf@1.0.2",
        "verror": "npm:verror@1.3.6",
        "json-schema": "npm:json-schema@0.2.2"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "ansi-styles": "npm:ansi-styles@2.2.1",
        "has-ansi": "npm:has-ansi@2.0.0",
        "supports-color": "npm:supports-color@2.0.0",
        "strip-ansi": "npm:strip-ansi@3.0.1"
      }
    },
    "npm:commander@2.9.0": {
      "map": {
        "graceful-readlink": "npm:graceful-readlink@1.0.1"
      }
    },
    "npm:pinkie-promise@2.0.1": {
      "map": {
        "pinkie": "npm:pinkie@2.0.4"
      }
    },
    "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.1.4"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.3.0"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "github:jspm/nodelibs-crypto@0.2.0-alpha": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "github:jspm/nodelibs-zlib@0.2.0-alpha": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:getpass@0.1.6": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0"
      }
    },
    "npm:verror@1.3.6": {
      "map": {
        "extsprintf": "npm:extsprintf@1.0.2"
      }
    },
    "npm:jodid25519@1.0.2": {
      "map": {
        "jsbn": "npm:jsbn@0.1.0"
      }
    },
    "npm:ecc-jsbn@0.1.1": {
      "map": {
        "jsbn": "npm:jsbn@0.1.0"
      }
    },
    "npm:dashdash@1.14.0": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:generate-object-property@1.2.0": {
      "map": {
        "is-property": "npm:is-property@1.0.2"
      }
    },
    "npm:stream-http@2.3.0": {
      "map": {
        "readable-stream": "npm:readable-stream@2.1.4",
        "inherits": "npm:inherits@2.0.1",
        "xtend": "npm:xtend@4.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "create-hmac": "npm:create-hmac@1.1.4",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.1.4",
        "pako": "npm:pako@0.2.8"
      }
    },
    "npm:readable-stream@2.1.4": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "buffer-shims": "npm:buffer-shims@1.0.0"
      }
    },
    "github:jspm/nodelibs-punycode@0.2.0-alpha": {
      "map": {
        "punycode-browserify": "npm:punycode@1.3.2"
      }
    },
    "npm:min-document@2.18.0": {
      "map": {
        "dom-walk": "npm:dom-walk@0.1.1"
      }
    },
    "npm:pbkdf2@3.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4",
        "inherits": "npm:inherits@2.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "bn.js": "npm:bn.js@4.11.5",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "elliptic": "npm:elliptic@6.3.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "browserify-aes": "npm:browserify-aes@1.0.6"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "bn.js": "npm:bn.js@4.11.5",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "des.js": "npm:des.js@1.0.0",
        "cipher-base": "npm:cipher-base@1.0.2"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.1",
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.2"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.5",
        "cipher-base": "npm:cipher-base@1.0.2"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "elliptic": "npm:elliptic@6.3.1"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "randombytes": "npm:randombytes@2.0.3",
        "miller-rabin": "npm:miller-rabin@4.0.0"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "asn1.js": "npm:asn1.js@4.8.0"
      }
    },
    "npm:sha.js@2.4.5": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:elliptic@6.3.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "inherits": "npm:inherits@2.0.1",
        "brorand": "npm:brorand@1.0.5",
        "hash.js": "npm:hash.js@1.0.3"
      }
    },
    "npm:asn1.js@4.8.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.5",
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:cipher-base@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:js-yaml@3.6.1": {
      "map": {
        "argparse": "npm:argparse@1.0.7",
        "esprima": "npm:esprima@2.7.2"
      }
    },
    "npm:argparse@1.0.7": {
      "map": {
        "sprintf-js": "npm:sprintf-js@1.0.3"
      }
    },
    "github:chiasm-project/chiasm-layout@0.3.0": {
      "map": {
        "chiasm-component": "npm:chiasm-component@0.2.3",
        "d3": "npm:d3@3.5.17",
        "model-js": "npm:model-js@0.2.5",
        "lodash": "npm:lodash@4.13.1"
      }
    },
    "npm:buffer@4.7.1": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6"
      }
    },
    "github:frictionlessdata/jsontableschema-js@master": {
      "map": {
        "moment": "npm:moment@2.14.1",
        "lodash": "npm:lodash@4.13.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "d3-time-format": "npm:d3-time-format@0.3.2",
        "tv4": "npm:tv4@1.2.7"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.5.3",
        "whatwg-fetch": "npm:whatwg-fetch@1.0.0"
      }
    },
    "npm:node-fetch@1.5.3": {
      "map": {
        "is-stream": "npm:is-stream@1.1.0",
        "encoding": "npm:encoding@0.1.12"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.13"
      }
    },
    "npm:d3-time-format@0.3.2": {
      "map": {
        "d3-time": "npm:d3-time@0.2.6"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:chi-datapackage@2.0.0": {
      "map": {
        "crlf-helper": "npm:crlf-helper@0.1.0",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "deep-extend": "npm:deep-extend@0.4.1",
        "datapackage-identifier": "npm:datapackage-identifier@0.4.1",
        "debug": "npm:debug@2.2.0",
        "urijs": "npm:urijs@1.18.1",
        "babyparse": "npm:babyparse@0.4.6",
        "json5": "npm:json5@0.5.0",
        "mime-lookup": "npm:mime-lookup@0.0.2",
        "js-yaml": "npm:js-yaml@3.6.1"
      }
    }
  }
});
