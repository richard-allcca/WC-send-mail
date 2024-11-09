/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createRoot } from 'react-dom/client';
import reactToWebComponent from '@r2wc/react-to-web-component';
import ContactForm from './ContactForm';

// Convertir el componente en un Web Component
const ContactFormWebComponent = reactToWebComponent(ContactForm, React, createRoot);

// Definir el nuevo Web Component
if (!customElements.get('contact-form-element')) {
  customElements.define('contact-form-element', ContactFormWebComponent);
}