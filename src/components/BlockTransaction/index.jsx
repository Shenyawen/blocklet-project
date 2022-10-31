/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { Space, Collapse, Pagination, Row, Col, Typography } from 'antd';
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

// 交易记录
function BlockTransaction({ pagination, transaction }) {
  return (
    <div className="block-transaction">
      <h1 className="block-transaction__title">交易</h1>
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
  pagination: PropTypes.object.isRequired,
  transaction: PropTypes.array.isRequired,
};

export default BlockTransaction;
