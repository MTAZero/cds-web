import React from "react";
import {useGetFileQuery} from "../../../redux/apiRtk/uploadFile";
import PdfViewer from "components/pdf-viewer";
type Props = {
  fileId: any;
};
const ModalViewFile = (props: Props) => {
  const {fileId} = props;
  const {data: dataFile, isSuccess: isSuccessFile} = useGetFileQuery(fileId);
  return (
    <div>
      <PdfViewer base64={dataFile as Blob}></PdfViewer>
    </div>
  );
};
export default ModalViewFile;
