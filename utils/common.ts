import { TokenKey } from './contants';

import { v4 as uuidv4 } from 'uuid';

export const genUniqueId = () => {
  return uuidv4();
};

export const setToken = (value: string) => {
  window.localStorage.setItem(TokenKey.MainToken, value);
};

export const isAuthentication = () => {
  if (window.localStorage.getItem(TokenKey.MainToken)) {
    return true;
  }
  return false;
};

export const getToken = () => {
  return window.localStorage.getItem(TokenKey.MainToken);
};

export const removeToken = () => {
  window.localStorage.removeItem(TokenKey.MainToken);
};

export const isValidLang = (lang) => {
  if (['en', 'vi', 'zh', 'ko', 'ja'].includes(lang)) {
    return true;
  }

  return false;
};

export const chunkCustomArray = (arr: Array<any>, size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
};

export const triggerOnChangeEvent = (window, node: any, value: string = '', callback = null) => {
  if (!!window) {
    const inputTypes = [window.HTMLInputElement, window.HTMLSelectElement, window.HTMLTextAreaElement];

    if (inputTypes.indexOf(node.__proto__.constructor) > -1) {
      const setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set;
      const event = new Event('input', { bubbles: true });

      setValue.call(node, value);
      node.dispatchEvent(event);
      if (!!callback) {
        callback(event);
      }
    }
  }
};

export const getWindowSize = () => {
  if (typeof window !== 'undefined') {
    return {
      width: window.outerWidth,
      height: window.outerHeight,
    } as IWindowSize;
  }

  return undefined;
};
