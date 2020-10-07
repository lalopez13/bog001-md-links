'use strict';
// Read the file or dir and extract the files that fulfill the conditions

// Dependencies
const path = require('path');
const fs = require('fs');

const readFileOrDir = (route) => {
  let mdFileArray = [];
  if (fs.statSync(route).isFile()) {
    if (path.extname(route) === '.md') {
      mdFileArray.push(route);
    }
  } else {
    fs.readdirSync(route).forEach((file) => {
      const files = path.join(route, file);
      const stat = fs.statSync(files);
      if (stat.isDirectory()) {
        mdFileArray = mdFileArray.concat(readFileOrDir(files));
      } else if (stat.isFile() && path.extname(file) === '.md') {
        mdFileArray.push(files);
      }
    });
  }

  return mdFileArray;
};

module.exports.readFileOrDir = readFileOrDir;
