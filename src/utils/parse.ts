import dayjs from "dayjs";
import {formatTime} from "types";
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
  format: formatTime | string | null = null
) => {
  const validDate = dayjs(date?.toString())?.isValid();
  return date && validDate
    ? format
      ? format == formatTime.unix
        ? dayjs(date?.toString()).unix()
        : dayjs(date?.toString()).format(format as any)
      : dayjs(date?.toString()).format()
    : null;
};

const convertDateStringToDateObject = (
  dateString: string | null,
  unix = false
) => {
  return dateString && dayjs(dateString)?.isValid()
    ? unix
      ? dayjs.unix(toNumber(dateString))
      : dayjs(dateString)
    : null;
};
const toNumber = value => {
  return !isNaN(value) ? Number(value) : 0;
};
const convertBase64ToFile = (
  base64,
  name = "file",
  type = "application/pdf"
) => {
  const file = new File(
    [Uint8Array.from(atob(base64), m => m.codePointAt(0))],
    name,
    {type: type}
  );
  return file;
};
const convertFileToBase64 = file => {
  return new Promise<void>((resolve, reject) => {
    var filereader = new FileReader();
    let base64;
    filereader.readAsDataURL(file);
    filereader.onload = function (evt) {
      var result = evt.target.result;
      console.log(result);
      base64 = result?.toString().replace("data:application/pdf;base64,", "");
      resolve(base64);
    };
  });
};
const convertObjectToFormData = object => {
  let formData = new FormData();
  for (const key in object) {
    formData.append(key, object[key]);
  }
  return formData;
};
export {
  serialize,
  parseJson,
  toArray,
  formatDateToString,
  convertDateStringToDateObject,
  toNumber,
  convertBase64ToFile,
  convertFileToBase64,
  convertObjectToFormData,
};
