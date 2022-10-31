/* eslint-disable unicorn/filename-case */
import PropTypes from 'prop-types';

function AbstractPanel({ list = [] }) {
  return (
    <div className="abstract-panel">
      {list?.map(({ title, value }) => {
        return (
          <div className="abstract-panel__item" key={title}>
            <div className="abstract-panel__item__title">{title}</div>
            <div className="abstract-panel__item__value">{value}</div>
          </div>
        );
      })}
    </div>
  );
}

AbstractPanel.propTypes = {
  list: PropTypes.array.isRequired,
};

export default AbstractPanel;
