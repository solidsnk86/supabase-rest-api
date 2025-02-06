// schemas/data.js
const z = require('zod')

const dataSchema = z.object({
  from: z
    .string({
      required_error: 'El parámetro "from" es requerido',
      invalid_type_error: 'El parámetro "from" debe ser un string',
    })
    .regex(/^[a-zA-Z_]+$/, 'El nombre de la tabla es inválido'),
  select: z
    .string({
      invalid_type_error: 'El parámetro "select" debe ser un string',
    })
    .optional()
    .refine((val) => !val || !val.includes("' OR 1 = 1"), {
      message: 'Consulta no permitida en "select"',
    }),
    order: z.string({ 
      invalid_type_error: 'El parámetro "order" debe ser un string'
     })
     .optional()
     .refine((val) => !val || !val.includes("' OR 1 = 1"), {
      message: 'Consulta no permitida en "order"'
     }),
     limit: z.string({
      invalid_type_error: 'El parámatro "limit debe ser un número"'
     })
     .optional()
     .refine((val) => !val || !val.includes("' OR 1 = 1"), {
      message: 'Consulta no permitida en "limit"'
     }),
     column: z.string({
      required_error: 'El parámatro "column" debe ser un string"'
     })
     .optional()
     .refine((val) => !val || !val.includes("' OR 1 = 1"), {
      message: 'Consulta no permitida en "column"'
     }),
     eq: z.string({
      required_error: 'El parámatro "eq" debe ser un string"'
     })
     .optional()
     .refine((val) => !val || !val.includes("' OR 1 = 1"), {
      message: 'Consulta no permitida en "eq"'
     })
})

function validateQuery(input) {
  return dataSchema.safeParse(input)
}

module.exports = validateQuery
