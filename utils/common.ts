import { TokenKey } from './contants';

import { v4 as uuidv4 } from 'uuid';

export const genUniqueId = () => {
  return uuidv4();
};

export const setToken = (value: string) => {
  window.localStorage.setItem(TokenKey.MainToken, value);
};

export const setLocalFullName = (value: string) => {
  window.localStorage.setItem(TokenKey.FullName, value);
};

export const setLocalUserName = (value: string) => {
  window.localStorage.setItem(TokenKey.UserName, value);
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

export const getLocalFullName = () => {
  return window.localStorage.getItem(TokenKey.FullName);
};

export const getLocalUserName = () => {
  return window.localStorage.getItem(TokenKey.UserName);
};

export const removeToken = () => {
  window.localStorage.removeItem(TokenKey.MainToken);
};

export const removeLocalUserName = () => {
  window.localStorage.removeItem(TokenKey.UserName);
};

export const removeLocalFullName = () => {
  window.localStorage.removeItem(TokenKey.FullName);
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
