var escapeDiacritic = require('./escape_diacritic');
var escapeRegExp = require('./escape_regexp');
var rNull = /[^\x00-\x7F]+/g;
var rSpecial = /[\s~`!@#\$%\^&\*\(\)\-_\+=\[\]\{\}\|\\;:"'<>,\.\?\/]+/g;

module.exports = function(str, options){
  if (typeof str !== 'string') throw new TypeError('str must be a string!');
  options = options || {};

  var separator = options.separator || '-';
  var escapedSep = escapeRegExp(separator);

  var result = escapeDiacritic(str)
    // Remove null characters
    .replace(rNull, '')
    // Replace special characters
    .replace(rSpecial, separator)
    // Remove continous separators
    .replace(new RegExp(escapedSep + '{2,}', 'g'), separator)
    // Remove prefixing and trailing separtors
    .replace(new RegExp('^' + escapedSep + '+|' + escapedSep + '+$', 'g'), '');

  switch (options.transform){
    case 1:
      return result.toLowerCase();

    case 2:
      return result.toUpperCase();

    default:
      return result;
  }
};