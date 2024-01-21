import  express  from "express";
import { getAllJewelry,getJewelryWithHateoas,getJewelryById,getPaginatorJewelry,filterJewelry,notFound } from "../src/controllers/jewelryControllers.js";


const router = express.Router()
// ✔ = answers to the challenge
router.get("/jewelryAll", getAllJewelry) //get all jewelry
router.get("/jewelry", getJewelryWithHateoas ) //paginating order_by,limit,page with pg-format and hateoas ✔
router.get("/jewelry/by/:id", getJewelryById) // search by id
router.get("/jewelry/paginator",getPaginatorJewelry)  // get all jewelry with paginator
router.get("/jewelry/filter",filterJewelry) // filter without pg-format with (paginator) as extra ✔
router.all("*", notFound) 



export default router