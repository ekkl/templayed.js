if (typeof(Templayed) == "undefined") {

// *
// * templayed.js {version} (Uncompressed)
// * A micro (Mustache syntax-like) Javascript templating library
// *
// * (c) {year} Paul Engel (Internetbureau Holder B.V.)
// * Except otherwise noted, templayed.js is licensed under
// * http://creativecommons.org/licenses/by-sa/3.0
// *
// * $Date: {date} $
// *

Templayed = (function() {

  var render = function(template, vars) {
    (vars instanceof Array) || (vars = [vars]);
    return template.replace(/{{(\^|#)(.*?)}}(.*?){{\/\2}}/g, function(match, operator, key, context) {
      var string = "", array = fetch(key, vars), dup, i;
      if (operator == "^") {
        return array.length ? string : render(context, vars);
      }
      for (i in array) {
        dup = vars.slice();
        dup.unshift(array[i]);
        string += render(context, dup);
      }
      return string;
    }).replace(/{{(!|#)?\s*(.*?)\s*}}+/g, function(match, operator, context) {
      switch (operator) {
      case "!":
        return "";
      case "#":
        return fetch(context, vars).apply(vars[0]);
      default:
        return context == "." ? vars[0] : fetch(context, vars);
      }
    });
  },

  fetch = function(path, vars) {
    if (path.match(/\./)) {
      var keys = path.split(".");
      return fetch(keys.slice(1).join("."), [fetch(keys[0], vars)]);
    } else {
      return vars.length ? (vars[0].hasOwnProperty(path) ? vars[0][path] : fetch(path, vars.slice(1))) : "";
    }
  };

  return {
    version: "{version}",
    render: render
  };

}());

templayed = function() {
  return Templayed.render.apply(null, arguments);
};

}