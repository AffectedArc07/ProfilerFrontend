import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons/lib/icons';
import { DM } from './datamanager';

export const ProcTable = () => {
  const [value, setValue] = useState();

  let cols = [
    { title: "Round ID", dataIndex: "rid", key: "rid", width: "20%" },
    { title: "Proc Path", dataIndex: "procpath", key: "procpath" },
    { title: null, dataIndex: "removal", key: "removal", width: 1, render: text => (
      <Button ghost icon={<CloseOutlined />} onClick={() => {
        DM.removeProc(text);
      }} />
    ) },
  ];

  DM.setTableState(setValue);

  return (
    <Table columns={cols} dataSource={DM.getTableData()} pagination={{ position: ["none", "none"] }} />
  );
};
