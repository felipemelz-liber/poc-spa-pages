import validateCPF from '../validateCPF';

describe('Testing CPF validation', () => {
  it('Should return false if lenght is != 11', () => {
    expect(validateCPF('0')).toBeFalsy();
  });
  it('should return false when testing know invalid cpf', () => {
    expect(validateCPF('12345678909')).toBeFalsy();
  });
  it('should return false when testing an invalid cpf', () => {
    expect(validateCPF('353.303.234-19')).toBeFalsy();
  });
  it('should return true when testing a valid cpf', () => {
    expect(validateCPF('353.383.234-19')).toBeTruthy();
  });
});
