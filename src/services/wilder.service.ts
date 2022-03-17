import axios from "axios";
import { Wilder } from "../models/wilder.model";

const API_URL = "http://localhost:3000/api/wilders";

export default class WilderService {

    static async getAll(){
        try {
            const res = await axios.get(API_URL);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static async getById(_id : string){
        try {
            const res = await axios.get(`${API_URL}/${_id}`);
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static async create(wilder : Wilder){
        try {
            const res = await axios.post(API_URL, wilder);
            return res.data;
        } catch (err : any) {
            throw err.response.data.result;
        }
    }

    static async update(_id : string ,wilder : Wilder){
        try {
            const res = await axios.put(API_URL, {_id,wilder});
            return res.data;
        } catch (err) {
            throw err;
        }
    }

    static async delete(_id : string){
        try {
            const res = await axios.delete(API_URL, {data : {_id}});
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}