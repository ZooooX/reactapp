"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./Skill.css");
function SkillComponent(props) {
    const { skill } = props;
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'skills_container' }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: 'skills_title' }, { children: skill.title })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: 'skills_votes' }, { children: skill.votes }))] })));
}
exports.default = SkillComponent;
