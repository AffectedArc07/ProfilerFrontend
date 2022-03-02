import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { Divider, Row, Col, Button, InputNumber, AutoComplete } from 'antd';
import { DM } from './datamanager';
import React, { useState } from 'react';

export const EntryBox = () => {
  const [options, setOptions] = useState([]);
  const [valuePPath, setValuePPath] = useState('');
  const [valueRID, setValueRID] = useState(0);

  const onSearch = async searchText => {
    setOptions(await DM.getSearchSuggestions(searchText));
  };

  const onSelectPPath = data => {
    setValuePPath(data);
  };

  const onChangeRID = value => {
    setValueRID(value);
  };

  return (
    <>
      <Divider plain />
      <Row>
        <Col span={5}>
          <InputNumber placeholder="Round ID" onChange={onChangeRID} />
        </Col>
        <Col span={17}>
          <AutoComplete
            options={options}
            onSearch={onSearch}
            onSelect={onSelectPPath}
            onChange={onSelectPPath}
            style={{ width: "100%" }}
            placeholder="/type/proc/procname"
          />
        </Col>
        <Col span={2}>
          <Button icon={<PlusOutlined />} onClick={() => DM.addProc(valueRID, valuePPath)} />
        </Col>
      </Row>
    </>
  );
};
