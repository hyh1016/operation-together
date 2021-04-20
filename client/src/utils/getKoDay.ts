import dayjs from 'dayjs';

const KoDay = ['일', '월', '화', '수', '목', '금', '토'];

export default (date: string): string | undefined => {
  const dayIndex = dayjs(date).format('d');
  if (!/\d/.test(dayIndex)) return undefined;
  return KoDay[Number(dayjs(date).format('d'))];
};
