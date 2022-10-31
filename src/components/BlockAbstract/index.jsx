/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { Tooltip, Row, Col, Typography } from 'antd';
import { useCreation } from 'ahooks';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import AbstractPanel from './AbstractPanel';
import BLOCKDETAILCONFIG from './const';
import './index.less';

function BlockAbstract({ abstract, onSwitchBlock }) {
  const { hash, height } = abstract;
  const abstractMemo = useCreation(() => {
    return BLOCKDETAILCONFIG.map((list) => {
      if (Array.isArray(list)) {
        return list.map(({ title, value, tooltip }) => {
          if (tooltip) {
            return {
              title,
              value: <Tooltip title={abstract[tooltip]}>{abstract[value]}</Tooltip>,
            };
          }

          return { title, value: abstract[value] || '-' };
        });
      }

      return list;
    });
  }, [abstract]);

  return (
    <div className="block-abstract">
      <div className="block-abstract__title">
        区块高度:
        <CaretLeftOutlined onClick={() => onSwitchBlock(-1)} />
        <span>{height}</span>
        <CaretRightOutlined onClick={() => onSwitchBlock(1)} />
      </div>
      <div className="block-abstract__hash">
        <Tooltip title="区块hash">
          <Typography.Paragraph ellipsis copyable={{ tooltips: '复制' }}>
            {hash}
          </Typography.Paragraph>
        </Tooltip>
      </div>
      <Row className="block-abstract__detail" gutter={{ md: 20, sm: 16, ms: 0 }}>
        {abstractMemo.map((list, index) => {
          return (
            <Col key={index} xs={24} lg={8}>
              <AbstractPanel list={list} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

BlockAbstract.propTypes = {
  abstract: PropTypes.object.isRequired,
  onSwitchBlock: PropTypes.func.isRequired,
};

export default BlockAbstract;
