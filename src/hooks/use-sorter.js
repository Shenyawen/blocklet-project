import orderBy from 'lodash/orderBy';
import { useCreation, useSetState, useMemoizedFn } from 'ahooks';

const initSortConfig = {
  sorterKey: undefined,
  direction: undefined,
};

const getNextDirection = (direction) => {
  if (!direction) {
    return 'asc';
  }
  if (direction === 'asc') {
    return 'desc';
  }

  return undefined;
};

export default (source) => {
  const [{ sorterKey, direction }, setState] = useSetState(initSortConfig);

  const sortSource = useCreation(() => {
    if (!Array.isArray(source)) {
      return [];
    }

    return orderBy(source, sorterKey, direction);
  }, [source, sorterKey, direction]);

  const onSorterChange = useMemoizedFn((key) => {
    setState(({ direction: current, sorterKey: oldKey }) => {
      const nextDirection = getNextDirection(oldKey === key ? current : undefined);

      return {
        sorterKey: key,
        direction: nextDirection,
      };
    });
  }, []);

  const onResetSorter = useMemoizedFn(() => {
    setState(initSortConfig);
  }, []);

  return [sortSource, { sorterKey, direction, onResetSorter, onSorterChange }];
};
