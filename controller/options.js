'use strict';
// Output options for file links

// Dependencies
const fetch = require('node-fetch');
const getLinks = require('./getLinks.js');


// validate Links
const validate = (route) => {
  let arrayLinksMd = getLinks.getLinks(route);
  let arrayLinks = arrayLinksMd.map((mdLink) => {
    return fetch(mdLink.href)
      .then((res) => {
          mdLink.code = res.status;
          mdLink.status = res.statusText;
          return mdLink;
      })
      .catch((e) => {
        mdLink.code = e.code;
        return mdLink;
      });
  });
  return Promise.all(arrayLinks);
};

// stat Links
const stats = (route) => {
  let arrayLinksMd = getLinks.getLinks(route);
  let totalLinks = arrayLinksMd.length;
  let uniqueLinks = new Set(arrayLinksMd.map((link) => link.href)).size;
  return {
    Total: totalLinks,
    Unique: uniqueLinks,
  };
};

// validate an stats links
function statsAndValidate(route) {
  let links = getLinks.getLinks(route);
  let totalLinks = links.length;
  let uniqueLinks = new Set(links.map((link) => link.href)).size;
  let brokenLinks = 0;
  let okLinks = 0;
  let errorLinks = 0;
  let linksCountStatus = [];

  links.forEach((link) => {
    let linksFetch = fetch(link.href)
      .then((res) => {
        if (res.status != 200) {
          brokenLinks++;
        } else {
          okLinks++;
        }
      })
      .catch(() => {
        errorLinks++;
      });
    linksCountStatus.push(linksFetch);
  });
    return Promise.all(linksCountStatus).then(() => {
    return {
      Total: totalLinks,
      Unique: uniqueLinks,
      Broken: brokenLinks,
      Ok: okLinks,
      Error: errorLinks,
    };
  });
}
module.exports.validate = validate;
module.exports.stats = stats;
module.exports.statsAndValidate = statsAndValidate;
