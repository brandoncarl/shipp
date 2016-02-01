
/*

  data-store.js

*/

var fs    = require("fs"),
    low   = require("lowdb"),
    Utils = require("./utils"),
    _     = require("lodash/core"),
    pair  = require("lodash/fromPairs");


/*

  function extendDatabase

  Adds a "get" function so that lowdb can handle key/values.

*/

function extendDatabase(db) {

  // Gets a database key
  db.get = function(key) {
    var val = db.object[key];
    return (Array.isArray(val)) ? db(key) : _(val);
  }

  // Runs a database query
  db.query = function(query) {

    var chain = _(db.get(query.route).value());

    // Filters
    if (query.filters) chain = chain.filter(query.filters);

    // Fields (if single field, return array)
    if (query.fields) {
      if (Array.isArray(query.fields))
        chain = chain.map(function(x) { return _.pick(x, query.fields) });
      else
        chain = chain.map(query.fields);
    }

    return chain.value();

  }

  // Executes multiple queries and combines into a single object
  db.queries = function(queries) {
    if (!Array.isArray(queries)) queries = [queries];
    return _.reduce(queries, function(results, query) {
      var result = db.query(query);
      if ("undefined" !== typeof query.idx) result = result[query.idx];
      return _.extend(results, (query.key) ? pair([[query.key, result]]) : result);
    }, {});
  }

  return db;

}


module.exports = function(options) {

  var db = extendDatabase(low()),
      val;

  // Set defaults
  options = _.extend({ path : "./data", url : "/" }, options);

  Utils.mapFiles(options.path).forEach(function(file) {

    var json = JSON.parse(fs.readFileSync(file.path, "utf8")),
        slug = Utils.makeRoutes(options.url, { folder : file.folder, name : "" })[0]

    // If array, use file name as key. Otherwise, parse keys
    if (Array.isArray(json)) {

      key = (slug + "/" + file.name).replace(/\/+/g, "/").replace(/^\/+/, "");
      db.object[key] = json;

    } else {

      // Create path-like keys using directories (and remove leading "/")
      for (key in json) {

        // Remove leading "/" and make db key-friendly
        val = json[key];
        key = (slug + "/" + key).replace(/\/+/g, "/").replace(/^\/+/, "");
        db.object[key] = val;

      }
    }

  });

  return db;

}
