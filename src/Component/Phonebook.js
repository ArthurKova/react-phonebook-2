import React, { Component } from 'react';
import ContactForm from './ContactForm/';
import Filter from './Filter/';
import ContactList from './ContactList/';
import { nanoid } from 'nanoid';
import propTypes from 'prop-types';
import './Phonebook.css';

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const storageContacts = localStorage.getItem('contacts');
    const contactsParse = JSON.parse(storageContacts);
    if (contactsParse) {
      this.setState({ contacts: contactsParse });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleInputChange = e => {
    const { value, name } = e.currentTarget;
    this.setState({ [name]: value });
  };

  formSubmit = data => {
    const { name } = data;
    if (this.isExistingContact(name)) {
      return alert(name + 'is already in contacts');
    }
    this.setState({ contacts: this.contactCreate(data) });
  };

  contactCreate = ({ name, number }) => {
    const { contacts } = this.state;

    return [...contacts, { id: nanoid(), name: name, number: number }];
  };

  isExistingContact = name => {
    const { contacts } = this.state;
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  filtredContacts = () => {
    const filter = this.state.filter.toLowerCase();
    const { contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(e => e.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <div className="page-box">
        <h1>Phonebook</h1>
        <ContactForm formSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleInputChange={this.handleInputChange} />
        <ContactList
          filtredContacts={this.filtredContacts()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}

Phonebook.propTypes = {
  data: propTypes.oneOfType([
    propTypes.string.isRequired,
    propTypes.number.isRequired,
  ]),
  id: propTypes.oneOfType([
    propTypes.string.isRequired,
    propTypes.number.isRequired,
  ]),
};

export default Phonebook;

//  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     { id: 'id-5', name: 'Ashley Coule', number: '455-82-53' },
//     { id: 'id-6', name: 'Victor Huho', number: '243-19-84' },
//     { id: 'id-7', name: 'Eddie Vader', number: '635-11-18' },
//     { id: 'id-8', name: 'Kurt Cobain', number: '612-24-77' },
