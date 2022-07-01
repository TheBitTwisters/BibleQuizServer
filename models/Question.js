const BaseModel = require('./BaseModel')

const Question = class Question extends BaseModel {
  static get tableName() {
    return 'questions'
  }
  static get sortBy() {
    return {
      'id': 'ASC'
    }
  }

  id         = 0          // int
  active     = true       // tinyint(1)
  game_id    = 0          // int REF games.id
  level_id   = 0          // int REF levels.id
  type_id    = 0          // int REF quest_types.id
  question   = ""         // text
  reference  = ""         // varchar(255)
  score      = ""         // tinyint
  created_at = Date.now() // datetime : default now()

  constructor(param = {}) {
    super(param)
    this.id         = param.id         || 0
    this.active     = param.active     || 1
    this.game_id    = param.game_id    || 1
    this.level_id   = param.level_id   || 1
    this.type_id    = param.type_id    || 1
    this.question   = param.question   || ""
    this.reference  = param.reference  || ""
    this.score      = param.score      || 0
    this.created_at = param.created_at || Date.now()
  }

  toPublicData() {
    return {
      id:         this.id,
      active:     this.active,
      game_id:    this.game_id,
      level_id:   this.level_id,
      type_id:    this.type_id,
      question:   this.question,
      reference:  this.reference,
      score:      this.score,
      created_at: this.created_at
    }
  }

  toJsonData() {
    return {
      active:    this.active,
      game_id:   this.game_id,
      level_id:  this.level_id,
      type_id:   this.type_id,
      question:  this.question,
      reference: this.reference,
      score:     this.score
    }
  }
}

module.exports = Question
