const mysql = require('mysql2/promise')

const isDebugging = true

const my_config = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME
}

const run = async (sql, params) => {
  var conn, result = false
  if (isDebugging) {
    console.log(`SQL: ${sql}`)
    console.log(`Params: ${params}`)
  }
  try {
    conn = await mysql.createPool(my_config)
    const [rows, fields] = await conn.query(sql, params)
    result = rows
  } finally {
    if (conn != null) conn.end()
    return result
  }
}

module.exports = run
