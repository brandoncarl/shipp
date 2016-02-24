module.exports = {

  "data": ["data", "json"],

  "locals": {},

  "middleware": {
    "beforeAll": "",
    "beforeRoutes": "",
    "afterRoutes": "",
    "afterAll": ""
  },

  "pipelines": {
    "css": "css",
    "html": "html",
    "js": "javascript"
  },

  "routes": {
    "/"             : { "type": "views",    "path" : "views",      "exts" : ["html"]                             },
    "/components"   : { "type": "statics",  "path" : "components"                                                },
    "/css"          : { "type": "styles",   "path" : "css",        "exts" : ["css"]                              },
    "/fonts"        : { "type": "statics",  "path" : "fonts",      "exts" : ["ttf", "otf", "eot", "woff", "svg"] },
    "/images"       : { "type": "statics",  "path" : "images",                                                   },
    "/js"           : { "type": "scripts",  "path" : "js",         "exts" : ["js"],  "bundleFolders" : true      },
    "/scripts"      : { "type": "scripts",  "path" : "scripts",    "exts" : ["js"],  "bundleFolders" : true      },
    "/styles"       : { "type": "styles",   "path" : "styles",     "exts" : ["css"]                              },
    "/type"         : { "type": "statics",  "path" : "type",       "exts" : ["ttf", "otf", "eot", "woff", "svg"] },
    "/vendor"       : { "type": "statics",  "path" : "vendor"                                                    }
  },

}
