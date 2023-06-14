import { z } from 'zod'
import {
  academicSemesterCodes,
  academicSemesterTitles,
  academisSemesterMonths,
} from './academicSemester.constant'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...academisSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...academisSemesterMonths] as [string, ...string[]], {
      required_error: 'End Month is required',
    }),
  }),
})
// validate update semester title & code
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academisSemesterMonths] as [string, ...string[]], {
          required_error: 'Start Month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academisSemesterMonths] as [string, ...string[]], {
          required_error: 'End Month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    { message: 'Either both title and code should be provided or neither' }
  )

export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
