export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`
};

export const formatDistanceToNow = (dateString: string) => {
  const now: Date = new Date();
  const pastDate: Date = new Date(dateString);
  const seconds: number = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const intervals = [
    { label: '초', seconds: 60 },          // 1분 = 60초
    { label: '분', seconds: 3600 },        // 1시간 = 60분 = 3600초
    { label: '시간', seconds: 86400 },     // 1일 = 24시간 = 86400초
    { label: '일', seconds: 2592000 },    // 1개월 = 30일 = 2592000초
    { label: '개월', seconds: 31536000 }   // 1년 = 365일 = 31536000초
  ];

  for (let i = 4; i >= 0; i--) {
    const intervalValue = Math.floor(seconds / intervals[i].seconds)
    if (intervalValue >= 1) {
      return `${intervalValue}${intervals[i].label} 전`
    }
  }
  return '방금 전';
}