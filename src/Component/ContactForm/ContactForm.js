import React, { Component } from 'react';
import './ContactForm.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { value, name } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.formSubmit(this.state);
    this.inputReset();
  };

  inputReset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="phonebook-form">
        <label className="phonebook-form__label">
          Name
          <input
            className="phonebook-form__input"
            type="text"
            name="name"
            // pattern="^[a-zA-Zа-яА-Я]/\+((['-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder="Your name"
          />
        </label>
        <label className="phonebook-form__label">
          Tel
          <input
            className="phonebook-form__input phonebook-form__input-tel"
            type="tel"
            name="number"
            // pattern="/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleInputChange}
            placeholder="Your telephone number"
          />
        </label>
        <button type="submit" className="phonebook-form__button">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
