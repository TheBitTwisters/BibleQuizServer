const mysql = require('../util/mysql')
const BaseModel = require('./BaseModel')

const Question = class Question extends BaseModel {
  static get tableName() {
    return 'questions'
  }
  static get sortBy() {
    return {
      'order': 'ASC'
    }
  }

  id         = 0          // int
  active     = true       // tinyint(1)
  passplay   = false      // tinyint(1)
  game_id    = 0          // int REF games.id
  level_id   = 0          // int REF levels.id
  type_id    = 0          // int REF quest_types.id
  order      = 0          // tinyint
  question   = ""         // text
  reference  = ""         // varchar(255)
  score      = ""         // tinyint
  created_at = Date.now() // datetime : default now()
  locked_at  = null       // datetime : default null

  constructor(param = {}) {
    super(param)
    this.id         = param.id         || 0
    this.active     = param.active     || 1
    this.passplay   = param.passplay   || 0
    this.game_id    = param.game_id    || 1
    this.level_id   = param.level_id   || 1
    this.type_id    = param.type_id    || 1
    this.order      = param.order      || 0
    this.question   = param.question   || ""
    this.reference  = param.reference  || ""
    this.score      = param.score      || 0
    this.created_at = param.created_at || Date.now()
    this.locked_at  = param.locked_at  || null
  }

  lock() {
    return new Promise(async (resolve, reject) => {
      try {
        var result = false
        if (this.id > 0) {
          var q = new mysql.CustomQuery()
          var sql = 'UPDATE questions SET locked_at = NOW() WHERE id=?'
          q.setSql(sql)
          q.setParams({ id: this.id })
          await q.execute()
          result = q.results.changedRows > 0
        }
        resolve(result)
      } catch (err) {
        console.error(err)
        reject({
          err: true,
          code: 503,
          message: 'Internal(DB) server error'
        })
      }
    })
  }

  toPublicData() {
    return {
      id:         this.id,
      active:     this.active,
      passplay:   this.passplay,
      game_id:    this.game_id,
      level_id:   this.level_id,
      type_id:    this.type_id,
      order:      this.order,
      question:   this.question,
      reference:  this.reference,
      score:      this.score,
      created_at: this.created_at,
      locked_at:  this.locked_at
    }
  }

  toJsonData() {
    return {
      active:    this.active,
      passplay:  this.passplay,
      game_id:   this.game_id,
      level_id:  this.level_id,
      type_id:   this.type_id,
      order:     this.order,
      question:  this.question,
      reference: this.reference,
      score:     this.score
    }
  }
}

module.exports = Question
