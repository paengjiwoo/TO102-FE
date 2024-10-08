export type TLocation = {
  id: number;
  city: string;
  district: string;
  neighborhood?: string;
};

export const locations: TLocation[] = [
  { id: 1, city: '서울특별시', district: '강남구' },
  { id: 2, city: '서울특별시', district: '강동구' },
  { id: 3, city: '서울특별시', district: '강북구' },
  { id: 4, city: '서울특별시', district: '강서구' },
  { id: 5, city: '서울특별시', district: '관악구' },
  { id: 6, city: '서울특별시', district: '광진구' },
  { id: 7, city: '서울특별시', district: '구로구' },
  { id: 8, city: '서울특별시', district: '금천구' },
  { id: 9, city: '서울특별시', district: '노원구' },
  { id: 10, city: '서울특별시', district: '도봉구' },
  { id: 11, city: '서울특별시', district: '동대문구' },
  { id: 12, city: '서울특별시', district: '동작구' },
  { id: 13, city: '서울특별시', district: '마포구' },
  { id: 14, city: '서울특별시', district: '서대문구' },
  { id: 15, city: '서울특별시', district: '서초구' },
  { id: 16, city: '서울특별시', district: '성동구' },
  { id: 17, city: '서울특별시', district: '성북구' },
  { id: 18, city: '서울특별시', district: '송파구' },
  { id: 19, city: '서울특별시', district: '양천구' },
  { id: 20, city: '서울특별시', district: '영등포구' },
  { id: 21, city: '서울특별시', district: '용산구' },
  { id: 22, city: '서울특별시', district: '은평구' },
  { id: 23, city: '서울특별시', district: '종로구' },
  { id: 24, city: '서울특별시', district: '중구' },
  { id: 25, city: '서울특별시', district: '중랑구' },
];