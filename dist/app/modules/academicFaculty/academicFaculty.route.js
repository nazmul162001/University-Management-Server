"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validations_1 = require("./academicFaculty.validations");
const router = express_1.default.Router();
router.post('/create-faculty', (0, validateRequest_1.default)(academicFaculty_validations_1.AcademicFacultyValidation.createFacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.createFaculty);
router.get('/:id', academicFaculty_controller_1.AcademicFacultyController.getSingleFaculty);
router.patch('/:id', (0, validateRequest_1.default)(academicFaculty_validations_1.AcademicFacultyValidation.updatefacultyZodSchema), academicFaculty_controller_1.AcademicFacultyController.updateFaculty);
router.delete('/:id', academicFaculty_controller_1.AcademicFacultyController.deleteFaculty);
router.get('/', academicFaculty_controller_1.AcademicFacultyController.getAllFaculties);
exports.AcademicFacultyRoutes = router;
