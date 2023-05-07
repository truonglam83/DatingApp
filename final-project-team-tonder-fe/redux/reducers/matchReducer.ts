import { http } from '@/utils/config';

export const createMatch = async (matchUserId: string) => {
  try {
    const res = await http.post(`/match/`, {
      id: matchUserId,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMatchedUserByUserId = async () => {
  try {
    const res = await http.get(`/match/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getIsMatchedUser = async (matchUserId: string) => {
  try {
    const res = await http.post(`/match/is-match`, {
      matchUserId: matchUserId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
