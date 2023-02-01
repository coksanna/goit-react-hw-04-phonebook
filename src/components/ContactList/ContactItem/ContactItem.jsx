import PropTypes from 'prop-types';
import css from './contact-item.module.css';

const ContactItem = ({ id, name, number, removeContact }) => {
  return (
    <li className={css.item}>
      {name} : {number}
      <button
        onClick={() => removeContact(id)}
        type="button"
        className={css.btn}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  removeContact: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
