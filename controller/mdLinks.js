'use strict';
//Main function

// Dependencies
const fileRoute = require('./path.js');
const readFiles = require('./readFiles.js');
const getLinks = require('./getLinks.js');
const validate = require('./options.js');
const stats = require('./options.js');
const statsAndValidate = require('./options.js');
const chalk = require('chalk');

const mdLinks = (path, options = {}) => {
  let rute = fileRoute.absolutePath(path);
  let arrayMd = readFiles.readFileOrDir(rute);
  if (arrayMd.length <= 0) {
    process.stdout.write(
      chalk.red.bold('There are no files with the extension .md')
    );
    process.exit(0);
  }
  return new Promise((resolve) => {
    if (options.validate && !options.stats) {
      resolve(validate.validate(rute));
    } else if (options.stats && !options.validate) {
      resolve(stats.stats(rute));
    } else if (options.stats && options.validate) {
      resolve(statsAndValidate.statsAndValidate(rute));
    } else {
      resolve(getLinks.getLinks(rute));
    }
  }).catch((err) => {
    chalk.red.bold(err);
  });
};


module.exports.mdLinks = mdLinks;
