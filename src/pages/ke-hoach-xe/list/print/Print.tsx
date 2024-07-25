import "./Print.scss";
import {TableCustom} from "components";

import {columns} from "./config";
const Print = props => {
  const {dataSource, listUnit} = props;

  return (
    <div className="print-ke-hoach-xe" style={{pageBreakAfter: "always"}}>
      <table>
        <thead style={{height: "24mm"}}></thead>
        <tbody>
          <TableCustom
            className={["table-print"]}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          ></TableCustom>
        </tbody>
        <tfoot style={{height: "20mm"}}></tfoot>
      </table>
    </div>
  );
};
export default Print;
