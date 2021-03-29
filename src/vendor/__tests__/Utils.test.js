import sinon from 'sinon';

import {
  convertToCamelCase,
  isCNPJ,
  isCPF,
  cleanTaxNumber,
  formatTaxNumber,
  dispatchAmplitudeEvent,
  formatCnpjOrCpf,
} from '../Utils';

describe('vendor Utils tests', () => {
  const logEvent = sinon.spy();

  beforeAll(() => {
    global.amplitude = { logEvent };
  });

  afterEach(() => {
    sinon.resetHistory();
  });

  it('should convert shallow object to camel case', () => {
    const input = {
      one_key: 'hello',
      another_key: 'world',
    };
    const expectedOutput = {
      oneKey: 'hello',
      anotherKey: 'world',
    };
    expect(convertToCamelCase(input)).toEqual(expectedOutput);
  });

  it('should convert multilevel objects to camel case, including arrays', () => {
    let input = {
      one_key: {
        another_key: 'hello',
      },
    };
    let expectedOutput = {
      oneKey: {
        anotherKey: 'hello',
      },
    };
    expect(convertToCamelCase(input)).toEqual(expectedOutput);

    input = {
      one_key: {
        another_key: 'hello',
      },
      array_key: ['a', 'b', 'c'],
    };
    expectedOutput = {
      oneKey: {
        anotherKey: 'hello',
      },
      arrayKey: ['a', 'b', 'c'],
    };
    expect(convertToCamelCase(input)).toEqual(expectedOutput);

    input = {
      one_key: {
        another_key: 'hello',
      },
      array_key: [
        {
          nested_key: 'a',
          another_nested_key: 'b',
        },
        {
          nested_key: 'c',
          another_nested_key: 'd',
        },
      ],
    };
    expectedOutput = {
      oneKey: {
        anotherKey: 'hello',
      },
      arrayKey: [
        {
          nestedKey: 'a',
          anotherNestedKey: 'b',
        },
        {
          nestedKey: 'c',
          anotherNestedKey: 'd',
        },
      ],
    };
    expect(convertToCamelCase(input)).toEqual(expectedOutput);

    input = {
      one_key: {
        another_key: 'hello',
      },
      array_key: [
        {
          nested_key: 'a',
          another_nested_key: 'b',
          nested_array: [
            {
              nested_key: 'a',
              another_nested_key: 'b',
            },
            {
              nested_key: 'c',
              another_nested_key: 'd',
            },
          ],
        },
        {
          nested_key: 'c',
          another_nested_key: 'd',
          nested_array: [
            {
              nested_key: 'a',
              another_nested_key: 'b',
            },
            {
              nested_key: 'c',
              another_nested_key: 'd',
            },
          ],
        },
      ],
    };
    expectedOutput = {
      oneKey: {
        anotherKey: 'hello',
      },
      arrayKey: [
        {
          nestedKey: 'a',
          anotherNestedKey: 'b',
          nestedArray: [
            {
              nestedKey: 'a',
              anotherNestedKey: 'b',
            },
            {
              nestedKey: 'c',
              anotherNestedKey: 'd',
            },
          ],
        },
        {
          nestedKey: 'c',
          anotherNestedKey: 'd',
          nestedArray: [
            {
              nestedKey: 'a',
              anotherNestedKey: 'b',
            },
            {
              nestedKey: 'c',
              anotherNestedKey: 'd',
            },
          ],
        },
      ],
    };
    expect(convertToCamelCase(input)).toEqual(expectedOutput);
  });

  it('isCnpj should test cnpj correctly with and without formatting', () => {
    const validCases = ['15.146.609/0001-40', '15146609000140'];
    const wrongCases = ['15.146.609/0001a4009', '15.146sdf.609/0001-40'];

    validCases.forEach(testCase => expect(isCNPJ(testCase)).toBeTruthy());

    wrongCases.forEach(testCase => expect(isCNPJ(testCase)).toBeFalsy());
  });

  it('isCPF should test cpf correctly with and without formatting', () => {
    const validCases = ['641.742.550-91', '64174255091'];
    const wrongCases = ['641.742.550a91', '641742550a1'];

    validCases.forEach(testCase => expect(isCPF(testCase)).toBeTruthy());

    wrongCases.forEach(testCase => expect(isCPF(testCase)).toBeFalsy());
  });

  it('cleanTaxNumber should remove cpf formatting', () => {
    const validCpf = '641.742.550-91';
    const cpfExpectedOutput = '64174255091';
    const validCnpj = '15.146.609/0001-40';
    const cnpjExpectedOutput = '15146609000140';

    expect(cleanTaxNumber(validCpf)).toEqual(cpfExpectedOutput);
    expect(cleanTaxNumber(validCnpj)).toEqual(cnpjExpectedOutput);
  });

  it('formatTaxNumber should remove cpf formatting', () => {
    const validCpf = '641.742.550-91';
    const cpfExpectedOutput = '64174255091';
    const validCnpj = '15.146.609/0001-40';
    const cnpjExpectedOutput = '15146609000140';

    expect(formatTaxNumber(validCpf)).toEqual(cpfExpectedOutput);
    expect(formatTaxNumber(validCnpj)).toEqual(cnpjExpectedOutput);
    expect(formatTaxNumber(null)).toEqual(null);
  });

  it('should dispatch amplitude event', () => {
    const eventName = 'test_event';

    dispatchAmplitudeEvent(eventName);

    expect(logEvent.calledWith(eventName)).toBeTruthy();
  });

  it('should dispatch amplitude event with custom properties', () => {
    const eventName = 'test_event';
    const properties = { someProp: 'mock1', anotherProp: 'mock2' };

    dispatchAmplitudeEvent(eventName, properties);

    expect(logEvent.calledWith(eventName, properties)).toBeTruthy();
  });

  it('should not dispatch amplitude event if no event name is given', () => {
    dispatchAmplitudeEvent();

    expect(logEvent.called).toBeFalsy();
  });

  it('should format CPF correctly given a full number CPF, as string or number', () => {
    const unformattedCpf = 11122233344;
    const unformattedCpfAsString = '11122233344';
    const expectedResult = '111.222.333-44';

    expect(formatCnpjOrCpf(unformattedCpf)).toBe(expectedResult);
    expect(formatCnpjOrCpf(unformattedCpfAsString)).toBe(expectedResult);
  });

  it('should format CNPJ correctly given a full number CNPJ, as string or number', () => {
    const unformattedCnpj = 11222333444455;
    const unformattedCnpjAsString = '11222333444455';
    const expectedResult = '11.222.333/4444-55';

    expect(formatCnpjOrCpf(unformattedCnpj)).toBe(expectedResult);
    expect(formatCnpjOrCpf(unformattedCnpjAsString)).toBe(expectedResult);
  });

  it('should return same value if its not CPF or CNPJ when attempting to format', () => {
    const randomValues = [100, 'nonCpfOrCnpj', '234', {}, [2, 4]];
    randomValues.forEach(value => expect(formatCnpjOrCpf(value)).toBe(value));
  });
});
