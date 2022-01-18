const get = (key, defaultValue) => {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData === null) {
      return defaultValue;
    } else {
      return JSON.parse(localStorageData);
    }
  };
  
  // Función que guarda una propiedad y su valor en el local storage
  const set = (key, value) => {
    const localStorageData = JSON.stringify(value);
    localStorage.setItem(key, localStorageData);
  };
    
  
  // Creamos un objeto temporal que es el que queremos exportar 
  const objectToExport = {
    get: get, //propiedad get cuyo valor es la función get
    set: set, //propiedad set cuyo valor es la función set
  };
  
  // Exportamos el objeto para que pueda ser usado desde App
  export default objectToExport;