"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const pages = ['Promo'];
const MenuAppBar = () => {
    const sayHello = () => {
        console.log('hello');
    };
    return ((0, jsx_runtime_1.jsx)(material_1.AppBar, Object.assign({ position: "static", style: { minHeight: "5%", height: "5%", backgroundColor: 'black' } }, { children: (0, jsx_runtime_1.jsx)(material_1.Container, Object.assign({ maxWidth: "xl" }, { children: (0, jsx_runtime_1.jsxs)(material_1.Toolbar, Object.assign({ disableGutters: true }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h6", noWrap: true, component: "div", sx: { mr: 2, display: { xs: 'none', md: 'flex' } }, onClick: sayHello }, { children: "WILDERS APP" })), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ variant: "h6", noWrap: true, component: "div", sx: { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }, { children: "WILDERS APP" })), (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }, { children: pages.map((page) => ((0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ onClick: sayHello, sx: { my: 2, color: 'white', display: 'block' } }, { children: page }), page))) }))] })) })) })));
};
exports.default = MenuAppBar;
