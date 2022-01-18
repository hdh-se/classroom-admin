export const getLocalString = (isoDateTimeStr: string) => {
  const time = new Date(isoDateTimeStr);

  return time.toLocaleString();
};

export const getLocaleDateString = (isoDateTimeStr: string) => {
  const time = new Date(isoDateTimeStr);

  return time.toLocaleDateString();
};

export const getLocaleTimeString = (isoDateTimeStr: string) => {
  const time = new Date(isoDateTimeStr);

  return time.toLocaleDateString();
};
