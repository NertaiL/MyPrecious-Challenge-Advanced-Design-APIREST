import { getJewel, getJewelById,orderLimitPage,jewelFilter } from "../models/jewelryModels.js";
import { findError } from "../utils/utils.js";
import prepareHateoas from "../helpers/hateoas.js";
import  pagination from "../helpers/paginator.js";

// get all jewelry
export const getAllJewelry = async (req,res) => {
    try {
        const jewelryAll = await getJewel()
        res.status(200).json(jewelryAll)
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}

// get jewel by id
export const getJewelryById = async (req,res) => {
    try {
        const {id} = req.params
        const jewelryAll = await getJewelById(id)
        res.status(200).json({JewelById: jewelryAll})
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
  }

//get jewelry with hateoas and paginator with pg-format
export const getJewelryWithHateoas = async (req, res) => {
    try {
      const {order_by, limit , page} = req.query
      const jewelryAllWithOrderLimitPage = await orderLimitPage (order_by,limit,page)
      const jewelryWithHateoas = await prepareHateoas("jewelry", jewelryAllWithOrderLimitPage);
      res.status(200).json(jewelryWithHateoas );
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
  };

// get all jewelry with paginator
export const getPaginatorJewelry = async (req,res) =>{
    try {
        const {items,page} = req.query
        const jewelryAll = await getJewel()
        console.log(jewelryAll);
        const paginationData = pagination(jewelryAll,items,page)
        console.log(paginationData);
        res.status(200).json({paginationData})
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}

//filter and paginator as extra
export const filterJewelry = async (req,res) =>{
    try {
        /* const {items,page,filters} = req.body */
        const { precio_max, precio_min,categoria,metal,items,page} = req.query
        const filters = {precio_min,precio_max,categoria,metal}
        const jewelry = await jewelFilter(filters) 
        const paginationData = pagination(jewelry,items,page)
        console.log(pagination);
        res.status(200).json(paginationData)
    } catch (error) {
        console.log(error);
        const errorFound = findError(error.code)
        return res.status(errorFound[0].status).json({error: errorFound[0].message})
    }
}

export const notFound = async (req,res) =>{
    res.status(404).json({error :"This request is not possible, problems on the route."})
}


