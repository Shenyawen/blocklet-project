import { useCreation } from 'ahooks';
import { formatDate } from '../../utils/format';

function useTransaction(transaction) {
  return useCreation(() => {
    if (!Array.isArray(transaction)) {
      return [];
    }

    return transaction.map(({ time, ...item }) => {
      return {
        ...item,
        time: formatDate(time),
      };
    });
  }, [transaction]);
}

export default useTransaction;
