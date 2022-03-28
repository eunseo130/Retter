import types from "../types";

export const setMessage = (message) => {
  return {
    type: types.SET_MESSAGE,
    message,
  };
};

export const setTextIsVisible = () => {
  return {
    type: types.SET_TEXT_ISVISIBLE,
  };
};

export const setMenuStickerIsVisible = () => {
  return {
    type: types.SET_MENU_STICKER_ISVISIBLE,
  };
};

export const setMenuBackgroundIsVisible = () => {
  return {
    type: types.SET_MENU_BACKGROUND_ISVISIBLE,
  };
};

export const setMenuTextIsVisible = () => {
  return {
    type: types.SET_MENU_TEXT_ISVISIBLE,
  };
};

export const setBackgroundColor = (color) => {
  return {
    type: types.SET_BACKGROUND_COLOR,
    color,
  };
};

export const addSticker = (id) => {
  return {
    type: types.ADD_STICKER,
    id,
  };
};

export const removeSticker = (index) => {
  return {
    type: types.REMOVE_STICKER,
    index,
  };
};

export const setStickerPos = (index, x, y) => {
  return {
    type: types.SET_STICKER_POS,
    index,
    x,
    y,
  };
};