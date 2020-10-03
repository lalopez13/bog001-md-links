const { readFileOrDir } = require('../controller/readFiles.js');
const fileRoute = require('../controller/path.js');
const getLinks = require('../controller/getLinks.js');
const mockProcess = require('jest-mock-process');
const validate = require("../controller/options.js");
const stats = require("../controller/options.js")
const statsAndValidate = require("../controller/options.js")

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
// Validated Links
const validateMdLinks =
[
  {
    href: 'https://www.npmjs.com/',
    text: 'npm',
    file: '../mdFiles/validate.md',
    code: 200,
    status: 'OK'
  },
  {
    href: 'https://user-images.githubusercontent.com/1102/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: '../mdFiles/validate.md',
    code: 403,
    status: 'Forbidden'
  },
  {
    href: 'https://nodeajs.org/',
    text: 'Node.js',
    file: '../mdFiles/validate.md',
    code: 'ENOTFOUND'
  },
  {
    href: 'https://www.gog.com/error/404',
    text: '404',
    file: '../mdFiles/validate.md',
    code: 404,
    status: 'Not Found'
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
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    fileRoute.pathExist('../noLiks.md');
    expect(mockExit).toBeCalled();
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
    it('Debería retornar un objeto con los links del archivo', () => {
      expect(getLinks.getLinks('../mdFiles/test.md')).toStrictEqual(fileMdLinks);
    });  
  it('Debería salir si el archivo no tiene links', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    getLinks.getLinks('../noLinks.md');
    expect(mockExit).toBeCalled();
  });  
})

// Validate the links
describe('validate', () => {
  it('Debería ser una función', () => {
    expect(typeof validate.validate).toBe('function');
  }); 
  it('Debería mostrar en consola el resultado de la validación',() => {
   return validate.validate('../mdFiles/validate.md').then((res)=>{
     expect(res).toStrictEqual(validateMdLinks)
   })
})
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
  it('Debería mostrar en consola el resultado de la validación y stats',() => {
    return statsAndValidate.statsAndValidate('../mdFiles/validate.md').then((res)=>{
     expect(res).toStrictEqual({ Total: 4, Unique: 4, Broken: 2, Ok: 1, Error: 1 })
   })
})
  
})

