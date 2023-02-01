import PropTypes from 'prop-types';
import ContactItem from './ContactItem/ContactItem';
import css from './contact-list.module.css';

const ContactList = ({ removeContact, contacts }) => {
  const items = contacts.map(({ id, name, number }) => (
    <ContactItem
      key={id}
      id={id}
      name={name}
      number={number}
      removeContact={removeContact}
    />
  ));

  return <ul className={css.list}>{items}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
