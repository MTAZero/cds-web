import {Spin} from "antd";
import PdfViewer from "components/pdf-viewer";
import React, {useEffect, useState} from "react";
import {APIServices} from "utils";
const ModalPdf = props => {
  const [loading, setLoading] = useState(false);
  const {base64} = props;
  useEffect(() => {
    console.log(base64);
  }, [base64]);
  return (
    <div style={{height: "100%"}}>
      <Spin spinning={loading}>
        <PdfViewer
          base64={base64}
          style={{maxHeight: "calc(100vh - 100px)"}}
        ></PdfViewer>
      </Spin>
    </div>
  );
};
export default ModalPdf;
