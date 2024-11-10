import React from 'react';
import ReactDOM from 'react-dom/client'; // Asegúrate de importar de react-dom/client
import r2wc from 'react-to-webcomponent';
import ContactForm from './ContactForm';

// Convertir el componente en un Web Component y definir propiedades observadas
const WebContactForm = r2wc(ContactForm, React, ReactDOM, {
  props: {
    urlLocal: 'string'
  }
});

// Definir el nuevo Web Component
if (!customElements.get('contact-form-element')) {
  customElements.define('contact-form-element', WebContactForm);
}
