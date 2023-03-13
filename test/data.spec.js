import { filterData, sortData, computeStats } from "../src/js/data";


describe('filterData', () => {
  it('is a function', () => {
    expect(typeof filterData).toBe('function');
  });

  it('should returns false for "Condicion"', () => {
    expect(filterData('Capricorn', 'condicion')).toBe(false);
  });

  it('should returns true for "element"', () => {
    expect(filterData('Capricorn', 'element')).toBe(true);
  });

  it('should returns true for "generation"', () => {
    expect(filterData('Capricorn', 'generation')).toBe(true);
  });

  it('should returns true for "celebrities"', () => {
    expect(filterData('Capricorn', 'celebrities')).toBe(true);
  });

});

describe('sortData', () => {
  it('sortData should be a function', () => {
    expect(typeof sortData).toBe('function');
  });

  it('should show ["Harry Styles", "Bob Marley"] as namesArray', () => {
    expect(sortData("Acuarius", "Canto", "")).toStrictEqual(["Harry Styles", "Bob Marley"]);
  });

  it('should show ["Bob Marley", "Harry Styles"] as namesArray', () => {
    expect(sortData("Acuarius", "Canto", "A-Z")).toStrictEqual(["Bob Marley", "Harry Styles"]);
  });

  it('should show ["Harry Styles", "Bob Marley"] as namesArray', () => {
    expect(sortData("Acuarius", "Canto", "Z-A")).toStrictEqual(["Harry Styles", "Bob Marley"]);
  });

  it('should show ["Bob Marley", "Harry Styles"] as namesArray', () => {
    expect(sortData("Acuarius", "Canto", "A-Z")).toStrictEqual(["Bob Marley", "Harry Styles"]);
  });

});


describe('computeStats', () => {
  it('is a function', () => {
    expect(typeof computeStats).toBe('function');
  });

  it('returns {"Canto": 33.3, "Actuación": 50.0, "Deporte": 16.7}', () => {
    expect(computeStats("", "signStat", "Capricorn")).toBe({ "Canto": 33.3, "Actuación": 50.0, "Deporte": 16.7 });
  });

  it('returns {"Canto": 55.6, "Actuación": 38.9, "Deporte": 5.6}', () => {
    expect(computeStats("", "elementStat", "Capricorn")).toBe({ "Canto": 55.6, "Actuación": 38.9, "Deporte": 5.6 });
  });

});