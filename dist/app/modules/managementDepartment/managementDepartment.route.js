"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const managementDepartment_controller_1 = require("./managementDepartment.controller");
const managementDepartment_validation_1 = require("./managementDepartment.validation");
const router = express_1.default.Router();
router.post('/create-department', (0, validateRequest_1.default)(managementDepartment_validation_1.ManagementDepartmentValidation.createManagementDepartmentZodSchema), managementDepartment_controller_1.ManagementDepartmentController.createDepartment);
router.get('/:id', managementDepartment_controller_1.ManagementDepartmentController.getSingleDepartment);
router.patch('/:id', (0, validateRequest_1.default)(managementDepartment_validation_1.ManagementDepartmentValidation.updateManagementDepartmentZodSchema), managementDepartment_controller_1.ManagementDepartmentController.updateDepartment);
router.delete('/:id', managementDepartment_controller_1.ManagementDepartmentController.deleteDepartment);
router.get('/', managementDepartment_controller_1.ManagementDepartmentController.getAllDepartments);
exports.ManagementDepartmentRoutes = router;
