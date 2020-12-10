import { Time } from '../src/utils/Time';

describe('Utils', () => {
  test('Convert ms to date', () => {
    const ms = 1607365446;
    const date = Time.msToDate(ms);

    expect(date).toBe('2020-12-07T18:24:06.000Z');
  });
});
