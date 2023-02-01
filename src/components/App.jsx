import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import css from './ContactForm/contact-form.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      alert(`Contact ${name} - is already in contacts`);
      return false;
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContacts = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContacts, ...contacts] };
    });
    return true;
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  }

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  }

  render() {
    const { addContact, removeContact } = this;
    const contacts = this.getFilteredContacts();
    const isContacts = Boolean(contacts.length);

    return (
      <>
        <div className={css.wrapper}>
          <h2 className={css.title}>Phonebook</h2>
          <ContactForm onSubmit={addContact} />
        </div>
        <div className={css.wrapper}>
          <h2 className={css.title}>Contacts</h2>
          <Filter handleChange={this.handleFilter} />
          {isContacts && (
            <ContactList removeContact={removeContact} contacts={contacts} />
          )}
          {!isContacts && <p className={css.message}>No contacts in list</p>}
        </div>
      </>
    );
  }
}
