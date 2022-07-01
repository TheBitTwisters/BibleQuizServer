const mysql = require('../util/mysql')
const BaseModel = require('./BaseModel')

const Answer = class Answer extends BaseModel {
  static get tableName() {
    return 'answers'
  }

  id           = 0          // int
  game_id      = 0          // int REF games.id
  question_id  = 0          // int REF questions.id
  player_id    = 0          // int REF players.id
  answer       = ""         // text
  score        = ""         // tinyint
  submitted_at = Date.now() // datetime : default now()

  static getAllGamesScores() {
    return this.getGameScores(0)
  }

  static getGameScores(game_id = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        var q = new mysql.Query()
        q.select([ 'player_id', 'SUM(score) AS score' ]).from(this.tableName).groupBy([ 'player_id' ]).sortBy({ 'score': 'DESC' })
        if (game_id > 0) {
          q.where({ game_id: game_id })
        }
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

  constructor(param = {}) {
    super(param)
    this.id           = param.id           || 0
    this.game_id      = param.game_id      || 1
    this.question_id  = param.question_id  || 1
    this.player_id    = param.player_id    || 1
    this.answer       = param.answer       || ""
    this.score        = param.score        || 0
    this.submitted_at = param.submitted_at || Date.now()
  }

  toPublicData() {
    return {
      id:           this.id,
      game_id:      this.game_id,
      question_id:  this.question_id,
      player_id:    this.player_id,
      answer:       this.answer,
      score:        this.score,
      submitted_at: this.submitted_at
    }
  }

  toJsonData() {
    return {
      game_id:     this.game_id,
      question_id: this.question_id,
      player_id:   this.player_id,
      answer:      this.answer,
      score:       this.score
    }
  }
}

module.exports = Answer
