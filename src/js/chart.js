import React, { useState } from 'react';
import { Line } from '@ant-design/charts';
import { DM } from './datamanager';
import { Divider, Radio } from 'antd';

export const ProcChart = () => {
  const [value, setValue] = useState();
  const [filterType, setFilterType] = useState("calls");

  DM.setChartState(setValue);

  let clean_ft = filterType;
  let titlecase_filter = clean_ft.charAt(0).toUpperCase() + clean_ft.slice(1);

  const config = {
    data: DM.getChartData(filterType),
    height: 600,
    xField: 'sampleid',
    yField: 'data',
    seriesField: 'series',
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      title: x => titlecase_filter + " over time (Sample " + x + ")",
    },
  };

  return (
    <>
      <Line {...config} style={{ marginLeft: "5px" }} />
      <Divider plain />
      <Radio.Group onChange={e => setFilterType(e.target.value)} value={filterType}>
        <Radio value={"calls"}>Calls</Radio>
        <Radio value={"self"}>Self CPU</Radio>
        <Radio value={"total"}>Total CPU</Radio>
        <Radio value={"real"}>Real Time</Radio>
        <Radio value={"over"}>Overtime</Radio>
      </Radio.Group>
      <br />
    </>
  );
};
