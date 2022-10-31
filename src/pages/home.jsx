import { Spin } from 'antd';
import BlockSearch from '../components/BlockSearch';
import BlockAbstract from '../components/BlockAbstract';
import BlockTransaction from '../components/BlockTransaction';
import useBlock from '../hooks/use-block';

function Home() {
  const [loading, { abstract, transaction, pagination, onSearch, onSwitchBlock }] = useBlock();

  return (
    <div className="home">
      <BlockSearch loading={loading} onSearch={onSearch} />
      <Spin spinning={loading} tip="正在获取区块信息...">
        <BlockAbstract abstract={abstract} onSwitchBlock={onSwitchBlock} />
        <BlockTransaction transaction={transaction} pagination={pagination} />
      </Spin>
    </div>
  );
}

export default Home;
