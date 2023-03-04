import { filterData, sortData, computeStats } from "../src/js/data";
import celebrities from "../src/data/celebrities";


//Testeo
//  TODO:Pasa linter (npm run pretest)
//  TODO: Crear testsssss
//  TODO:Pasa tests (npm test)
// TODO: Pruebas unitarias cubren un mínimo del 70% de statements, functions y lines y branches.

/* describe('example', () => {
  it('is a function', () => {
    expect(typeof example).toBe('function');
  });

  it('returns `example`', () => {
    expect(example()).toBe('example');
  });
}); */



describe('filterData', () => {
  it('is a function', () => {
    expect(typeof filterData).toBe('function');
  });

  it('should returns false for "Condicion"', () => {
    expect(filterData('Capricorn', 'condicion')).toBe(false);
  });

  it('should returns true for "element"', () => {
    expect(filterData('Capricorn','element')).toBe(true);
  });

  it('should returns true for "generation"', () => {
    expect(filterData('Capricorn','generation')).toBe(true);
  });

  it('should returns true for "celebrities"', () => {
    expect(filterData('Capricorn','celebrities')).toBe(true);
  });
});

describe('sortData', () => {
  it('sortData should be a function', () => {
    expect(typeof sortData).toBe('function');
  });

  it('namesArray should be array', () => {
    expect(typeof namesArray).toBe("array");
  });

  it('is a function', () => {
    expect(typeof data).toBe('object');
  });

  
});
/*   it('should show ["Harry Styles", "Bob Marley"] as namesArray', () => {
    expect(sortData("Acuarius", "Canto", "")).toBe(["Harry Styles", "Bob Marley"]);
  });

  it('should show ["Bob Marley", "Harry Styles"] as namesArray', () => {
    expect(sortData("Acuarius", "Canto", "A-Z")).toBe(["Bob Marley", "Harry Styles"]);
  });

  it('should show ["Harry Styles", "Bob Marley"] as namesArray', () => {
    expect(sortData("Acuarius", "Canto", "Z-A")).toBe(["Harry Styles", "Bob Marley"]);
  }); */


describe('computeStats', () => {
  it('is a function', () => {
    expect(typeof computeStats).toBe('function');
  });

  it('returns {"Canto": 33.3, "Actuación": 50.0, "Deporte": 16.7}', () => {
    expect(computeStats(celebrities, "signStat", "Capricorn" )).toBe({"Canto": 33.3, "Actuación": 50.0, "Deporte": 16.7});
  });

  it('returns {"Canto": 55.6, "Actuación": 38.9, "Deporte": 5.6}', () => {
    expect(computeStats(celebrities, "elementStat", "Capricorn" )).toBe({"Canto": 55.6, "Actuación": 38.9, "Deporte": 5.6});
  });
});


