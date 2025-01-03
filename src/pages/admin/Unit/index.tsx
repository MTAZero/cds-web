import React, {useEffect, useRef, useState} from "react";

import {Button, Col, Form, Row} from "antd";
import ListUnit from "./ListUnit/ListUnit";
import {useGetUnitTreeQuery} from "../../../redux/apiRtk/unit";
import {useAppSelector} from "hooks";
import FormUnit from "./FormUnit/FormUnit";
const Unit = () => {
  const [record, setRecord] = useState(null);
  const unitOfUser = useAppSelector(state => state.auth.info.unit);
  const {data: dataUnit, isFetching: isFetchingUnit} =
    useGetUnitTreeQuery(unitOfUser);
  console.log(dataUnit);
  return (
    <div className="page">
      <div className="main">
        <div>
          <Row justify={"space-between"} gutter={[8, 8]}>
            <Col span={12}>
              <ListUnit
                setRecord={setRecord}
                listUnit={dataUnit}
                isFetching={isFetchingUnit}
              ></ListUnit>
            </Col>
            <Col span={12}>
              <FormUnit record={record} listUnit={dataUnit}></FormUnit>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Unit;
