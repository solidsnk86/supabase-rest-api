const validateQuery = require('../schemas/data')

class SupabaseController {
  constructor(model) {
    this.model = model
  }

  getTable = async (req, res) => {
    const queryValidation = validateQuery(req.query)
    if (!queryValidation.success) {
      const errorMessages = queryValidation.error.errors.map(
        (err) => err.message
      )
      return res.status(400).json({ message: errorMessages.join(', ') })
    }

    const { from: tableName, select } = queryValidation.data

    try {
      if (!tableName) throw new Error('El nombre de la tabla es requerido')

      const { data, error } = await this.model.getAll(tableName, select)
      if (error) throw error

      res.status(200).json(data)
    } catch (error) {
      res.status(400).json({ message: 'Error: ' + error.message })
    }
  }

  getOptionalTable = async (req, res) => {
    const queryValidation = validateQuery(req.query)
    if (!queryValidation.success) {
      const errorMessages = queryValidation.error.errors.map(
        (err) => err.message
      )
      return res.status(400).json({ message: errorMessages.join(', ') })
    }

    const { from: tableName, select, limit, order } = queryValidation.data

    try {
      if (!tableName) throw new Error('El nombre de la tabla es requerido')

      const { data, error } = await this.model.getOptional(
        tableName,
        select,
        limit,
        order
      )
      if (error) throw error

      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ message: 'Error: ' + error.message })
    }
  }

  searchData = async (req, res) => {
    const queryValidation = validateQuery(req.query)
    if (!queryValidation.success) {
      const errorMessages = queryValidation.error.errors.map(
        (err) => err.message
      )
      return res.status.json({ message: errorMessages.join(', ') })
    }
    const { from: tableName, select, column, eq } = queryValidation.data

    try {
      const { data, error } = await this.model.search(
        tableName,
        select,
        column,
        eq
      )
      if (error) throw error
      if (data.length === 0) res.status(400).json({ message: 'No hubo coincidencias' })
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ message: 'Error ' + error.message })
    }
  }

  sendData = async (req, res) => {
    const queryValidation = validateQuery(req.query)
    if (!queryValidation.success) {
      const errorMessages = queryValidation.error.errors.map(
        (err) => err.message
      )
      return res.status(400).json({ message: errorMessages.join(', ') })
    }

    const { from: tableName } = queryValidation.data
    const content = req.body

    try {
      if (!tableName) throw new Error('El nombre de la tabla es requerido')

      const { error } = await this.model.create(tableName, content)
      if (error) throw error

      res.status(201).json({ message: 'Data inserted' })
    } catch (error) {
      res.status(400).json({ message: 'Error: ' + error.message })
    }
  }

  update = async (req, res) => {
    const queryValidation = validateQuery(req.query)
    if (!queryValidation.success) {
      const errorMessages = queryValidation.error.errors.map(
        (err) => err.message
      )
      return res.status(400).json({ message: errorMessages.join(', ') })
    }

    const { from: tableName } = queryValidation.data
    const { id } = req.params
    const content = req.body

    try {
      if (!tableName) throw new Error('El nombre de la tabla es requerido')

      const { error } = await this.model.update(tableName, id, content)
      if (error) throw error

      res.status(200).json({ message: 'Data updated' })
    } catch (error) {
      res.status(400).json({ message: 'Error: ' + error.message })
    }
  }

  delete = async (req, res) => {
    const queryValidation = validateQuery(req.query)
    if (!queryValidation.success) {
      const errorMessages = queryValidation.error.errors.map(
        (err) => err.message
      )
      return res.status(400).json({ message: errorMessages.join(', ') })
    }

    const { from: tableName } = queryValidation.data
    const { id } = req.params

    try {
      if (!tableName) throw new Error('El nombre de la tabla es requerido')

      const { error } = await this.model.delete(tableName, id)
      if (error) throw error

      res.status(200).json({ message: 'Data deleted' })
    } catch (error) {
      res.status(400).json({ message: 'Error: ' + error.message })
    }
  }
}

module.exports = { SupabaseController }
