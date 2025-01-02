import {parseJson} from "utils";
import {v1 as randomId} from "uuid";
const renderSTT = (index: number, page: number, limit: number) => {
  return index + 1 + (page - 1) * limit;
};
const setItemLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("storage"));
};
const getItemLocalStorage = key => {
  return parseJson(localStorage.getItem(key));
};
const exportFile = async (data, nameFile, extension = "docx") => {
  try {
    console.log(data);
    var link = document.createElement("a");
    const url = window.URL.createObjectURL(data);
    link.href = url;
    link.download = `${nameFile}.${extension}`;
    link.click();
  } catch (error) {}
};
export {
  renderSTT,
  setItemLocalStorage,
  getItemLocalStorage,
  randomId,
  exportFile,
};
