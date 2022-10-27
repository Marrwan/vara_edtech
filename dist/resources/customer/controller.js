"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var service_1 = __importDefault(require("./service"));
var CustomerController = /** @class */ (function () {
    function CustomerController() {
        this.path = "/customers";
        this.router = (0, express_1.Router)();
        this.getAllCustomers = function (request, response) {
            try {
                var Customers = service_1.default.getAllCustomers();
                response.send(Customers);
            }
            catch (error) {
                return response.status(400).json({ status: 'error', message: error.message });
            }
        };
        this.getCustomerById = function (request, response) {
            try {
                var id = parseInt(request.params.id);
                var Customer = service_1.default.getCustomerById(id);
                response.send(Customer);
            }
            catch (error) {
                return response.status(400).json({ status: 'error', message: error.message });
            }
        };
        this.createCustomer = function (request, response) {
            try {
                var _a = request.body, city = _a.city, province = _a.province, zip = _a.zip, house = _a.house;
                var CustomerData = { city: city, province: province, zip: zip, house: house };
                var newCustomer = service_1.default.createCustomer(CustomerData);
                response.status(201).json({ status: 'success', data: newCustomer });
            }
            catch (error) {
                return response.status(400).json({ status: 'error', message: error.message });
            }
        };
        this.modifyCustomer = function (request, response) {
            try {
                var id = parseInt(request.params.id);
                var _a = request.body, city = _a.city, province = _a.province, zip = _a.zip, house = _a.house;
                var CustomerData = { city: city, province: province, zip: zip, house: house };
                var updateCustomer = service_1.default.modifyCustomer(id, CustomerData);
                response.send(updateCustomer);
            }
            catch (error) {
                return response.status(400).json({ status: 'error', message: error.message });
            }
        };
        this.deleteCustomer = function (request, response) {
            try {
                var id = parseInt(request.params.id);
                service_1.default.deleteCustomer(id);
                response.send(200);
            }
            catch (error) {
                return response.status(400).json({ status: 'error', message: error.message });
            }
        };
        this.initializeRoutes();
    }
    CustomerController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllCustomers);
        this.router.get("".concat(this.path, "/:id"), this.getCustomerById);
        this.router.post(this.path, this.createCustomer);
        this.router.patch("".concat(this.path, "/:id"), this.modifyCustomer);
        this.router.delete("".concat(this.path, "/:id"), this.deleteCustomer);
    };
    return CustomerController;
}());
exports.default = CustomerController;
