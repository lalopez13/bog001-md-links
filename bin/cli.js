#!/usr/bin/env node

// Dependencies
const program = require('commander');
const CFonts = require('cfonts');
const mdLinks = require('../controller/mdLinks.js');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora('Loading...');
const emoji = require('node-emoji');

CFonts.say('links.md!', {
  font: 'block', // define the font face
  align: 'center', // define text alignment
  colors: ['yellow', 'cyan'], // define all colors
  background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: '0', // define how many character can be on one line
  gradient: false, // define your two gradient colors
  independentGradient: false, // define if you want to recalculate the gradient for each new line
  transitionGradient: false, // define if this is a transition between colors directly
  env: 'node', // define the environment CFonts is being executed in
});

program.version('0.0.1');
program
  .description('Search, validate and generate statistics in markdown files..')
  .option('--validate', 'Returns validated links')
  .option('--stats ', 'Returns link stats')
  .option('--stats --validate ', 'Returns link stats and validate')
  .option('--validate --stats ', 'Returns link stats and validate')
  .parse(process.argv);

//const option = process.argv[3];
const path = process.argv[2];
const optionFlag = process.argv;
//const option = process.argv.slice(3).toString().replace(/,/g, ' ');

// Emojis for status links
const check = emoji.emojify(':heavy_check_mark:');
const fail = emoji.emojify(':heavy_multiplication_x:');
const error = emoji.emojify(':warning:');

if (!optionFlag.includes('--validate') && !optionFlag.includes('--stats')) {
  mdLinks
    .mdLinks(path)
    .then((links) => {
      spinner.start();
      setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Loading links...';
      }, 1000);
      links.forEach((link) => {
        setTimeout(() => {
          spinner.stop();
          console.log(
            `Link: ${chalk.blue.underline.bold(
              link.href
            )}\n+| File: ${chalk.green(
              link.file
            )}\n+| Text: ${chalk.yellowBright(link.text)} `
          );
        }, 3000);
      });
    })
    .catch((e) => console.log(`Error:${chalk.redBright(e)}`));
}

if (optionFlag.includes('--validate') && !optionFlag.includes('--stats')) {
  mdLinks
    .mdLinks(path, { validate: true })
    .then((links) => {
      spinner.start();
      setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Loading validation...';
      }, 1000);
      links.forEach((link) => {
        setTimeout(() => {
          spinner.stop();
          if (link.code >= 200 && link.code <= 309) {
            console.log(
              `|Status:${check} ${chalk.greenBright(
                link.code
              )} \n  + | State : ${chalk.green(
                link.status
              )} \n  + | File: ${chalk.green(
                link.file
              )} \n  + | Text: ${chalk.yellow(
                link.text
              )} \n  + | Link: ${chalk.blue.underline.bold(link.href)} `
            );
          } else if (link.code >= 400) {
            console.log(
              `|Status:${fail} ${chalk.redBright(
                link.code
              )} \n + | State : ${chalk.red(
                link.status
              )} \n + | File: ${chalk.cyanBright(
                link.file
              )} \n + | Text: ${chalk.yellow(
                link.text
              )} \n + | Link: ${chalk.underline.red(link.href)} `
            );
          } else {
            console.log(
              `|Status:${error} \n + | File: ${chalk.cyanBright(
                link.file
              )} \n + | Text: ${chalk.yellow(
                link.text
              )} \n + | Link: ${chalk.cyanBright(
                link.href
              )} \n + | Error: ${chalk.red.bold(link.code)}`
            );
          }
        }, 3000);
      });
    })
    .catch((e) => console.log(`Error:${chalk.redBright(e)}`));
}
if (optionFlag.includes('--stats') && !optionFlag.includes('--validate')) {
  mdLinks
    .mdLinks(path, { stats: true })
    .then((links) => {
      spinner.start();
      setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Loading stats...';
      }, 1000);
      setTimeout(() => {
        spinner.stop();
        console.log('---------');
        console.log(chalk.black.bold.bgWhite('S T A T S'));
        console.log('---------');
        console.log(
          `|Total:${chalk.greenBright(links.Total)}\n|Unique:${chalk.yellow(
            links.Unique
          )}`
        );
      }, 3000);
    })
    .catch((e) => {
      console.log(`Error:${chalk.redBright(e)}`);
    });
}
if (optionFlag.includes('--validate') && optionFlag.includes('--stats')) {
  mdLinks
    .mdLinks(path, { validate: true, stats: true })
    .then((links) => {
      spinner.start();
      setTimeout(() => {
        spinner.color = 'yellow';
        spinner.text = 'Loading stats and validate...';
      }, 1000);
      setTimeout(() => {
        spinner.stop();
        console.log('---------------');
        console.log(chalk.black.bold.bgWhite('STATS&&VALIDATE'));
        console.log('---------------');
        console.log(
          ` +  |Total:${chalk.blue(links.Total)}\n +  |Unique:${chalk.magenta(
            links.Unique
          )}\n +  |Broken: ${chalk.red(links.Broken)}\n +  |Ok: ${chalk.green(
            links.Ok
          )} \n +  |Error: ${chalk.yellow(links.Error)}`
        );
      }, 3000);
    })
    .catch((e) => {
      console.log(`Error:${chalk.redBright(e)}`);
    });
}
