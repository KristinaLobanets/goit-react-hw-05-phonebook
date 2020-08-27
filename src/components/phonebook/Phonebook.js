import React, { Component } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../filter/filter";
import { v4 as uuidv4 } from "uuid";
import styles from "./phonebook.module.css";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import appear from "./appear.module.css";
import errorFade from "./errorFade.module.css";

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: "",
    error: false,
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  addContact = (contact) => {
    if (this.state.contacts.find((item) => item.name === contact.name)) {
      this.setState({ error: true });
      setTimeout(() => this.setState({ error: false }), 5000);
      return;
    } else {
      this.setState((prevState) => {
        return {
          contacts: [...prevState.contacts, contact],
        };
      });
    }
  };

  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    this.addContact({ id: uuidv4(), name: name, number: number });
    this.setState({ name: "", number: "" });
  };

  getFilteredData = () => {
    return this.state.filter
      ? this.state.contacts.filter((item) =>
          item.name.toLowerCase().includes(this.state.filter.toLowerCase())
        )
      : this.state.contacts;
  };

  onDelete = (id) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((item) => item.id !== id),
      };
    });
  };

  render() {
    const { filter, error } = this.state;
    return (
      <>
        <CSSTransition
          in={error}
          timeout={250}
          classNames={errorFade}
          unmountOnExit
        >
          <div className={styles.blockerror}>
            Error! Contact is already exist!
          </div>
        </CSSTransition>
        <div className={styles.block}>
          <div className={styles.form}>
            <CSSTransition
              in={true}
              appear={true}
              timeout={500}
              classNames={appear}
              unmountOnExit
            >
              <h1>Phonebook</h1>
            </CSSTransition>
            <ContactForm addContact={this.addContact} />
          </div>
          <div className={styles.contacts}>
            <Filter
              searchContact={this.getFilteredData}
              value={filter}
              onFilter={this.handleFilter}
            />

            <ContactList
              contacts={this.getFilteredData()}
              onDelete={this.onDelete}
            />
          </div>
        </div>
      </>
    );
  }
}
export default Phonebook;

Phonebook.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
};
