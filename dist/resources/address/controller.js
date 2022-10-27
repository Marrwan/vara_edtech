"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var service_1 = __importDefault(require("./service"));
var AddressController = /** @class */ (function () {
    function AddressController() {
        this.path = "/address";
        this.router = (0, express_1.Router)();
        this.getAllAddress = function (request, response) {
            try {
                var Address = service_1.default.getAllAddress();
                response.send(Address);
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
        this.getAddressById = function (request, response) {
            try {
                var id = parseInt(request.params.id);
                var Address = service_1.default.getAddressById(id);
                response.send(Address);
            }
            catch (error) {
                return response.status(400).json({ status: 'error', message: error.message });
            }
        };
        this.createAddress = function (request, response) {
            try {
                var _a = request.body, customerId = _a.customerId, city = _a.city, province = _a.province, zip = _a.zip, house = _a.house;
                var AddressData = { customerId: customerId, city: city, province: province, zip: zip, house: house };
                var newAddress = service_1.default.createAddress(AddressData);
                response.status(201).json({ status: 'success', data: newAddress });
            }
            catch (error) {
                return response.status(400).json({ status: 'error', message: error.message });
            }
        };
        this.modifyAddress = function (request, response) {
            try {
                var id = parseInt(request.params.id);
                var _a = request.body, city = _a.city, province = _a.province, zip = _a.zip, house = _a.house;
                var AddressData = { city: city, province: province, zip: zip, house: house };
                var updateAddress = service_1.default.modifyAddress(id, AddressData);
                response.send(updateAddress);
            }
            catch (error) {
                return response.status(400).json({ status: 'error', message: error.message });
            }
        };
        this.deleteAddress = function (request, response) {
            try {
                var id = parseInt(request.params.id);
                var deleteAddress = service_1.default.deleteAddress(id);
                response.send(deleteAddress);
            }
            catch (error) {
                return response.status(400).json({ status: 'error', message: error.message });
            }
        };
        this.initializeRoutes();
    }
    AddressController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllAddress);
        this.router.get("".concat(this.path, "/:id"), this.getAddressById);
        this.router.post(this.path, this.createAddress);
        this.router.patch("".concat(this.path, "/:id"), this.modifyAddress);
        this.router.delete("".concat(this.path, "/:id"), this.deleteAddress);
    };
    return AddressController;
}());
exports.default = AddressController;
