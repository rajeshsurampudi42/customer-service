"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config = require("config");
const expressConfig = config.get('express');
app_1.app.listen(expressConfig.port, () => {
    console.log(`"server started at http://${expressConfig.host}:${expressConfig.port}"`);
    return expressConfig.host;
});
