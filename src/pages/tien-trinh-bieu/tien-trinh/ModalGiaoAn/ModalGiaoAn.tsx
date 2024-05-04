import PdfViewer from "components/pdf-viewer";
import React, {useEffect, useState} from "react";
import {isValuable} from "utils";
const ModalGiaoAn = (props: any) => {
  const [idFile, setIdFile] = useState(null);
  const [blob, setBlob] = useState();
  const getBlobOfFile = async (id: string | number | null) => {
    try {
      // const res = await vanKienService.getFile(id);
      // setBlob(res);
    } catch (error) {}
  };
  useEffect(() => {
    if (isValuable(idFile)) {
      getBlobOfFile(idFile);
    }
  }, [idFile]);
  return <PdfViewer blob={blob}></PdfViewer>;
};
export default ModalGiaoAn;
