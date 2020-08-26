import React from "react";
import styles from "../ContactList/ContactList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import fadeContact from "./fadeContact.module.css";

const Contacts = ({ contacts, onDelete }) => {
  return (
    <>
      <div>
        <h2>Contacts</h2>
        <TransitionGroup component="ul">
          {contacts.map((contact) => (
            <CSSTransition
              timeout={500}
              classNames={fadeContact}
              key={contact.id}
            >
              <li className={styles.contact_li}>
                {contact.name} -{contact.number}
                <button
                  className={styles.contact_btn}
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
};

export default Contacts;
