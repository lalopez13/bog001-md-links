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
    href: 'https://www.airbnb.com.co/s/404',
    text: 'Broken Link',
    file: './test.md/z.md'
  },
  {
    href: 'https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises',
    text: 'Consumo de Promesas.',
    file: './test.md/z.md'
  },
  {
    href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
    text: 'Creación de Promesas.',
    file: './test.md/z.md'
  }
]
// Validated Links
const validateMdLinks =
[
  {
    href: 'https://www.airbnb.com.co/s/404',
    text: 'Broken Link',
    file: './test.md/y.md',
    code: 404,
    status: 'Not Found'
  },
  {
    href: 'https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises',
    text: 'Consumo de Promesas.',
    file: './test.md/y.md',
    code: 200,
    status: 'OK'
  },
  {
    href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/',
    text: 'Creación de Promesas.',
    file: './test.md/y.md',
    code: 200,
    status: 'OK'
  },
  {
    href: 'htt://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96a9cc5593715a6.jpg',
    text: 'md-links',
    file: './test.md/y.md',
    code: undefined
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
    process.stdout.write('The entered route does not exist, try again with a valid route.');
    fileRoute.pathExist('../noLiks.md');
    expect(mockStdout).toHaveBeenCalledWith('The entered route does not exist, try again with a valid route.');
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
    expect(readFileOrDir('./test.md/x.md')).toHaveLength(1);;
  }); 
  it('Debería retornar un array con los archivos si es un directorio', () => {
    expect(readFileOrDir('./test.md')).toHaveLength(4);
  }); 
});

// Get the Links
describe('getLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof getLinks.getLinks).toBe('function');
  }); 
    it('Debería retornar un objeto con los links del archivo', () => {
      expect(getLinks.getLinks('./test.md/z.md')).toStrictEqual(fileMdLinks);
    });  
  it('Debería salir si el archivo no tiene links', () => {
    // const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockStdout = mockProcess.mockProcessStdout();
    process.stdout.write('There are no links in this file');
    getLinks.getLinks('./test.md/noLinks.md');
    expect(mockStdout).toHaveBeenCalledWith('There are no links in this file');
  });  
})

// Validate the links
describe('validate', () => {
  it('Debería ser una función', () => {
    expect(typeof validate.validate).toBe('function');
  }); 
  it('Debería mostrar en consola el resultado de la validación',() => {
   return validate.validate('./test.md/y.md').then((res)=>{
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
    expect(stats.stats('./test.md/z.md')).toStrictEqual({ Total: 3, Unique: 3 });
  }); 
})

//Stats & Validate Links
describe('validate', () => {
  it('Debería ser una función', () => {
    expect(typeof statsAndValidate.statsAndValidate).toBe('function');
  }); 
  it('Debería mostrar en consola el resultado de la validación y stats',() => {
    return statsAndValidate.statsAndValidate('./test.md/y.md').then((res)=>{
     expect(res).toStrictEqual({ Total: 4, Unique: 4, Broken: 1, Ok: 2, Error: 1 })
   })
})
  
})

