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
const material_1 = require("@mui/material");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Modal_1 = __importDefault(require("@mui/material/Modal"));
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const react_1 = require("react");
const wilder_service_1 = __importDefault(require("../../services/wilder.service"));
require("./WilderModal.css");
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
function WilderModalComponent(props) {
    const { open, handleClose, _id } = props;
    const [skills, setSkills] = (0, react_1.useState)([]);
    const [wilder, setWilder] = (0, react_1.useState)(null);
    const [openAlert, setOpenAlert] = (0, react_1.useState)({ open: false, message: "", severity: undefined });
    const nameRef = (0, react_1.useRef)();
    const cityRef = (0, react_1.useRef)();
    const getWilder = (_id) => __awaiter(this, void 0, void 0, function* () {
        const w = yield wilder_service_1.default.getById(_id);
        setWilder(w);
        nameRef.current.value = w.name;
        cityRef.current.value = w.city;
        setSkills(w.skills);
    });
    (0, react_1.useEffect)(() => {
        if (_id)
            getWilder(_id);
    }, []);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const submit = () => __awaiter(this, void 0, void 0, function* () {
        const wilder = {
            name: nameRef.current.value,
            city: cityRef.current.value,
            skills: skills
        };
        try {
            if (_id) {
                let res = yield wilder_service_1.default.update(_id, wilder);
                handleOpenAlert("Wilder modifié !", "success");
            }
            else {
                let res = yield wilder_service_1.default.create(wilder);
                handleOpenAlert("Wilder créé !", "success");
            }
            props.handleChange();
        }
        catch (error) {
            handleOpenAlert("Error", "error");
        }
    });
    const handleOpenAlert = (message, severity) => {
        setOpenAlert({ open: true, message: message, severity: severity });
        setTimeout(() => {
            setOpenAlert({ open: false, message: "", severity: undefined });
        }, 4000);
    };
    const handleFormChange = (event, index) => {
        let data = [...skills];
        data[index][event.target.name] = event.target.value;
        setSkills(data);
        console.log(skills);
    };
    const addSkill = () => {
        let skill = {
            title: '',
            votes: 0
        };
        setSkills([...skills, skill]);
    };
    const deleteSkill = (index) => {
        let data = [...skills];
        data.splice(index, 1);
        setSkills(data);
    };
    const renderSkills = () => {
        return skills.map((skill, index) => {
            return (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "skillInputs" }, { children: [(0, jsx_runtime_1.jsx)(TextField_1.default, { value: skill.title, name: "title", label: "Title", variant: "standard", onChange: (event) => handleFormChange(event, index), InputLabelProps: { shrink: true } }), (0, jsx_runtime_1.jsx)(TextField_1.default, { value: skill.votes, name: "votes", type: 'number', label: "Votes", variant: "standard", onChange: (event) => handleFormChange(event, index), InputLabelProps: { shrink: true } }), (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ variant: 'outlined', onClick: () => deleteSkill(index) }, { children: "Delete" }))] }), index);
        });
    };
    const renderAlert = () => {
        if (openAlert.open) {
            return (0, jsx_runtime_1.jsx)(material_1.Alert, Object.assign({ action: (0, jsx_runtime_1.jsx)(material_1.IconButton, Object.assign({ "aria-label": "close", color: "inherit", size: "small", onClick: () => {
                        setOpenAlert({ open: false, message: "", severity: undefined });
                    } }, { children: (0, jsx_runtime_1.jsx)(Close_1.default, { fontSize: "inherit" }) })), sx: { mt: 2 }, severity: openAlert.severity }, { children: openAlert.message }));
        }
    };
    return ((0, jsx_runtime_1.jsx)(Modal_1.default, Object.assign({ open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, Object.assign({ sx: style }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { fontWeight: "bold", textAlign: "center" } }, { children: "Ajouter un wilder" })), (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { fontWeight: "bold" } }, { children: "Infos" })), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "standard-basic", label: "Name", variant: "standard", inputRef: nameRef, InputLabelProps: { shrink: true } }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "standard-basic", label: "City", variant: "standard", inputRef: cityRef, InputLabelProps: { shrink: true } }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { fontWeight: "bold" } }, { children: "Skills" })), (0, jsx_runtime_1.jsx)("div", { children: renderSkills() }), (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ variant: 'outlined', style: { marginTop: "10px", marginBottom: "10px" }, onClick: addSkill }, { children: "Ajouter un skill" }))] }), (0, jsx_runtime_1.jsx)(Button_1.default, Object.assign({ variant: "contained", onClick: submit }, { children: _id ? "Modifier le wilder" : "Créer le wilder" }))] }), renderAlert()] })) })));
}
exports.default = WilderModalComponent;
