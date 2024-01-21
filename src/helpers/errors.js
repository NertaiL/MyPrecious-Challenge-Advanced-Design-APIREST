const ERRORS = [
    { code: "23502" , status: 400, message: "El campo destino o presupuesto no puede estar vacio"},
  { code: "22P02" , status: 400, message: "El parámetro /limit/ debe ser un número entero positivo."},
  { code : "2201W" , status : 400, message : "El parámetro /limit/ debe ser un número entero positivo."},
  { code : "42601" , status : 400, message : "Error de sintaxis"},
  { code : "42P01" , status : 500, message : "Error en la conexion con la base de datos "}
]

export default ERRORS