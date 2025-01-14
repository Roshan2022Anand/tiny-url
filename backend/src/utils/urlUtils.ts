import axios from "axios";

export const isValidUrl = async (url: string): Promise<Boolean> => {
  try {
    await axios.get(url);
    return true;
  } catch (err) {
    return false;
  }
};
