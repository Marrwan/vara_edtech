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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        this.initializeRoutes();
    }
    CustomerController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllCustomers);
        this.router.get("".concat(this.path, "/:id"), this.getCustomerById);
        this.router.post(this.path, this.createCustomer);
        this.router.patch("".concat(this.path, "/:id"), this.modifyCustomer);
        this.router.delete("".concat(this.path, "/:id"), this.deleteCustomer);
    };
    CustomerController.prototype.getAllCustomers = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var Customers, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, service_1.default.getAllCustomers()];
                    case 1:
                        Customers = _a.sent();
                        response.send(Customers);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.status(400).json({ status: 'error', message: error_1.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    CustomerController.prototype.getCustomerById = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, Customer, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = Number(request.params.id);
                        return [4 /*yield*/, service_1.default.getCustomerById(id)];
                    case 1:
                        Customer = _a.sent();
                        response.send(Customer);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.status(400).json({ status: 'error', message: error_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    CustomerController.prototype.createCustomer = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, email, phone, CustomerData, newCustomer, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.body, name_1 = _a.name, email = _a.email, phone = _a.phone;
                        if (!name_1 || !email || !phone) {
                            throw new Error('Please fill all the fields');
                        }
                        CustomerData = { name: name_1, email: email, phone: phone };
                        return [4 /*yield*/, service_1.default.createCustomer(CustomerData)];
                    case 1:
                        newCustomer = _b.sent();
                        // console.log(newCustomer)
                        // if(newCustomer.status == 'error'){
                        //   return response.status(400).json({status: 'error',message: newCustomer.message});
                        // }
                        response.status(201).json({ status: 'success', data: newCustomer });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        return [2 /*return*/, response.status(400).json({ status: 'error', message: error_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    CustomerController.prototype.modifyCustomer = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name_2, email, phone, CustomerData, updateCustomer, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = Number(request.params.id);
                        _a = request.body, name_2 = _a.name, email = _a.email, phone = _a.phone;
                        CustomerData = { name: name_2, email: email, phone: phone };
                        return [4 /*yield*/, service_1.default.modifyCustomer(id, CustomerData)];
                    case 1:
                        updateCustomer = _b.sent();
                        response.send(updateCustomer);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        return [2 /*return*/, response.status(400).json({ status: 'error', message: error_4.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    CustomerController.prototype.deleteCustomer = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = Number(request.params.id);
                        return [4 /*yield*/, service_1.default.deleteCustomer(id)];
                    case 1:
                        _a.sent();
                        response.send(200).send({ status: "success", message: "Customer deleted" });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, response.status(400).json({ status: 'error', message: error_5.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    return CustomerController;
}());
exports.default = CustomerController;
