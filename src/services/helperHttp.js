export const helperHttp = () => {
  const customFetch = async (endpoint, options = {}) => {
    const defaultHeader = {
      accept: "application/json",
      // Si necesitas otra cabecera además de "accept" envíala desde la petición para evitar fallos
    };

    const controller = new AbortController(); // Instancia de control de petición

    options.signal = controller.signal; // Método asignado para abortar petición

    options.method = options.method || "GET";

    // Uniendo defaultHeader con options o usar el predeterminado ln/3
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    // si viene un "body" los convertimos en cadena
    if (options.body) {
      options.body = JSON.stringify(options.body);
    }

    // Puedes usar este abort también con un botón y cancelar petición
    setTimeout(() => controller.abort(), 2000); // Aborta la petición por demora

    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.log(error);
      return {
        error: true,
        status: error.status || "00",
        statusText: error.statusText || "Ocurrió un Error",
      };
    }
  };

  // ========================
  // Methods - modify the names as needed
  // ========================
  const get = (url, options = {}) => {
    return customFetch(url, options);
  }

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
