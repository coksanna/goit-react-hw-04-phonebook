import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import css from './ContactForm/contact-form.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`Contact ${name} - is already in contacts`);
      return false;
    }
    setContacts(prevContacts => {
      const newContacts = {
        id: nanoid(),
        name,
        number,
      };
      return [newContacts, ...prevContacts];
    });
    return true;
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  };

  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(contacts.length);

  return (
    <>
      <div className={css.wrapper}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={addContact} />
      </div>
      <div className={css.wrapper}>
        <h2 className={css.title}>Contacts</h2>
        <Filter handleChange={handleFilter} />
        {isContacts && (
          <ContactList
            removeContact={removeContact}
            contacts={filteredContacts}
          />
        )}
        {!isContacts && <p className={css.message}>No contacts in list</p>}
      </div>
    </>
  );
};
