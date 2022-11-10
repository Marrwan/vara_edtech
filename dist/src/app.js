"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import { exec } from 'child_process';
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var compression_1 = __importDefault(require("compression"));
var error_1 = __importDefault(require("./middlewares/error"));
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        // this.initializeDatabase();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    App.prototype.initializeMiddleware = function () {
        this.express.use(express_1.default.json());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use((0, helmet_1.default)());
        this.express.use(express_1.default.urlencoded({ extended: true }));
        this.express.use((0, compression_1.default)());
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.express.use('/api', controller.router);
        });
    };
    App.prototype.initializeErrorHandling = function () {
        this.express.use(error_1.default);
    };
    // private async initializeDatabase(): Promise<void> {
    //   await  exec('npx prisma migrate dev --name init', {encoding: 'utf8'})
    // }
    App.prototype.listen = function () {
        var _this = this;
        this.express.listen(this.port, function () {
            console.log("App listening on the port ".concat(_this.port));
        });
    };
    return App;
}());
exports.default = App;
