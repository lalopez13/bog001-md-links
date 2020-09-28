const { readFileOrDir } = require('../controller/readFiles.js');
const fileRoute = require('../controller/path.js');
const getLinks = require('../controller/getLinks.js');
const mockProcess = require('jest-mock-process');
const validate = require("../controller/options.js");
const stats = require("../controller/options.js")
const statsAndValidate = require("../controller/options.js")

//const path = require('path');

// Array Links
const fileMdLinks =
[
  {
    href: 'https://www.gog.com/error/404',
    text: '404',
    file: '../mdFiles/test.md'
  },
  {
    href: 'https://github.com/cheeriojs/cheerio',
    text: 'Cheerio',
    file: '../mdFiles/test.md'
  },
  {
    href: 'http://community.laboratoria.la/c/js',
    text: 'foro de la comunidad',
    file: '../mdFiles/test.md'
  }
]


// test path
describe('pathExist', () => {
  it('Debería ser una función', () => {
    expect(typeof fileRoute.pathExist).toBe('function');
  }); 
  it('Debería retornar true si la ruta existe ', () => {
    expect(fileRoute.pathExist('../README.md')).toBe(true);
  }); 
  it('Debería retornar mensaje con el error si la ruta no existe ', () => {
    const mockStdout = mockProcess.mockProcessStdout();
process.stdout.write("The entered route does not exist, try again with a valid route.");
expect(mockStdout).toHaveBeenCalledWith("The entered route does not exist, try again with a valid route.");
  
  }); 
});

describe('isAbsolutePath', () => {
  it('Debería ser una función', () => {
    expect(typeof fileRoute.isAbsolutePath).toBe('function');
  }); 
  it('Debería retornar true si la ruta es absoluta ', () => {
    expect(fileRoute.isAbsolutePath('/bog001-md-links/mdFiles')).toBe(true);
  }); 
  it('Debería retornar false si la ruta es no es absoluta ', () => {
    expect(fileRoute.isAbsolutePath('../README.md')).toBe(false);
  }); 
});


describe('convertPathToAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof fileRoute.convertPathToAbsolute).toBe('function');
  }); 
  it('Debería convertir la ruta relativa en absoluta ', () => {
    expect(fileRoute.convertPathToAbsolute('../README.md')).toBe("D:\\Usuario\\Desktop\\LABORATORIA\\mdLinks\\bog001-md-links\\README.md");
  }); 
});


describe('absolutePath', () => {
  it('Debería ser una función', () => {
    expect(typeof fileRoute.absolutePath).toBe('function');
  }); 
  it('Debería verificar si la rute exite y retornar la ruta absoluta ', () => {
    expect(fileRoute.absolutePath('../README.md')).toBe("D:\\Usuario\\Desktop\\LABORATORIA\\mdLinks\\bog001-md-links\\README.md");
  }); 
});

// Read the files
describe('readFile', () => {
  it('Debería ser una función', () => {
    expect(typeof readFileOrDir).toBe('function');
  });
  it('Debería retornar un array con el archivo si es una fila', () => {
    expect(readFileOrDir('../README.md')).toHaveLength(1);;
  }); 
  it('Debería retornar un array con los archivos si es un directorio', () => {
    expect(readFileOrDir('../mdFiles')).toHaveLength(6);
  }); 
});

// Get the Links
describe('getLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getLinks.getLinks).toBe('function');
  }); 
  describe('getLinks', () => {
    it('Debería retornar un objeto con los links del archivo', () => {
      expect(getLinks.getLinks('../mdFiles/test.md')).toStrictEqual(fileMdLinks);
    }); 
  
});
})

// Validate the links
describe('validate', () => {
  it('Debería ser una función', () => {
    expect(typeof validate.validate).toBe('function');
  }); 
})
// Stats links
describe('validate', () => {
  it('Debería ser una función', () => {
    expect(typeof stats.stats).toBe('function');
  }); 
  it('Debería retornar un objeto con las estadisticas', () => {
    expect(stats.stats('../mdFiles/test.md')).toStrictEqual({ Total: 3, Unique: 3 });
  }); 
})

//Stats & Validate Links
describe('validate', () => {
  it('Debería ser una función', () => {
    expect(typeof statsAndValidate.statsAndValidate).toBe('function');
  }); 
})

