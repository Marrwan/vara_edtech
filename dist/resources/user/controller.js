"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var service_1 = __importDefault(require("./service"));
var UserController = /** @class */ (function () {
    function UserController() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        this.getAllUsers = function (request, response) {
            var users = service_1.default.getAllUsers();
            response.send(users);
        };
        this.getUserById = function (request, response) {
            var id = parseInt(request.params.id);
            var user = service_1.default.getUserById(id);
            response.send(user);
        };
        this.createUser = function (request, response) {
            var userData = request.body;
            var newUser = service_1.default.createUser(userData);
            response.send(newUser);
        };
        this.modifyUser = function (request, response) {
            var id = parseInt(request.params.id);
            var userData = request.body;
            var updateUser = service_1.default.modifyUser(id, userData);
            response.send(updateUser);
        };
        this.deleteUser = function (request, response) {
            var id = parseInt(request.params.id);
            service_1.default.deleteUser(id);
            response.send(200);
        };
        this.initializeRoutes();
    }
    UserController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllUsers);
        this.router.get("".concat(this.path, "/:id"), this.getUserById);
        this.router.post(this.path, this.createUser);
        this.router.patch("".concat(this.path, "/:id"), this.modifyUser);
        this.router.delete("".concat(this.path, "/:id"), this.deleteUser);
    };
    return UserController;
}());
exports.default = UserController;
