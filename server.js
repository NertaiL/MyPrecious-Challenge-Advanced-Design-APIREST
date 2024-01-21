import  express  from "express";
import  cors  from "cors";
import { logger } from "logger-express";
import jewelryRouter from "../MyPrecious/routes/jewelryRoutes.js";
import { notFound } from "./src/controllers/jewelryControllers.js";
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(logger())
app.use("/api/v1", jewelryRouter)
app.use("*", notFound)



app.listen(PORT, console.log(`!🟢 Servidor encendido en el puerto! ${PORT}`))
