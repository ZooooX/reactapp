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
const Skill_1 = __importDefault(require("../Skill/Skill"));
require("./WilderCard.css");
const material_1 = require("@mui/material");
const InsertEmoticon_1 = __importDefault(require("@mui/icons-material/InsertEmoticon"));
const LocationCity_1 = __importDefault(require("@mui/icons-material/LocationCity"));
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const MoreVert_1 = __importDefault(require("@mui/icons-material/MoreVert"));
const styles_1 = require("@mui/styles");
const react_1 = require("react");
const wilder_service_1 = __importDefault(require("../../services/wilder.service"));
function WilderCardComponent(props) {
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const { _id, skills, city, name } = props.wilder;
    const renderSkills = (skills) => {
        return skills.map((skill) => {
            return (0, jsx_runtime_1.jsx)(Skill_1.default, { skill: skill }, skill._id);
        });
    };
    const classes = useStyles();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = (_id) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield wilder_service_1.default.delete(_id);
            props.handleChange();
            handleClose();
        }
        catch (error) {
            console.log(error);
        }
    });
    return ((0, jsx_runtime_1.jsxs)(material_1.Card, Object.assign({ variant: "outlined" }, { children: [(0, jsx_runtime_1.jsx)(material_1.CardHeader, { avatar: (0, jsx_runtime_1.jsx)(InsertEmoticon_1.default, { htmlColor: "#FFD700", fontSize: "large" }), title: name, classes: { root: classes.root }, action: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ "aria-label": "settings", classes: { root: classes.root }, onClick: handleClick }, { children: (0, jsx_runtime_1.jsx)(MoreVert_1.default, { htmlColor: "#FFD700" }) })) }), (0, jsx_runtime_1.jsxs)(material_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "cityContainer mbot" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "wildercard_label" }, { children: "City" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "wildercard_iconAndName" }, { children: [(0, jsx_runtime_1.jsx)(LocationCity_1.default, { htmlColor: "black", fontSize: "large" }), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { marginLeft: "5px" } }, { children: city }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "skillsContainer" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "wildercard_label" }, { children: "Skills" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "wildercard_skills" }, { children: renderSkills(skills) }))] }))] }), (0, jsx_runtime_1.jsxs)(material_1.Menu, Object.assign({ id: "menu", anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleClose }, { children: [(0, jsx_runtime_1.jsxs)(material_1.MenuItem, Object.assign({ onClick: () => props.handleEdit(_id), disableRipple: true }, { children: [(0, jsx_runtime_1.jsx)(Edit_1.default, {}), "Edit"] })), (0, jsx_runtime_1.jsxs)(material_1.MenuItem, Object.assign({ onClick: () => _id ? handleDelete(_id) : null, disableRipple: true }, { children: [(0, jsx_runtime_1.jsx)(Delete_1.default, {}), "Delete"] }))] }))] })));
}
exports.default = WilderCardComponent;
const useStyles = (0, styles_1.makeStyles)({
    root: {
        color: "#FFD700"
    }
});
