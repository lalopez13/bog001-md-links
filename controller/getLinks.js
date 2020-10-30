'use strict';
// Get the file links

// Dependencies
const marked = require('marked');
const fs = require('fs');
const chalk = require('chalk');
const readFiles = require('./readFiles.js');

const getLinks = (route) => {
  const arrLinks = [];
  const files = readFiles.readFileOrDir(route);
  files.forEach((file) => {
    const readFile = fs.readFileSync(file, 'utf8');
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
      arrLinks.push({
        href,
        text: text.slice(0, 49),
        file: file,
      });
    };
    marked(readFile, {
      renderer,
    });
  });
  if (arrLinks.length <= 0) {
    process.stdout.write(chalk.red.bold('There are no links in this file'));
    process.exit(0);
  } else {
    return arrLinks;
  }
};

module.exports.getLinks = getLinks;
