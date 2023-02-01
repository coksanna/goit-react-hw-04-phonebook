import PropTypes from 'prop-types';

import css from './filter.module.css';

const Filter = ({ handleChange }) => {
  return (
    <label className={css.input}>
      Find contacts by name
      <input
        name="filter"
        onChange={handleChange}
        placeholder="enter contact"
      ></input>
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
