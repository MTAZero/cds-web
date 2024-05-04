import dayjs from "dayjs";
const serialize = (obj: any) => {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      if (obj[p] || obj[p] === 0)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
const parseJson = (str: any) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};
const toArray = (data: any) => {
  if (Array.isArray(data)) {
    return data;
  } else {
    return [];
  }
};
const formatDateToString = (
  date: Object | string | null,
  format: string | null = null
) => {
  const validDate = dayjs(date?.toString())?.isValid();
  return date && validDate
    ? format
      ? dayjs(date?.toString()).format(format as any)
      : dayjs(date?.toString()).format()
    : null;
};

const convertDateStringToDateObject = (dateString: string | null) => {
  return dateString && dayjs(dateString)?.isValid() ? dayjs(dateString) : null;
};
const toNumber = value => {
  return !isNaN(value) ? Number(value) : 0;
};
export {
  serialize,
  parseJson,
  toArray,
  formatDateToString,
  convertDateStringToDateObject,
  toNumber,
};
