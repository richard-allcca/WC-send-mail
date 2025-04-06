# Web Component

## Cómo construir un Web Component con `react-to-webcomponent`

A continuación, se describe el paso a paso para crear un Web Component utilizando la librería `react-to-webcomponent`:

### 1. Instalar las dependencias necesarias

Ejecuta el siguiente comando para instalar las dependencias requeridas:

```bash
npm install react react-dom react-to-webcomponent
```

### 2. Crear el componente React

Crea un archivo llamado `MyComponent.jsx` en la carpeta `src` con el siguiente contenido:

```javascript
// filepath: e:\Personales\WebComponents\form-web-component\src\MyComponent.jsx
import React from 'react';

const MyComponent = ({ name }) => {
    return (
        <div>
            <h1>Hola, {name}!</h1>
        </div>
    );
};

export default MyComponent;
```

### 3. Convertir el componente en un Web Component

#### 3.1 Crear un archivo para registrar el Web Component

Crea un archivo llamado `index.js` en la carpeta `src` con el siguiente contenido:

```javascript
// filepath: e:\Personales\WebComponents\form-web-component\src\index.js
import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import MyComponent from './MyComponent';

// Convierte el componente React en un Web Component
const MyWebComponent = reactToWebComponent(MyComponent, React, ReactDOM);

// Registra el Web Component en el navegador
customElements.define('my-web-component', MyWebComponent);
```

### 4. Construir el proyecto

Ejecuta el siguiente comando para construir el proyecto:

```bash
npm run build
```

### 5. Usar el Web Component

#### 5.1 Archivos generados

Una vez construido, encontrarás los archivos generados en la carpeta `dist`.

#### 5.2 Incluir el Web Component en un proyecto HTML

Incluye el archivo generado en tu proyecto HTML y utiliza el Web Component de la siguiente manera:

```html
<script type="module" src="dist/my-web-component.es.js"></script>
<my-web-component name="Mundo"></my-web-component>
```

---

¡Y eso es todo! Ahora tienes un Web Component funcional creado con React y `react-to-webcomponent`.
