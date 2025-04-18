import { AppDataSource } from "../config/data-source";
import { News } from "../Modals/News";
import { NewsData } from "./NewsData";
const seedNews =async()=>{
    await AppDataSource.initialize();
    const newsRep =AppDataSource.getRepository(News);
    for(const item of NewsData){
        const news = newsRep.create(item);
        await newsRep.save(news);
    }
    console.log("news data seeded");
    await AppDataSource.destroy();
};
seedNews().catch((err)=>console.error("error seeding data"));