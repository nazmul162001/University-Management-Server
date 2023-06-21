'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateAdminId =
  exports.findLastAdminId =
  exports.generateFacultyId =
  exports.findLastFacultyId =
  exports.generateStudentId =
  exports.findLastStudentId =
    void 0
const user_model_1 = require('./user.model')
const findLastStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne(
      {
        role: 'student',
      },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean()
    return (
      lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id
    )
      ? lastStudent.id.substring(4)
      : undefined
  })
exports.findLastStudentId = findLastStudentId
// export const generateStudentId = async (
//   academicSemester: IAcademicSemester | null
// ): Promise<string> => {
//   const currentId =
//     (await findLastStudentId()) || (0).toString().padStart(5, '0') //00000
//   //increment by 1
//   let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
//   //20 25
//   incrementedId = `${academicSemester.year.substring(2)}${
//     academicSemester.code
//   }${incrementedId}`
//   return incrementedId
// }
const generateStudentId = academicSemester =>
  __awaiter(void 0, void 0, void 0, function* () {
    let incrementedId
    if (academicSemester && academicSemester.year && academicSemester.code) {
      const currentId =
        (yield (0, exports.findLastStudentId)()) ||
        (0).toString().padStart(5, '0')
      incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
      incrementedId = `${academicSemester.year.substring(2)}${
        academicSemester.code
      }${incrementedId}`
    } else {
      throw new Error('Invalid academic semester')
    }
    return incrementedId
  })
exports.generateStudentId = generateStudentId
const findLastFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne(
      { role: 'faculty' },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean()
    return (
      lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id
    )
      ? lastFaculty.id.substring(2)
      : undefined
  })
exports.findLastFacultyId = findLastFacultyId
const generateFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastFacultyId)()) ||
      (0).toString().padStart(5, '0')
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    incrementedId = `F-${incrementedId}`
    return incrementedId
  })
exports.generateFacultyId = generateFacultyId
const findLastAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_model_1.User.findOne(
      { role: 'admin' },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean()
    return (
      lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id
    )
      ? lastFaculty.id.substring(2)
      : undefined
  })
exports.findLastAdminId = findLastAdminId
const generateAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0')
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    incrementedId = `A-${incrementedId}`
    return incrementedId
  })
exports.generateAdminId = generateAdminId
