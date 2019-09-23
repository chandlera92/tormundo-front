import { DateToDaysPipe } from './date-to-days.pipe';

describe('DateToDaysPipe', () => {
  it('create an instance', () => {
    const pipe = new DateToDaysPipe();
    expect(pipe).toBeTruthy();
  });
});
