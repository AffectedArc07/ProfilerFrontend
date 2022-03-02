import React from 'react';
import { Divider, Row, Col } from 'antd';
import { ProcTable } from './proctable';
import { EntryBox } from './entrybox';
import { ProcChart } from './chart';

export const Layout = () => {
  return (
    <Row style={{ "paddingTop": "50px" }}>
      <Col span={3} />
      <Col span={6}>
        <ProcTable />
        <EntryBox />
        <Divider plain />
        <i>Page by AA07. <a href="https://github.com/AffectedArc07/ProfilerFrontend">Source + Issue Reporting</a></i>
      </Col>
      <Col span={10}>
        <ProcChart />
        <i>Samples are taken every 5 minutes. One round may have more samples than another due to round length.</i>
      </Col>
      <Col span={3} />
    </Row>
  );
};
