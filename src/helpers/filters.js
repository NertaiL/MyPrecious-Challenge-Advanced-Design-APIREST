//filters en resumen armamos la consulta de sql y retornamos la consulta son sus valores agregados

const createQuery = (entity, filters) => { 
 
  const table = entity.toLowerCase(); 
  let query = `SELECT * FROM ${table}  WHERE 1 = 1`;

                                          
  const filterEntries = Object.entries(filters); 
  const values = []; 
  
  for (const [key, value] of filterEntries) {
    if(key === "precio_max"){
      query += ` AND precio <= $${values.length + 1}`; 
    }else if(key === "precio_min"){
      query += ` AND precio >= $${values.length + 1}`;
    }else{
    query += ` AND ${key} = $${values.length + 1}`; 
     }
     values.push(value);
  }

  return { query, values };
}


export default createQuery
