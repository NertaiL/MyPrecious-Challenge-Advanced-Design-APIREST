import pool from "../../db/connectionDb.js"
import  format  from "pg-format";
import createQuery from "../helpers/filters.js ";


export const getJewel = async () =>{
    const SQLquery = {text: "SELECT * FROM inventario;"}
    const response = await pool.query(SQLquery)
    return response.rows
}

export const getJewelById = async (id) =>{
    const SQLquery = {text: "SELECT * FROM inventario WHERE id = $1",
                      values: [id] }
    const response = await pool.query(SQLquery)
    return response.rows[0]
}


export const orderLimitPage = async(order_by = "stock_ASC",limit = 10, page = 4) =>{
    const [attribute, direction] = order_by.split("_") 
    const offset = (page -1) * limit;   //aqui lo dejo (page - 1) es para que la pagina 1 no sea la pagina 0, entonces le restamos uno y nos quedaria la pagina 1 como pagina 1 y no en la pag 0, entonces el offset 0 seria en la pag 1 y no en la pag 0.
    const formattedQuery = format( 
        "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
        attribute, 
        direction, 
        limit,
        offset
    )
    console.log("attribute,direction,limits,offset");
    console.log(formattedQuery);
    const response = await pool.query(formattedQuery)
    return response.rows
}

export const jewelFilter = async (filters) => {
    const { query, values } = createQuery("inventario", filters); 
    const response = await pool.query(query, values); 
    return response.rows;
  };