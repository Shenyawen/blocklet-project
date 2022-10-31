/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Space, Button, Collapse, Pagination, Row, Col, Typography } from 'antd';
import TransactionItem from './TransactionItem';
import './index.less';

const { Panel } = Collapse;

function BlockTransactioItemHeader({ fee, time, hash, amount }) {
  return (
    <Row className="block-transactio-item__header" justify="space-between" align="middle">
      <Col lg={12} md={24}>
        <Typography.Link
          ellipsis
          href={`https://www.blockchain.com/btc/tx/${hash}`}
          target="_blank"
          className="block-transactio-item__header__hash">
          {hash}
        </Typography.Link>
      </Col>
      <Col className="block-transactio-item__header__brief">
        <div className="block-transactio-item__header__brief__info">
          {amount} BTC | Fee {fee}
        </div>
        <div className="block-transactio-item__header__brief__date">{time}</div>
      </Col>
    </Row>
  );
}

BlockTransactioItemHeader.propTypes = {
  fee: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};

function SorterAction({ title, sorterKey, currentSorter, direction, onSorterChange }) {
  return (
    <Button type={currentSorter === sorterKey && 'primary'} onClick={() => onSorterChange(sorterKey)}>
      {title}
      {direction === 'asc' && currentSorter === sorterKey && <CaretUpOutlined />}
      {direction === 'desc' && currentSorter === sorterKey && <CaretDownOutlined />}
    </Button>
  );
}

// 交易记录
function BlockTransaction({ sorter, pagination, transaction }) {
  const { sorterKey, direction, onSorterChange } = sorter;

  return (
    <div className="block-transaction">
      <Row className="block-transaction__title">
        <Col flex="auto">交易明细</Col>
        <Col className="block-transaction__sorter">
          <Space>
            <SorterAction
              title="创建日期"
              sorterKey="transactionDate"
              direction={direction}
              currentSorter={sorterKey}
              onSorterChange={onSorterChange}
            />
            <SorterAction
              title="交易金额"
              sorterKey="transactionAmount"
              direction={direction}
              currentSorter={sorterKey}
              onSorterChange={onSorterChange}
            />
            <SorterAction
              title="手续费"
              sorterKey="transactionFee"
              direction={direction}
              currentSorter={sorterKey}
              onSorterChange={onSorterChange}
            />
          </Space>
        </Col>
      </Row>
      <Space size={24} direction="vertical" className="block-transaction__list">
        {transaction.map((item, index) => {
          const { hash, inputs, out } = item;
          return (
            <Collapse key={hash} bordered={false} collapsible="header">
              <Panel header={<BlockTransactioItemHeader {...item} />} key={index.toString()}>
                <TransactionItem to={out} from={inputs} />
              </Panel>
            </Collapse>
          );
        })}
      </Space>
      <div className="block-transaction__pagination">
        <Pagination {...pagination} />
      </div>
    </div>
  );
}

BlockTransaction.propTypes = {
  sorter: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  transaction: PropTypes.array.isRequired,
};

export default BlockTransaction;
