/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import BigNumber from 'bignumber.js';

export const thousandFormat = (num) => {
  if (!num) {
    return '0';
  }

  return num?.toLocaleString('zh', { style: 'decimal' });
};

const FORMATDATE = 'YYYY/MM/DD HH:mm:ss';

export const formatDate = (date) => {
  return dayjs(date * 1000).format(FORMATDATE);
};

export const div = (value1, value2) => {
  return new BigNumber(value1).div(value2).toString();
};

export const plus = (value1, value2) => {
  return new BigNumber(value1).plus(value2).toString();
};

const PRESIION = 10 ** 8;

export const formatSAT2Btc = (sat) => {
  return div(sat, PRESIION);
};

export const formatBlockAbstract = (block) => {
  if (isEmpty(block)) {
    return {};
  }
  const { tx, time, fee, hash, height, mrkl_root, size, bits, nonce, weight } = block;

  const [
    {
      out: [{ value: reword }],
    },
  ] = tx;

  return {
    hash,
    height,
    mrkl_root,
    time: formatDate(time),
    bits: thousandFormat(bits),
    transactionSize: tx.length,
    size: thousandFormat(size),
    nonce: thousandFormat(nonce),
    fee: thousandFormat(formatSAT2Btc(fee)),
    weight: `${thousandFormat(weight)} Bytes`,
    mrkl_root_show: `${mrkl_root?.substr(0, 18)}...`,
    reword: `${thousandFormat(formatSAT2Btc(reword))} BTC`,
  };
};

export const formatBlockTransaction = (transaction) => {
  if (!Array.isArray(transaction)) {
    return [];
  }

  return transaction.map(({ fee, time, out, inputs, ...extra }) => {
    const amount = out?.reduce((total, { value }) => {
      return plus(total, value);
    }, 0);

    return {
      ...extra,
      out: out?.map(({ value, ...item }) => ({ ...item, value: formatSAT2Btc(value) })),
      inputs: inputs?.map(({ prev_out, ...item }) => ({
        ...item,
        prev_out: { ...prev_out, value: formatSAT2Btc(prev_out.value) },
      })),
      amount: formatSAT2Btc(amount),
      fee: `${formatSAT2Btc(fee)} BTC`,
      time: formatDate(time),
    };
  });
};
