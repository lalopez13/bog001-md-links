// Dependencies
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

// Check if the route exist
const pathExist = (route) => {
  const path = fs.existsSync(route);
  if (path === false) {
    process.stdout.write(
      chalk.red.bold(
        'The entered route does not exist, try again with a valid route.'
      )
    );
    process.exit(0);
  } else {
    return path;
  }
};

// If the route exists, check if the route is absolute
const isAbsolutePath = (route) => path.isAbsolute(route);

// If the route exists, and the route is relative convert to absolute
const convertPathToAbsolute = (route) => path.resolve(route);

// If the route exists, return the absolute path
function absolutePath(route) {
  if (pathExist(route)) {
    if (!isAbsolutePath(route)) {
      // eslint-disable-next-line no-undef
      return (fileAbsolutePath = convertPathToAbsolute(route));
    }
    return route
  }
}

module.exports.absolutePath = absolutePath;
module.exports.pathExist = pathExist;
module.exports.isAbsolutePath = isAbsolutePath;
module.exports.convertPathToAbsolute = convertPathToAbsolute;