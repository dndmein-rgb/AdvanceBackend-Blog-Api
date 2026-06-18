import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import cors from 'cors';
import { FRONTEND_URL } from "./config/config.js";


export const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:FRONTEND_URL 
}))

app.get("/health-check",(req:Request,res:Response)=>{
    return res.status(200).json({
        success:true,
        message:"Server running"
    })
})