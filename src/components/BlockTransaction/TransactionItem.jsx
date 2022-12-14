/* eslint-disable unicorn/filename-case */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { Row, Col, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

function TransactionItemCells({ source = [] }) {
  return (
    <div className="transaction-item__row__cells">
      {source?.map(({ prev_out, addr, value }) => {
        // prev_out有值则表示from, 否则是to
        return (
          <Row className="transaction-item__row__cell" justify="space-between">
            <Col lg={15}>
              <Typography.Link
                href={`https://www.blockchain.com/btc/address/${addr || prev_out?.addr}`}
                target="_blank">
                {addr || prev_out?.addr}
              </Typography.Link>
            </Col>
            <Col className="transaction-item__row__cell__value" style={{ color: prev_out ? 'red' : 'green' }}>
              {value || prev_out?.value}
            </Col>
          </Row>
        );
      })}
    </div>
  );
}

function TransactionItem({ from, to }) {
  return (
    <div className="transaction-item">
      <Row className="transaction-item__row">
        <Col md={11} sm={24} xs={24}>
          <TransactionItemCells source={from} />
        </Col>
        <Col md={2} sm={24} xs={24} style={{ textAlign: 'center' }}>
          <ArrowRightOutlined />
        </Col>
        <Col md={11} sm={24} xs={24}>
          <TransactionItemCells source={to} />
        </Col>
      </Row>
    </div>
  );
}

export default TransactionItem;
