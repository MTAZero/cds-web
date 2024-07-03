import {typeMeetingBook, typeMeetingBookText} from "types";

const renderTextSoGiaoBan = (type: string) => {
  console.log(type);
  let text = "";
  switch (type) {
    case typeMeetingBook.DOI:
      text = typeMeetingBookText.DOI;
      break;
    case typeMeetingBook.CUM:
      text = typeMeetingBookText.CUM;
      break;
    case typeMeetingBook.TRUNG_TAM:
      text = typeMeetingBookText.TRUNG_TAM;
      break;
    default:
      text = "";
  }
  console.log(text);
  return text;
};
export {renderTextSoGiaoBan};
