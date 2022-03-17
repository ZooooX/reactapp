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
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Wilders.css");
const wilder_service_1 = __importDefault(require("../../services/wilder.service"));
const WilderCard_1 = __importDefault(require("../WilderCard/WilderCard"));
const react_1 = require("react");
const material_1 = require("@mui/material");
const WilderModal_1 = __importDefault(require("../WilderModal/WilderModal"));
function WildersComponent() {
    const [wilders, setWilders] = (0, react_1.useState)([]);
    const [open, setOpen] = (0, react_1.useState)({ open: false, _id: null });
    const getWilders = () => __awaiter(this, void 0, void 0, function* () {
        setWilders(yield wilder_service_1.default.getAll());
    });
    (0, react_1.useEffect)(() => {
        getWilders();
    }, []);
    const handleCreate = () => setOpen({ open: true, _id: null });
    const handleClose = () => setOpen({ open: false, _id: null });
    const handleEdit = (_id) => setOpen({ open: true, _id: _id });
    const handleChange = () => {
        getWilders();
    };
    const renderWilderCards = (wilders) => {
        return wilders.map((wilder) => {
            return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mtop mbot" }, { children: (0, jsx_runtime_1.jsx)(WilderCard_1.default, { wilder: wilder, handleChange: handleChange, handleEdit: handleEdit }) }), wilder._id);
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "wilders_container" }, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: 'outlined', onClick: handleCreate, className: "wilders_addBtn" }, { children: "Ajouter un wilder" })), open.open ? (0, jsx_runtime_1.jsx)(WilderModal_1.default, { open: open.open, handleClose: handleClose, handleChange: handleChange, _id: open._id }) : null, (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'wilders_wilders' }, { children: renderWilderCards(wilders) }))] })));
}
exports.default = WildersComponent;
