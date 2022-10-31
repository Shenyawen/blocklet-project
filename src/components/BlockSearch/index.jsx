/* eslint-disable no-console */
import { useBoolean } from 'ahooks';
import PropTypes from 'prop-types';
import { Input, Row, Col } from 'antd';
import './index.less';

function BlockSearch(props) {
  const [searching, { toggle }] = useBoolean(false);
  const { onSearch } = props;

  const onSearchHash = async (hash) => {
    toggle();
    try {
      await onSearch(hash);
    } catch (error) {
      console.log(error);
    } finally {
      toggle();
    }
  };

  return (
    <Row className="block-search">
      <Col className="block-search__logo" sm={8} xs={0}>
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwpimg.wallstcn.com%2Fbfd32f9d-b569-44ea-bf12-71e03d1c4a1d.png&refer=http%3A%2F%2Fwpimg.wallstcn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669623173&t=b471bd86c42edb04caa346854af6ff96"
          alt="btc"
        />
        BTC
      </Col>
      <Col sm={16} xs={24}>
        <Input.Search
          size="large"
          loading={searching}
          onSearch={onSearchHash}
          enterButton="搜索"
          placeholder="搜索区块"
        />
      </Col>
    </Row>
  );
}

BlockSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default BlockSearch;
