import { Spin, Row, Col } from 'antd';
import BlockSearch from '../components/BlockSearch';
import BlockAbstract from '../components/BlockAbstract';
import BlockTransaction from '../components/BlockTransaction';
import useBlock from '../hooks/use-block';

function Home() {
  const [loading, { sorter, abstract, transaction, pagination, onSearch, onSwitchBlock }] = useBlock();

  return (
    <Row className="home" justify="center" style={{ paddingBottom: 20 }}>
      <Col offset={1}>
        <BlockSearch onSearch={onSearch} />
        <Spin spinning={loading} tip="正在获取区块信息...">
          <BlockAbstract abstract={abstract} onSwitchBlock={onSwitchBlock} />
          <BlockTransaction sorter={sorter} transaction={transaction} pagination={pagination} />
        </Spin>
      </Col>
    </Row>
  );
}

export default Home;
