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
    const offset = page * limit;
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