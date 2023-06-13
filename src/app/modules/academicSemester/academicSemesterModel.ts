import { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface'
import {
  academicSemesterCodes,
  academicSemesterTitles,
  academisSemesterMonths,
} from './academicSemester.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academisSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academisSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
)

// validate same year && same semester issues
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  // checking year && semester
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exists !'
    )
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)
