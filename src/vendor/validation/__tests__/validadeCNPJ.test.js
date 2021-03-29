import validateCNPJ from '../validateCNPJ';

describe('Testing CNPJ validation', () => {
  it('Should return false if lenght is != 14', () => {
    expect(validateCNPJ('0')).toBeFalsy();
  });
  it('should return false when testing know invalid CNPJ', () => {
    expect(validateCNPJ('00000000000000')).toBeFalsy();
  });
  it('should return false when testing an invalid cnpj', () => {
    expect(validateCNPJ('65.981.607/0001-00')).toBeFalsy();
  });
  it('should return true when testing a valid cnpj', () => {
    expect(validateCNPJ('65.981.607/0001-45')).toBeTruthy();
  });
});
