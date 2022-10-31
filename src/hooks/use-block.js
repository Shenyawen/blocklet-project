/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import { message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useRequest, useCreation, useMemoizedFn } from 'ahooks';
import useSorter from './use-sorter';
import usePagination from './use-pagination';
import { formatBlockAbstract, formatBlockTransaction } from '../utils/format';

const DEFAULTHASH = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';

// 获取block信息接口
const BASEBLOCKURL = 'https://blockchain.info/rawblock/';

const useFetchBlock = () => {
  const fetchBlock = async (hash) => {
    return (await fetch(`${BASEBLOCKURL}/${hash}`)).json();
  };

  return async (hash) => {
    const response = await fetchBlock(hash);

    return response;
  };
};

// 整理区块数据
const useOrganizeBlock = (block) => {
  const abstract = useCreation(() => {
    return formatBlockAbstract(block);
  }, [block]);
  const transaction = useCreation(() => {
    const { tx: blockTransaction } = block;

    return formatBlockTransaction(blockTransaction);
  }, [block]);

  return [abstract, transaction];
};

function useBlock() {
  const { hash } = useParams();
  const fetchBlock = useFetchBlock();
  const navigate = useNavigate();

  const {
    loading,
    data: block = {},
    runAsync,
  } = useRequest(fetchBlock, {
    defaultParams: [hash || DEFAULTHASH],
    onSuccess({ hash: queryHash }) {
      navigate(`/${queryHash}`);
    },
  });

  const onSwitchBlock = useMemoizedFn(
    (direction) => {
      const { next_block, prev_block } = block;
      if (direction > 0) {
        if (next_block[0]) {
          runAsync(next_block[0]);
        }
      } else {
        // eslint-disable-next-line no-unused-expressions
        prev_block && runAsync(prev_block);
      }
    },
    [block]
  );

  const onSearch = useMemoizedFn((searchHash) => {
    if (!searchHash) {
      return message.error('请输入有效区块hash');
    }
    return runAsync(searchHash);
  }, []);

  const [abstract, transaction] = useOrganizeBlock(block);

  const [sorterTransaction, sorter] = useSorter(transaction);

  const [paginateTransaction, pagination] = usePagination(sorterTransaction);

  return [loading, { sorter, abstract, transaction: paginateTransaction, pagination, onSearch, onSwitchBlock }];
}

export default useBlock;
