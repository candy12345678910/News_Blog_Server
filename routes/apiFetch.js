const express=require("express")
const fetchApiHandler=require("../controllers/fetchApiHandler")
const apiFetch=express();

apiFetch.get("/:category",fetchApiHandler)

module.exports= apiFetch