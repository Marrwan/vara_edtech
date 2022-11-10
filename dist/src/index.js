"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
var validateEnv_1 = __importDefault(require("./utils/validateEnv"));
var app_1 = __importDefault(require("./app"));
var controller_1 = __importDefault(require("./resources/customer/controller"));
var controller_2 = __importDefault(require("./resources/address/controller"));
(0, validateEnv_1.default)();
// execSync('ls');
var app = new app_1.default([new controller_1.default(), new controller_2.default()], Number(process.env.PORT));
app.listen();
