export const formatDate = (timestamp: string): string => {
  const date: Date = new Date(timestamp);
  const hours: string = date.getHours().toString().padStart(2, '0');
  const minutes: string = date.getMinutes().toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const year: string = date.getFullYear().toString();

  const now = new Date();
  const diff: number = Math.round((now.getTime() - date.getTime()) / 1000);

  let timeAgo: string = '';
  if (diff < 60) {
    timeAgo = `${diff} phút trước`;
  } else if (diff < 1440) {
    timeAgo = `${Math.round(diff / 60)} giờ trước`;
  } else {
    const monthsAgo =
      now.getMonth() -
      date.getMonth() +
      12 * (now.getFullYear() - date.getFullYear());
    timeAgo = `${monthsAgo} tháng trước`;
  }

  return `${hours}:${minutes}, ${day}, ${month}, ${year}`;
};

export const getTimeDiff = (timestamp: string): string => {
  const now: Date = new Date();
  const date: Date = new Date(timestamp);
  const diff: number = Math.round((now.getTime() - date.getTime()) / 1000); // get difference in seconds
  if (diff < 60) {
    return `${diff} giây trước`;
  } else if (diff < 3600) {
    const minutes = Math.round(diff / 60);
    // With English, we can fix the previous part of the condition to be plural to match the grammar (Ex: hours/hour).
    return `${minutes} ${minutes > 1 ? 'phút' : 'phút'} trước`;
  } else if (diff < 86400) {
    const hours = Math.round(diff / 3600);
    return `${hours} ${hours > 1 ? 'giờ' : 'giờ'} trước`;
  } else if (diff < 604800) {
    const days = Math.round(diff / 86400);
    return `${days} ${days > 1 ? 'ngày' : 'ngày'} trước`;
  } else if (diff < 2629746) {
    const weeks = Math.round(diff / 604800);
    return `${weeks} ${weeks > 1 ? 'tuần' : 'tuần'} trước`;
  } else {
    const years = Math.round(diff / 31556952);
    return `${years} ${years > 1 ? 'năm' : 'năm'} trước`;
  }
};
