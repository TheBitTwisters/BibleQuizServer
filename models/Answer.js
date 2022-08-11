const moment    = require('moment')
const mysql     = require('../util/mysql')
const BaseModel = require('./BaseModel')

const Answer = class Answer extends BaseModel {
  static get tableName() {
    return 'answers'
  }

  id            = 0          // int
  game_id       = 0          // int REF games.id
  question_id   = 0          // int REF questions.id
  attendance_id = 0          // int REF attendances.id
  answer        = ""         // text
  score         = ""         // tinyint
  submitted_at  = Date.now() // datetime : default now()

  static getGameScores(game_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var q = new mysql.CustomQuery()
        q.setSql(`
          SELECT T.name, SUM(A.score) score
            FROM answers A INNER JOIN attendances T ON T.id = A.attendance_id
           WHERE A.game_id = ?
        GROUP BY T.id ORDER BY score DESC, T.name ASC
        `)
        q.setParams({ game_id: game_id })
        await q.execute()
        var results = q.getList()
        var list = []
        for (var result of results) {
          list.push(result)
        }
        resolve(list)
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

  static getQuestionAnswers(question_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var q = new mysql.Query()
        q.select('*').from(this.tableName).where({ question_id: question_id }).sortBy({ 'id': 'ASC' })
        await q.execute()
        var results = q.getList()
        var list = []
        for (var result of results) {
          list.push(new this(result))
        }
        resolve(list)
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

  static submit(params) {
    return new Promise(async (resolve, reject) => {
      try {
        this.search({
          question_id: params.question_id,
          user_id:     params.user_id
        }, {}).then(async (list) => {
          var answer = new this(params)
          answer.submitted_at = moment().utc().format('YYYY-MM-DD HH:mm:ss')
          if (list.length > 0) {
            answer = list[0]
            answer.answer = params.answer
            answer.submitted_at = moment().utc().format('YYYY-MM-DD HH:mm:ss')
          }
          await answer.save()
          resolve(answer)
        })
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

  constructor(param = {}) {
    super(param)
    this.id           = param.id           || 0
    this.game_id      = param.game_id      || 1
    this.question_id  = param.question_id  || 1
    this.user_id      = param.user_id      || 1
    this.answer       = param.answer       || ""
    this.score        = param.score        || 0
    this.submitted_at = param.submitted_at || Date.now()
  }

  toPublicData() {
    return {
      id:           this.id,
      game_id:      this.game_id,
      question_id:  this.question_id,
      user_id:      this.user_id,
      answer:       this.answer,
      score:        this.score,
      submitted_at: this.submitted_at
    }
  }

  toJsonData() {
    return {
      game_id:      this.game_id,
      question_id:  this.question_id,
      user_id:      this.user_id,
      answer:       this.answer,
      score:        this.score,
      submitted_at: this.submitted_at
    }
  }
}

module.exports = Answer
