import {Spin, Table, Tag} from "antd";
import {ListActionButton} from "components";
import React, {useEffect, useState} from "react";
import {useDeleteUnitMutation} from "../../../../redux/apiRtk/unit";
import {NotificationService, randomId, toArray} from "utils";

const ListUnit = props => {
  const {setRecord, listUnit, isFetching} = props;
  var dataTreeKeys: any[] = [];
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);
  const [deleteUnit, {isSuccess: isSuccessDelete, error: errorDelete}] =
    useDeleteUnitMutation();
  const [descendantTreeUnit, setDescendantTreeUnit] = useState<any>([]);
  const getDescendantTreeUnit = dataUnit => {
    const _dataUnit = {
      key: randomId(),
      _id: dataUnit?._id,
      name: dataUnit?.name,
      parent: dataUnit?.parent,
      probeId: dataUnit?.probeId,
      description: dataUnit?.description,
      children:
        toArray(dataUnit?.childs)?.length > 0
          ? toArray(dataUnit?.childs)?.map(e => getDescendantTreeUnit(e))
          : null,
    };
    return _dataUnit;
  };
  useEffect(() => {
    console.log(listUnit);
    const _descendantTreeUnit = getDescendantTreeUnit(listUnit);
    setDescendantTreeUnit([_descendantTreeUnit]);
  }, [listUnit]);
  useEffect(() => {
    dataTreeKeys = [];
    getAllKeysOfTreeData(descendantTreeUnit?.[0]);
    setExpandedRowKeys(dataTreeKeys);
  }, [descendantTreeUnit]);
  const getAllKeysOfTreeData = dataNode => {
    dataTreeKeys.push(dataNode?.key);
    toArray(dataNode?.children)?.forEach(e => {
      getAllKeysOfTreeData(e);
    });
  };

  const columns: any[] = [
    {
      title: "Đơn vị",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Thao tác",
      dataIndex: "action",
      width: 120,
      key: "action",
      align: "center",
      render: (value, record, index) => {
        return (
          <ListActionButton
            toolTips={{edit: "Sửa thông tin", add: "Thêm đơn vị con"}}
            editFunction={() => {
              setRecord(record);
            }}
            addFunction={() => {
              setRecord({parent: record._id});
            }}
            deleteFunction={() => {
              deleteUnit(record?._id);
            }}
          ></ListActionButton>
        );
      },
    },
  ];
  useEffect(() => {
    if (isSuccessDelete) {
      NotificationService.success("Xóa dữ liệu thành công");
    }
  }, [isSuccessDelete]);
  useEffect(() => {
    if (errorDelete) {
      NotificationService.error(
        `${errorDelete?.data?.message ?? "Đã có lỗi khi xóa"} `
      );
    }
  }, [errorDelete]);
  const onExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys(prev => [...prev, record.key]);
    } else {
      setExpandedRowKeys(prev => prev.filter(key => key !== record.key));
    }
  };
  return (
    <div className="oversee-lan container">
      <Table
        columns={columns}
        bordered
        loading={isFetching}
        dataSource={descendantTreeUnit}
        pagination={false}
        expandable={{
          expandedRowKeys,
          onExpand,
        }}
        rowKey="key"
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              // setRecord(record);
            },
            onDoubleClick: event => {
              setRecord(record);
            }, // double click row
            onContextMenu: event => {}, // right button click row
            onMouseEnter: event => {}, // mouse enter row
            onMouseLeave: event => {}, // mouse leave row
          };
        }}
      ></Table>
    </div>
  );
};
export default ListUnit;
