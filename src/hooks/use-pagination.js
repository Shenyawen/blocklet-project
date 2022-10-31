import { useState } from 'react';
import { useCreation } from 'ahooks';

const DEAFULTPAGESIZE = 20;

const initPagination = {
  current: 1,
  pageSize: DEAFULTPAGESIZE,
};

// 数据分页
const usePagination = (source) => {
  const [pagination, setPagination] = useState(initPagination);

  const paginateSource = useCreation(() => {
    const { current, pageSize } = pagination;
    const offset = (current - 1) * pageSize;
    return source?.slice(offset, offset + pageSize);
  }, [source, pagination]);

  const onPaginationChange = (current, pageSize) => {
    setPagination({ current, pageSize });
  };

  return [paginateSource, { ...pagination, total: source?.length || 0, onChange: onPaginationChange }];
};

export default usePagination;
