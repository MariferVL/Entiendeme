import { example, anotherExample } from '../src/data.js';

//Testeo
//  TODO:Pasa linter (npm run pretest)
//  TODO: Crear testsssss
//  TODO:Pasa tests (npm test)
// TODO: Pruebas unitarias cubren un mínimo del 70% de statements, functions y lines y branches.

describe('example', () => {
  it('is a function', () => {
    expect(typeof example).toBe('function');
  });

  it('returns `example`', () => {
    expect(example()).toBe('example');
  });
});


describe('anotherExample', () => {
  it('is a function', () => {
    expect(typeof anotherExample).toBe('function');
  });

  it('returns `anotherExample`', () => {
    expect(anotherExample()).toBe('OMG');
  });
});
