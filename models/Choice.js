const BaseModel = require('./BaseModel')

const Choice = class Choice extends BaseModel {
  static get tableName() {
    return 'choices'
  }
  static get sortBy() {
    return {
      'id': 'ASC'
    }
  }

  id          = 0  // int
  question_id = 0  // int REF questions.id
  label       = "" // varchar(8)
  value       = "" // text
  is_answer   = 0  // tinyint(1)

  constructor(param = {}) {
    super(param)
    this.id          = param.id          || 0
    this.question_id = param.question_id || 1
    this.label       = param.label       || ""
    this.value       = param.value       || ""
    this.is_answer   = param.is_answer   || 0
  }

  toPublicData() {
    return {
      id:          this.id,
      question_id: this.question_id,
      label:       this.label,
      value:       this.value
    }
  }

  toJsonData() {
    return {
      question_id: this.question_id,
      label:       this.label,
      value:       this.value,
      is_answer:   this.is_answer
    }
  }
}

module.exports = Choice
