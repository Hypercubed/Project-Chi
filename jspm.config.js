SystemJS.config({
  nodeConfig: {
    "paths": {
      "github:": "jspm_packages/github/",
      "npm:": "jspm_packages/npm/",
      "local:": "jspm_packages/local/",
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
  rootURL: "./app",
  separateCSS: true,
  buildHTML: true,
  packages: {
    "project-chi": {
      "main": "project-chi.js",
      "format": "esm"
    },
    "": {
      "defaultJSExtensions": true,
      "map": {
        "chi-datapackage/src/store": {
          "production": "chi-datapackage/dist/store"
        },
        "chi-datapackage/src/normalizer": {
          "production": "chi-datapackage/dist/normalizer"
        }
      },
      "meta": {
        "*.md": {
          "loader": "md",
          "mdOptions": {
            "tables": true
          }
        }
      }
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
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json",
    "local:*.json"
  ],
  map: {
    "Hypercubed/d3-tip": "github:Hypercubed/d3-tip@master",
    "angular-animate": "npm:angular-animate@1.5.8",
    "angular-breadcrumbs": "npm:angular-breadcrumbs@0.5.3",
    "angular-downloadsvg-directive": "npm:angular-downloadsvg-directive@0.2.0",
    "FileSaver": "github:eligrey/FileSaver.js@master",
    "URIjs": "npm:URIjs@1.16.1",
    "_F": "github:Hypercubed/_F@0.0.11",
    "angular": "npm:angular@1.5.8",
    "angular-cookies": "npm:angular-cookies@1.5.8",
    "angular-growl": "npm:angular-growl-v2@0.7.5",
    "angular-intro.js": "npm:angular-intro.js@2.1.1",
    "angular-json-tree": "npm:angular-json-tree@1.0.1",
    "angular-loading-bar": "npm:angular-loading-bar@0.9.0",
    "angular-marked": "npm:angular-marked@1.2.2",
    "angular-route": "npm:angular-route@1.5.8",
    "angular-sanitize": "npm:angular-sanitize@1.5.8",
    "angular-spectrum-colorpicker": "npm:angular-spectrum-colorpicker@1.4.5",
    "angular-touch": "npm:angular-touch@1.5.8",
    "angular-ui-bootstrap": "npm:angular-ui-bootstrap@2.2.0",
    "angular-ui-grid": "npm:angular-ui-grid@3.2.9",
    "angularjs-slider": "npm:angularjs-slider@5.8.1",
    "animate": "npm:animate.css@3.5.2",
    "assert": "npm:jspm-nodelibs-assert@0.2.0",
    "babel-plugin-transform-builtin-extend": "npm:babel-plugin-transform-builtin-extend@1.1.0",
    "babyparse": "npm:babyparse@0.4.6",
    "bcrypt-pbkdf": "npm:bcrypt-pbkdf@1.0.0",
    "biojs-io-fasta": "npm:biojs-io-fasta@0.1.17",
    "biojs-vis-example": "npm:biojs-vis-example@0.1.4",
    "blobjs": "github:eligrey/Blob.js@master",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.0",
    "chi-datapackage": "npm:chi-datapackage@5.0.5",
    "chiasm": "npm:chiasm@0.3.0",
    "chiasm-charts": "npm:chiasm-charts@0.1.5",
    "chiasm-component": "npm:chiasm-component@0.2.3",
    "chiasm-data-reduction": "npm:chiasm-data-reduction@0.3.0",
    "chiasm-layout": "github:chiasm-project/chiasm-layout@0.3.0",
    "chiasm-links": "npm:chiasm-links@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
    "clipboard": "npm:clipboard@1.5.15",
    "codemirror": "github:codemirror/codemirror@5.19.0",
    "constants": "npm:jspm-nodelibs-constants@0.2.0",
    "core-decorators": "npm:core-decorators@0.14.0",
    "core-js": "npm:core-js@1.2.7",
    "crlf-helper": "npm:crlf-helper@0.1.0",
    "crossfilter": "npm:crossfilter2@1.4.0-alpha.6",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
    "css": "github:systemjs/plugin-css@0.1.32",
    "cuid": "npm:cuid@1.3.8",
    "d3": "npm:d3@3.5.17",
    "d3-array": "npm:d3-array@1.0.1",
    "d3-axis": "npm:d3-axis@1.0.3",
    "d3-collection": "npm:d3-collection@1.0.4",
    "d3-color": "npm:d3-color@1.0.3",
    "d3-dispatch": "npm:d3-dispatch@1.0.1",
    "d3-drag": "npm:d3-drag@1.0.1",
    "d3-force": "npm:d3-force@1.0.3",
    "d3-hierarchy": "npm:d3-hierarchy@1.0.2",
    "d3-interpolate": "npm:d3-interpolate@1.1.6",
    "d3-plugins": "github:d3/d3-plugins@master",
    "d3-scale": "npm:d3-scale@1.0.3",
    "d3-scale-chromatic": "npm:d3-scale-chromatic@1.0.2",
    "d3-selection": "npm:d3-selection@1.0.2",
    "d3-shape": "npm:d3-shape@1.0.3",
    "d3-svg-legend": "npm:d3-svg-legend@1.12.0",
    "d3-tip": "github:Hypercubed/d3-tip@master",
    "d3-transition": "npm:d3-transition@1.0.3",
    "d3plus-text": "npm:d3plus-text@0.4.5",
    "dgram": "npm:jspm-nodelibs-dgram@0.2.0",
    "dns": "npm:jspm-nodelibs-dns@0.2.0",
    "domain": "npm:jspm-nodelibs-domain@0.2.0",
    "ecc-jsbn": "npm:ecc-jsbn@0.1.1",
    "events": "npm:jspm-nodelibs-events@0.2.0",
    "font-awesome": "npm:font-awesome@4.7.0",
    "fs": "npm:jspm-nodelibs-fs@0.2.0",
    "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.0",
    "inlet": "github:enjalot/Inlet@0.1.1",
    "intro.js": "npm:intro.js@2.3.0",
    "jodid25519": "npm:jodid25519@1.0.2",
    "jquery": "npm:jquery@3.1.1",
    "js-yaml": "npm:js-yaml@3.7.0",
    "jsbn": "npm:jsbn@0.1.0",
    "json": "github:systemjs/plugin-json@0.2.1",
    "json5": "npm:json5@0.5.1",
    "jsontableschema": "github:frictionlessdata/jsontableschema-js@master",
    "jspm/nodelibs-assert": "npm:jspm-nodelibs-assert@0.2.0",
    "less": "github:systemjs/plugin-less@0.1.2",
    "lodash": "npm:lodash@4.16.6",
    "md": "github:Hypercubed/system-md-marked@1.0.1",
    "mime-lookup": "npm:mime-lookup@0.0.2",
    "ml-matrix": "github:Hypercubed/matrix@babel2",
    "ml-pca": "npm:ml-pca@1.1.2",
    "mobx": "npm:mobx@2.6.3",
    "mobx-utils": "npm:mobx-utils@1.1.2",
    "model-js": "npm:model-js@0.2.5",
    "module": "npm:jspm-nodelibs-module@0.2.0",
    "mongodb-extended-json": "npm:mongodb-extended-json@1.7.1",
    "net": "npm:jspm-nodelibs-net@0.2.0",
    "ono": "npm:ono@2.2.1",
    "os": "npm:jspm-nodelibs-os@0.2.0",
    "path": "npm:jspm-nodelibs-path@0.2.0",
    "pivottable": "npm:pivottable@2.1.0",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.12",
    "polymer": "github:Polymer/polymer@1.7.0",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "punycode": "npm:jspm-nodelibs-punycode@0.2.0",
    "q": "npm:q@1.4.1",
    "querystring": "npm:jspm-nodelibs-querystring@0.2.0",
    "screenfull": "npm:screenfull@2.0.0",
    "source-map": "npm:source-map@0.1.43",
    "spectrum-colorpicker": "npm:spectrum-colorpicker@1.8.0",
    "stream": "npm:jspm-nodelibs-stream@0.2.0",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
    "text": "github:systemjs/plugin-text@0.0.9",
    "three": "npm:three@0.82.1",
    "tls": "npm:jspm-nodelibs-tls@0.2.0",
    "tty": "npm:jspm-nodelibs-tty@0.2.0",
    "tweetnacl": "npm:tweetnacl@0.14.3",
    "ui-codemirror": "github:angular-ui/ui-codemirror@0.3.0",
    "ui-select": "npm:ui-select@0.20.0",
    "universe": "npm:universe@0.8.0",
    "url": "npm:jspm-nodelibs-url@0.2.0",
    "util": "npm:jspm-nodelibs-util@0.2.1",
    "vega": "github:vega/vega@2.6.3",
    "vega-lite": "github:vega/vega-lite@1.2.0",
    "venn.js": "npm:venn.js@0.2.13",
    "vm": "npm:jspm-nodelibs-vm@0.2.0",
    "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22",
    "webtreemap": "github:evmar/webtreemap@v1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.0"
  },
  packages: {
    "github:Hypercubed/matrix@babel2": {
      "defaultJSExtensions": true,
      "meta": {
        "*.js": {
          "format": "cjs",
          "loader": "plugin-babel",
          "babelOptions": {
            "modularRuntime": false,
            "plugins": [
              [
                "babel-plugin-transform-builtin-extend",
                {
                  "globals": [
                    "Error",
                    "Array",
                    "Object"
                  ]
                }
              ]
            ]
          }
        }
      }
    },
    "github:Hypercubed/systemjs-plugin-html@0.0.8": {
      "map": {
        "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22"
      }
    },
    "npm:URIjs@1.16.1": {
      "map": {}
    },
    "npm:angular-json-tree@1.0.1": {
      "map": {
        "angular": "npm:angular@1.5.8"
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
        "xhr": "npm:xhr@2.2.2",
        "request": "npm:request@2.75.0",
        "node-request": "npm:request@2.75.0"
      }
    },
    "npm:biojs-vis-example@0.1.4": {
      "map": {
        "d3": "npm:d3@3.5.17"
      }
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
    "npm:chiasm@0.3.0": {
      "map": {
        "es6-promise": "npm:es6-promise@3.3.1",
        "lodash": "npm:lodash@4.16.6",
        "model-js": "npm:model-js@0.2.5"
      }
    },
    "npm:core-util-is@1.0.2": {
      "map": {}
    },
    "npm:crossfilter2@1.4.0-alpha.6": {
      "map": {
        "lodash.result": "npm:lodash.result@4.5.2"
      }
    },
    "npm:cuid@1.3.8": {
      "map": {
        "browser-fingerprint": "npm:browser-fingerprint@0.0.1",
        "core-js": "npm:core-js@1.2.7",
        "node-fingerprint": "npm:node-fingerprint@0.0.2"
      }
    },
    "npm:duplexer@0.1.1": {
      "map": {}
    },
    "npm:for-each@0.3.2": {
      "map": {
        "is-function": "npm:is-function@1.0.1"
      }
    },
    "npm:from@0.1.3": {
      "map": {}
    },
    "npm:is-function@1.0.1": {
      "map": {}
    },
    "npm:isarray@1.0.0": {
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
    "npm:lodash.keys@3.1.2": {
      "map": {
        "lodash._getnative": "npm:lodash._getnative@3.9.1",
        "lodash.isarguments": "npm:lodash.isarguments@3.1.0",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash.pairs@3.0.1": {
      "map": {
        "lodash.keys": "npm:lodash.keys@3.1.2"
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
    "npm:punycode@1.3.2": {
      "map": {}
    },
    "npm:q@1.4.1": {
      "map": {}
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
    "npm:through@2.3.8": {
      "map": {}
    },
    "npm:universe@0.8.0": {
      "map": {
        "crossfilter2": "npm:crossfilter2@1.4.0-alpha.6",
        "q": "npm:q@1.4.1",
        "reductio": "npm:reductio@0.6.3"
      }
    },
    "npm:vow@0.4.12": {
      "map": {}
    },
    "npm:xtend@4.0.1": {
      "map": {}
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
        "jsprim": "npm:jsprim@1.3.1",
        "sshpk": "npm:sshpk@1.10.1"
      }
    },
    "npm:har-validator@2.0.6": {
      "map": {
        "chalk": "npm:chalk@1.1.3",
        "commander": "npm:commander@2.9.0",
        "is-my-json-valid": "npm:is-my-json-valid@2.15.0",
        "pinkie-promise": "npm:pinkie-promise@2.0.1"
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
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.2.2"
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
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.9",
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
        "readable-stream": "npm:readable-stream@2.2.2",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4",
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.1.2",
        "bn.js": "npm:bn.js@4.11.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "elliptic": "npm:elliptic@6.3.2"
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
        "bn.js": "npm:bn.js@4.11.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "des.js": "npm:des.js@1.0.0",
        "cipher-base": "npm:cipher-base@1.0.3"
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
        "inherits": "npm:inherits@2.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.3"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.8",
        "cipher-base": "npm:cipher-base@1.0.3"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.3.2"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "randombytes": "npm:randombytes@2.0.3",
        "miller-rabin": "npm:miller-rabin@4.0.0"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "asn1.js": "npm:asn1.js@4.9.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.6"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "github:chiasm-project/chiasm-layout@0.3.0": {
      "map": {
        "chiasm-component": "npm:chiasm-component@0.2.3",
        "d3": "npm:d3@3.5.17",
        "model-js": "npm:model-js@0.2.5",
        "lodash": "npm:lodash@4.16.6"
      }
    },
    "github:frictionlessdata/jsontableschema-js@master": {
      "map": {
        "moment": "npm:moment@2.15.1",
        "lodash": "npm:lodash@4.16.6",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "d3-time-format": "npm:d3-time-format@2.0.2",
        "tv4": "npm:tv4@1.2.7",
        "stream-transform": "npm:stream-transform@0.1.1",
        "csv-parse": "npm:csv-parse@1.1.7",
        "regenerator-runtime": "npm:regenerator-runtime@0.11.0",
        "es6-error": "npm:es6-error@4.0.2",
        "stream-to-async-iterator": "npm:stream-to-async-iterator@0.2.0",
        "csv": "npm:csv@1.2.1",
        "axios": "npm:axios@0.16.2"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.6.3",
        "whatwg-fetch": "npm:whatwg-fetch@2.0.1"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.15"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:d3-time-format@2.0.2": {
      "map": {
        "d3-time": "npm:d3-time@1.0.4"
      }
    },
    "npm:chiasm-data-reduction@0.3.0": {
      "map": {
        "data-reduction": "npm:data-reduction@0.3.0",
        "chiasm-component": "npm:chiasm-component@0.2.3",
        "model-js": "npm:model-js@0.2.5"
      }
    },
    "npm:data-reduction@0.3.0": {
      "map": {
        "d3-scale": "npm:d3-scale@0.1.5",
        "d3-time": "npm:d3-time@0.0.7",
        "d3-arrays": "npm:d3-arrays@0.4.1"
      }
    },
    "github:Hypercubed/system-md-marked@1.0.1": {
      "map": {
        "marked": "npm:marked@0.3.6"
      }
    },
    "npm:angular-downloadsvg-directive@0.2.0": {
      "map": {
        "svgsaver": "npm:svgsaver@0.6.1"
      }
    },
    "npm:svgsaver@0.6.1": {
      "map": {
        "computed-styles": "npm:computed-styles@1.1.2"
      }
    },
    "npm:babel-plugin-transform-builtin-extend@1.1.0": {
      "map": {
        "babel-template": "npm:babel-template@6.16.0",
        "babel-runtime": "npm:babel-runtime@6.11.6"
      }
    },
    "npm:babel-runtime@6.11.6": {
      "map": {
        "core-js": "npm:core-js@2.4.1",
        "regenerator-runtime": "npm:regenerator-runtime@0.9.5"
      }
    },
    "npm:babel-messages@6.8.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.11.6"
      }
    },
    "npm:invariant@2.2.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.2.0"
      }
    },
    "npm:loose-envify@1.2.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.3"
      }
    },
    "npm:readable-stream@2.0.6": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "isarray": "npm:isarray@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "string_decoder": "npm:string_decoder@0.10.31",
        "process-nextick-args": "npm:process-nextick-args@1.0.7"
      }
    },
    "npm:bcrypt-pbkdf@1.0.0": {
      "map": {
        "tweetnacl": "npm:tweetnacl@0.14.3"
      }
    },
    "npm:source-map@0.1.43": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:ecc-jsbn@0.1.1": {
      "map": {
        "jsbn": "npm:jsbn@0.1.0"
      }
    },
    "npm:jodid25519@1.0.2": {
      "map": {
        "jsbn": "npm:jsbn@0.1.0"
      }
    },
    "npm:buffer@4.9.1": {
      "map": {
        "base64-js": "npm:base64-js@1.2.0",
        "isarray": "npm:isarray@1.0.0",
        "ieee754": "npm:ieee754@1.1.8"
      }
    },
    "npm:cipher-base@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:elliptic@6.3.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "brorand": "npm:brorand@1.0.6",
        "hash.js": "npm:hash.js@1.0.3"
      }
    },
    "npm:node-fetch@1.6.3": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:argparse@1.0.9": {
      "map": {
        "sprintf-js": "npm:sprintf-js@1.0.3"
      }
    },
    "github:systemjs/plugin-less@0.1.2": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.32"
      }
    },
    "github:Hypercubed/d3-tip@master": {
      "map": {
        "d3-collection": "npm:d3-collection@1.0.1",
        "d3-selection": "npm:d3-selection@1.0.2"
      }
    },
    "npm:d3-interpolate@1.1.1": {
      "map": {
        "d3-color": "npm:d3-color@1.0.3"
      }
    },
    "npm:ml-pca@1.1.2": {
      "map": {
        "ml-stat": "npm:ml-stat@1.3.3",
        "ml-matrix": "github:Hypercubed/matrix@babel2"
      }
    },
    "npm:pivottable@2.1.0": {
      "map": {
        "jquery": "npm:jquery@3.1.1"
      }
    },
    "npm:mongodb-extended-json@1.7.1": {
      "map": {
        "lodash.isfunction": "npm:lodash.isfunction@3.0.8",
        "lodash.transform": "npm:lodash.transform@3.0.4",
        "JSONStream": "npm:JSONStream@1.2.1",
        "moment": "npm:moment@2.15.1",
        "async": "npm:async@1.5.2",
        "raf": "npm:raf@3.3.0",
        "event-stream": "npm:event-stream@3.3.4",
        "bson": "npm:bson@0.5.5"
      }
    },
    "npm:angular-marked@1.2.2": {
      "map": {
        "marked": "npm:marked@0.3.6"
      }
    },
    "npm:angular-ui-grid@3.2.9": {
      "map": {
        "angular": "npm:angular@1.5.8"
      }
    },
    "npm:reductio@0.6.3": {
      "map": {
        "crossfilter2": "npm:crossfilter2@1.4.0-alpha.6"
      }
    },
    "npm:JSONStream@1.2.1": {
      "map": {
        "jsonparse": "npm:jsonparse@1.2.0",
        "through": "npm:through@2.3.8"
      }
    },
    "npm:babel-template@6.16.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.11.6",
        "lodash": "npm:lodash@4.16.6",
        "babel-types": "npm:babel-types@6.16.0",
        "babel-traverse": "npm:babel-traverse@6.16.0",
        "babylon": "npm:babylon@6.11.4"
      }
    },
    "npm:event-stream@3.3.4": {
      "map": {
        "through": "npm:through@2.3.8",
        "duplexer": "npm:duplexer@0.1.1",
        "stream-combiner": "npm:stream-combiner@0.0.4",
        "map-stream": "npm:map-stream@0.1.0",
        "split": "npm:split@0.3.3",
        "pause-stream": "npm:pause-stream@0.0.11",
        "from": "npm:from@0.1.3"
      }
    },
    "npm:raf@3.3.0": {
      "map": {
        "performance-now": "npm:performance-now@0.2.0"
      }
    },
    "npm:babel-types@6.16.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.11.6",
        "lodash": "npm:lodash@4.16.6",
        "to-fast-properties": "npm:to-fast-properties@1.0.2",
        "esutils": "npm:esutils@2.0.2"
      }
    },
    "npm:babel-traverse@6.16.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.11.6",
        "debug": "npm:debug@2.2.0",
        "babel-types": "npm:babel-types@6.16.0",
        "babylon": "npm:babylon@6.11.4",
        "lodash": "npm:lodash@4.16.6",
        "invariant": "npm:invariant@2.2.1",
        "babel-messages": "npm:babel-messages@6.8.0",
        "globals": "npm:globals@8.18.0",
        "babel-code-frame": "npm:babel-code-frame@6.16.0"
      }
    },
    "github:twbs/bootstrap@3.3.7": {
      "map": {
        "jquery": "npm:jquery@3.1.1"
      }
    },
    "npm:request@2.75.0": {
      "map": {
        "tough-cookie": "npm:tough-cookie@2.3.1",
        "aws-sign2": "npm:aws-sign2@0.6.0",
        "bl": "npm:bl@1.1.2",
        "aws4": "npm:aws4@1.4.1",
        "caseless": "npm:caseless@0.11.0",
        "extend": "npm:extend@3.0.0",
        "combined-stream": "npm:combined-stream@1.0.5",
        "forever-agent": "npm:forever-agent@0.6.1",
        "har-validator": "npm:har-validator@2.0.6",
        "is-typedarray": "npm:is-typedarray@1.0.0",
        "oauth-sign": "npm:oauth-sign@0.8.2",
        "http-signature": "npm:http-signature@1.1.1",
        "stringstream": "npm:stringstream@0.0.5",
        "tunnel-agent": "npm:tunnel-agent@0.4.3",
        "hawk": "npm:hawk@3.1.3",
        "json-stringify-safe": "npm:json-stringify-safe@5.0.1",
        "isstream": "npm:isstream@0.1.2",
        "node-uuid": "npm:node-uuid@1.4.7",
        "form-data": "npm:form-data@2.0.0",
        "mime-types": "npm:mime-types@2.1.12",
        "qs": "npm:qs@6.2.1"
      }
    },
    "npm:xhr@2.2.2": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "is-function": "npm:is-function@1.0.1",
        "global": "npm:global@4.3.1",
        "parse-headers": "npm:parse-headers@2.0.1"
      }
    },
    "npm:babel-code-frame@6.16.0": {
      "map": {
        "esutils": "npm:esutils@2.0.2",
        "js-tokens": "npm:js-tokens@2.0.0",
        "chalk": "npm:chalk@1.1.3"
      }
    },
    "npm:form-data@2.0.0": {
      "map": {
        "combined-stream": "npm:combined-stream@1.0.5",
        "mime-types": "npm:mime-types@2.1.12",
        "asynckit": "npm:asynckit@0.4.0"
      }
    },
    "npm:global@4.3.1": {
      "map": {
        "process": "npm:process@0.5.2",
        "min-document": "npm:min-document@2.19.0",
        "node-min-document": "npm:min-document@2.19.0"
      }
    },
    "npm:mime-types@2.1.12": {
      "map": {
        "mime-db": "npm:mime-db@1.24.0"
      }
    },
    "npm:is-my-json-valid@2.15.0": {
      "map": {
        "jsonpointer": "npm:jsonpointer@4.0.0",
        "xtend": "npm:xtend@4.0.1",
        "generate-function": "npm:generate-function@2.0.0",
        "generate-object-property": "npm:generate-object-property@1.2.0"
      }
    },
    "npm:min-document@2.19.0": {
      "map": {
        "dom-walk": "npm:dom-walk@0.1.1"
      }
    },
    "npm:sshpk@1.10.1": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0",
        "getpass": "npm:getpass@0.1.6",
        "asn1": "npm:asn1@0.2.3",
        "dashdash": "npm:dashdash@1.14.0"
      }
    },
    "npm:jsprim@1.3.1": {
      "map": {
        "extsprintf": "npm:extsprintf@1.0.2",
        "json-schema": "npm:json-schema@0.2.3",
        "verror": "npm:verror@1.3.6"
      }
    },
    "npm:pbkdf2@3.0.9": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:d3-scale-chromatic@1.0.2": {
      "map": {
        "d3-interpolate": "npm:d3-interpolate@1.1.1"
      }
    },
    "npm:angular-spectrum-colorpicker@1.4.5": {
      "map": {
        "spectrum-colorpicker": "npm:spectrum-colorpicker@1.8.0",
        "angular": "npm:angular@1.5.8"
      }
    },
    "npm:d3-force@1.0.3": {
      "map": {
        "d3-dispatch": "npm:d3-dispatch@1.0.1",
        "d3-timer": "npm:d3-timer@1.0.3",
        "d3-collection": "npm:d3-collection@1.0.1",
        "d3-quadtree": "npm:d3-quadtree@1.0.1"
      }
    },
    "npm:d3-drag@1.0.1": {
      "map": {
        "d3-selection": "npm:d3-selection@1.0.2",
        "d3-dispatch": "npm:d3-dispatch@1.0.1"
      }
    },
    "npm:d3-shape@1.0.3": {
      "map": {
        "d3-path": "npm:d3-path@1.0.2"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.0": {
      "map": {
        "domain-browserify": "npm:domain-browser@1.1.7"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.0": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:jspm-nodelibs-punycode@0.2.0": {
      "map": {
        "punycode-browserify": "npm:punycode@1.4.1"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.0": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.5.0"
      }
    },
    "npm:jspm-nodelibs-os@0.2.0": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.0": {
      "map": {
        "buffer-browserify": "npm:buffer@4.9.1"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.0": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.0": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:jspm-nodelibs-url@0.2.0": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:clipboard@1.5.15": {
      "map": {
        "good-listener": "npm:good-listener@1.2.0",
        "tiny-emitter": "npm:tiny-emitter@1.1.0",
        "select": "npm:select@1.1.0"
      }
    },
    "npm:d3-transition@1.0.3": {
      "map": {
        "d3-color": "npm:d3-color@1.0.3",
        "d3-interpolate": "npm:d3-interpolate@1.1.1",
        "d3-timer": "npm:d3-timer@1.0.3",
        "d3-ease": "npm:d3-ease@1.0.1",
        "d3-selection": "npm:d3-selection@1.0.2",
        "d3-dispatch": "npm:d3-dispatch@1.0.1"
      }
    },
    "npm:good-listener@1.2.0": {
      "map": {
        "delegate": "npm:delegate@3.1.0"
      }
    },
    "npm:font-awesome@4.7.0": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.32"
      }
    },
    "npm:venn.js@0.2.13": {
      "map": {
        "d3-transition": "npm:d3-transition@1.0.3",
        "d3-selection": "npm:d3-selection@1.0.2"
      }
    },
    "npm:d3-scale@1.0.3": {
      "map": {
        "d3-array": "npm:d3-array@1.0.1",
        "d3-color": "npm:d3-color@1.0.3",
        "d3-collection": "npm:d3-collection@1.0.1",
        "d3-interpolate": "npm:d3-interpolate@1.1.1",
        "d3-time": "npm:d3-time@1.0.4",
        "d3-time-format": "npm:d3-time-format@2.0.2",
        "d3-format": "npm:d3-format@1.0.2"
      }
    },
    "npm:d3-scale@0.1.5": {
      "map": {
        "d3-arrays": "npm:d3-arrays@0.3.1",
        "d3-time": "npm:d3-time@0.0.7",
        "d3-time-format": "npm:d3-time-format@0.1.5",
        "d3-color": "npm:d3-color@0.2.8",
        "d3-interpolate": "npm:d3-interpolate@0.1.4",
        "d3-format": "npm:d3-format@0.3.6"
      }
    },
    "npm:d3-time-format@0.1.5": {
      "map": {
        "d3-time": "npm:d3-time@0.0.7"
      }
    },
    "npm:d3-interpolate@0.1.4": {
      "map": {
        "d3-color": "npm:d3-color@0.2.8"
      }
    },
    "npm:asn1.js@4.9.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:d3plus-text@0.4.5": {
      "map": {
        "d3-array": "npm:d3-array@0.7.1",
        "d3-selection": "npm:d3-selection@0.7.3",
        "d3-transition": "npm:d3-transition@0.2.10"
      }
    },
    "npm:d3-transition@0.2.10": {
      "map": {
        "d3-color": "npm:d3-color@0.4.2",
        "d3-dispatch": "npm:d3-dispatch@0.4.4",
        "d3-ease": "npm:d3-ease@0.7.0",
        "d3-interpolate": "npm:d3-interpolate@0.8.3",
        "d3-timer": "npm:d3-timer@0.4.4",
        "d3-selection": "npm:d3-selection@0.7.3"
      }
    },
    "npm:d3-interpolate@0.8.3": {
      "map": {
        "d3-color": "npm:d3-color@0.4.2"
      }
    },
    "npm:chi-datapackage@5.0.5": {
      "map": {
        "lodash.merge": "npm:lodash.merge@4.6.0",
        "jsonpointer": "npm:jsonpointer@4.0.0",
        "cuid": "npm:cuid@1.3.8",
        "js-yaml": "npm:js-yaml@3.7.0",
        "json5": "npm:json5@0.5.1",
        "debug": "npm:debug@2.3.3",
        "urijs": "npm:urijs@1.18.3",
        "parse-iso-duration": "npm:parse-iso-duration@1.0.0",
        "datapackage-identifier": "npm:datapackage-identifier@0.4.2",
        "d3-time-format": "npm:d3-time-format@2.0.3",
        "babyparse": "npm:babyparse@0.4.6",
        "crlf-helper": "npm:crlf-helper@0.1.0",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "mobx-utils": "npm:mobx-utils@1.1.2",
        "mobx": "npm:mobx@2.6.3",
        "mime-lookup": "npm:mime-lookup@0.0.2"
      }
    },
    "npm:js-yaml@3.7.0": {
      "map": {
        "argparse": "npm:argparse@1.0.9",
        "esprima": "npm:esprima@2.7.3"
      }
    },
    "npm:debug@2.3.3": {
      "map": {
        "ms": "npm:ms@0.7.2"
      }
    },
    "npm:d3-time-format@2.0.3": {
      "map": {
        "d3-time": "npm:d3-time@1.0.4"
      }
    },
    "npm:stream-http@2.5.0": {
      "map": {
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1",
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.2.2"
      }
    },
    "npm:readable-stream@2.2.2": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "inherits": "npm:inherits@2.0.3",
        "core-util-is": "npm:core-util-is@1.0.2",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:sha.js@2.4.8": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:csv@1.2.1": {
      "map": {
        "csv-parse": "npm:csv-parse@1.3.3",
        "csv-generate": "npm:csv-generate@1.1.2",
        "stream-transform": "npm:stream-transform@0.2.2",
        "csv-stringify": "npm:csv-stringify@1.1.2"
      }
    },
    "npm:axios@0.16.2": {
      "map": {
        "is-buffer": "npm:is-buffer@1.1.6",
        "follow-redirects": "npm:follow-redirects@1.2.6"
      }
    },
    "npm:follow-redirects@1.2.6": {
      "map": {
        "debug": "npm:debug@3.1.0"
      }
    },
    "npm:csv-stringify@1.1.2": {
      "map": {
        "lodash.get": "npm:lodash.get@4.4.2"
      }
    },
    "npm:debug@3.1.0": {
      "map": {
        "ms": "npm:ms@2.0.0"
      }
    },
    "npm:d3-interpolate@1.1.6": {
      "map": {
        "d3-color": "npm:d3-color@1.0.3"
      }
    }
  }
});
