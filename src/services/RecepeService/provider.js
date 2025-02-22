import axios from "axios";
import { URL_RECIPES_BY_LETTER } from "@/constants";

export const getRecipensByLetter = async () => {
  const data = await axios.get(URL_RECIPES_BY_LETTER);
  return data?.data?.meals;
}