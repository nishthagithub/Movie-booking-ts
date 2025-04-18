import { Request,Response } from "express";
import { AppDataSource } from "../config/data-source";
import { News } from "../Modals/News";

export const getAllNews = async(req:Request,res:Response)=>{
    try {
        const newsRepository = AppDataSource.getRepository(News);
        const news = await newsRepository.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({msg:"internal server error"});   
    }
}