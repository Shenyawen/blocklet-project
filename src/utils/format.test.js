import { div, plus, formatSAT2Btc, formatDate, thousandFormat } from './format';

describe('format thousandFormat', () => {
  it('test thousandFormat => empty', () => {
    expect(thousandFormat()).toBe('0');
  });
  it('test thousandFormat => 999', () => {
    expect(thousandFormat(999)).toBe('999');
  });
  it('test thousandFormat => 9999', () => {
    expect(thousandFormat(9999)).toBe('9,999');
  });
});

describe('format formatDate', () => {
  it('test formatDate => 1608620982', () => {
    expect(formatDate(1608620982)).toBe('2020/12/22 15:09:42');
  });
});

describe('format div', () => {
  it('test div => 1000 10', () => {
    expect(div(1000, 10)).toBe('100');
  });
});

describe('format plus', () => {
  it('test plus => 1000 10', () => {
    expect(plus(1000, 10)).toBe('1010');
  });
});

describe('format formatSAT2Btc', () => {
  it('test formatSAT2Btc =>  641583560', () => {
    expect(formatSAT2Btc(641583560)).toBe('6.4158356');
  });
});
