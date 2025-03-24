const { supabase } = require('../utils/supabase.js')

class SupabaseModel {
  getAll = async (tableName, select = '*') => {
    const { data, error } = await supabase.from(tableName).select(select)
    return { data, error }
  }

  getOptional = async (tableName, select, limit, order) => {
    const { data, error } = await supabase
      .from(tableName)
      .select(select)
      .limit(Number(limit))
      .order(order, { ascending: false })
    return { data, error }
  }

  search = async (tableName, select, column, value, order) => {
    const { data, error } = await supabase
      .from(tableName)
      .select(select)
      .eq(column, value)
      .order(order, { ascending: false })
    return { data, error }
  }

  create = async (tableName, content) => {
    const { data, error } = await supabase.from(tableName).insert([content])
    return { data, error }
  }

  update = async (tableName, id, updates) => {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .match({ id })
    return { data, error }
  }

  delete = async (tableName, id) => {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .match({ id })
    return { data, error }
  }
}

module.exports = { SupabaseModel }
