type ChineseZodiacRange = {
  start: string; // YYYY-MM-DD
  end: string;
  zodiac: string;
};

const ZODIAC_RANGES: ChineseZodiacRange[] = [
  { start: '2023-01-22', end: '2024-02-09', zodiac: 'Rabbit' },
  { start: '2022-02-01', end: '2023-01-21', zodiac: 'Tiger' },
  { start: '2021-02-12', end: '2022-01-31', zodiac: 'Ox' },
  { start: '2020-01-25', end: '2021-02-11', zodiac: 'Rat' },
  { start: '2019-02-05', end: '2020-01-24', zodiac: 'Pig' },
  { start: '2018-02-16', end: '2019-02-04', zodiac: 'Dog' },
  { start: '2017-01-28', end: '2018-02-15', zodiac: 'Rooster' },
  { start: '2016-02-08', end: '2017-01-27', zodiac: 'Monkey' },
  { start: '2015-02-19', end: '2016-02-07', zodiac: 'Goat' },
  { start: '2014-01-31', end: '2015-02-18', zodiac: 'Horse' },
  { start: '2013-02-10', end: '2014-01-30', zodiac: 'Snake' },
  { start: '2012-01-23', end: '2013-02-09', zodiac: 'Dragon' },
  // 👉 tambahkan sisanya kalau mau full
];

export function calculateZodiac(date: Date): string {
  const target = date.getTime();

  for (const range of ZODIAC_RANGES) {
    const start = new Date(range.start).getTime();
    const end = new Date(range.end).getTime();

    if (target >= start && target <= end) {
      return range.zodiac;
    }
  }

  return 'Unknown';
}
