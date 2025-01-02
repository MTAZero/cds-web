import {Tag} from "antd";
import React, {useEffect, useState} from "react";
import {syllabusStatus} from "types";
const SyllabusStatus = props => {
  const {status} = props;
  const [color, setColor] = useState<any>();
  useEffect(() => {
    const _setColor = status => {
      let _color = "";
      switch (status) {
        case syllabusStatus.DANG_XAY_DUNG:
          _color = "#EB2D4B";
          break;
        case syllabusStatus.DA_XAY_DUNG:
          _color = "#FAAD14";
          break;
        case syllabusStatus.DA_PHE_DUYET:
          _color = "#141ED2";
          break;
        case syllabusStatus.DA_THONG_QUA:
          _color = "#00B335";
          break;

        default:
          break;
      }
      setColor(_color);
    };
    _setColor(status);
  }, [status]);

  return <Tag color={color}>{status}</Tag>;
};
export default SyllabusStatus;
