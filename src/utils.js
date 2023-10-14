import { MOCK_TODOES } from "../constants.js";

export const lowerCase = (text) => text.toLowerCase();

export const indexId = (index) =>
  MOCK_TODOES.findIndex((finded) => finded.id === Number(index));
