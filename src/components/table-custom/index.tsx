import {Table, TableColumnsType, TableProps} from "antd";
import {renderSTT} from "utils";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import "./TableCustom.scss";
type Props = {
  dataSource: any[];
  columns: any[];
  isLoading?: boolean;
  onChangePagination?: (page: number, limit: number) => void;
  onDoubleClick?: (record: any, rowIndex: number) => void;
  onClick?: (record: any, rowIndex: any) => void;
  hideCheckboxCol?: boolean;
  total?: any;
  listActionButton?: any;
};
const TableCustom = forwardRef((props: Props & any, ref) => {
  const {
    isLoading,
    dataSource,
    columns,
    onChangePagination,
    pagination = true,
    onDoubleClick,
    onClick,
    hideCheckboxCol = false,
    className = [],
    total,
    listActionButton,
    ...rest
  } = props;
  const [page, setPage] = useState<any>(1);
  const [limit, setLimit] = useState<any>(10);
  if (columns?.find((e: {key: string}) => e?.key == "index")) {
    const indexCol = columns.find((e: {key: string}) => e?.key == "index");
    indexCol.render = (value: any, record: any, index: any) => {
      return <div>{renderSTT(index, page, limit)}</div>;
    };
    indexCol.title = "STT";
    indexCol.align = "center";
  }
  if (
    columns?.find((e: {key: string}) => e?.key == "action") &&
    listActionButton
  ) {
    const indexCol = columns.find((e: {key: string}) => e?.key == "action");
    indexCol.render = (value: any, record: any, index: any) => {
      return <>{listActionButton(value, record, index)}</>;
    };
  }

  useImperativeHandle(ref, () => ({
    setPage: (pageIndex: any) => {
      setPage(pageIndex);
    },
  }));

  return (
    <Table
      {...rest}
      className={`table-custom ${
        hideCheckboxCol ? "hide-checkbox-column" : ""
      } ${[...className]}`}
      bordered={true}
      loading={isLoading ?? false}
      dataSource={dataSource}
      columns={columns}
      pagination={
        pagination
          ? {
              current: page ?? 1,
              total: total ?? dataSource?.length,
              size: limit ?? 10,
              showSizeChanger: true,
              onChange: (_page, _limit) => {
                if (onChangePagination) {
                  onChangePagination(_page, _limit);
                }
                setPage(_page);
                setLimit(_limit);
              },
            }
          : false
      }
      onRow={(record, rowIndex) => {
        return {
          onClick: event => {
            if (onClick) {
              onClick(record, rowIndex);
            }
          }, // click row
          onDoubleClick: event => {
            if (onDoubleClick) {
              onDoubleClick(record, rowIndex);
            }
          }, // double click row
        };
      }}
    ></Table>
  );
});

export {TableCustom};
