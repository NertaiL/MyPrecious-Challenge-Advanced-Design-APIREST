
const pagination = (data, items, page ) => { 

  const pageInt = Number(page);
  const itemsInt = Number(items);


  const startIndex = (pageInt - 1) * itemsInt;  //el paginna -1 quiere decir que la pagina 1 nosera la pagina 0 sino que sera la pagina 1 como tal
  const endIndex = pageInt * itemsInt;

  // guardo el resultado en un objeto
  const results = {};

  // valido si hay una página siguiente y agrego la info
  if (endIndex < data.length) { //aca estamos diciendo que si la porcion es menor que la cantidad de elementos que tenemos en data, (data son todos nuestro registros)
    results.next = {// entonces si se cumple muestrame next : las pagina siguiente , con la cantidad de items, como results es mutable entonces puedo escribir cualquier cosa y añadirla
      page: pageInt + 1,
      items: itemsInt,
    };
  }

 // valido si hay una página anterior y agrego la info
  if (startIndex > 0) { //aca le digo si la porcion es menor a 0 entonces que me muestre la pagina anterior con la cantidad de items y el numero de pagina
    results.previous = {
      page: pageInt - 1,
      items: itemsInt,
    };
  }

   // agrego la porción paginada de los datos a los resultados
  results.results = data.slice(startIndex, endIndex); //como reuslts es mutable le puedo agregar cualquier cosa aqui estoy agregando results: tendra la data seria la pagina actual mas su inicio y su final
  return results;
};

export default pagination;


