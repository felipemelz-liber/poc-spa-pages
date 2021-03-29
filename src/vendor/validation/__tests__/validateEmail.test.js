import validateEmail from '../validateEmail';

describe('Testing Email validation', () => {
  it('Should return false for an invalid email', () => {
    expect(validateEmail('@test@test.com')).toBeFalsy();
  });
  it('Should return true for a valid email', () => {
    expect(validateEmail('test@test.com')).toBeTruthy();
  });
  it('Should validate email with +', () => {
    expect(validateEmail('test+extra@test.com')).toBeTruthy();
  });
});
