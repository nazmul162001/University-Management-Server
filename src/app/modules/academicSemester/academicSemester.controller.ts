import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterFilterableField } from './academicSemester.constant'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    })
    next()
  }
)

// controller for semester pagination
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  // search semesters
  const filters = pick(req.query, academicSemesterFilterableField)

  // pagination
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  )
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

// get single semester
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.getSingleSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully',
    data: result,
  })
})

// update semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body

  const result = await AcademicSemesterService.updateSemester(id, updateData)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated successfully',
    data: result,
  })
})

// handle delete semester
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.deleteSemester(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester delete successfully',
    data: result,
  })
})

export const academicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
