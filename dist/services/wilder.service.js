"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const API_URL = "http://localhost:3000/api/wilders";
class WilderService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.get(API_URL);
                return res.data;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.get(`${API_URL}/${_id}`);
                return res.data;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static create(wilder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.post(API_URL, wilder);
                return res.data;
            }
            catch (err) {
                throw err.response.data.result;
            }
        });
    }
    static update(_id, wilder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.put(API_URL, { _id, wilder });
                return res.data;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.delete(API_URL, { data: { _id } });
                return res.data;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = WilderService;
