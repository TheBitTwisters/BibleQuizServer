const BaseModel = require('./BaseModel')

const QuestType = class QuestType extends BaseModel {
  static get tableName() {
    return 'quest_types'
  }
  static get sortBy() {
    return {
      'choices_count': 'DESC',
      'name'         : 'ASC'
    }
  }

  id            = 0  // int
  name          = "" // varchar(32)
  choices_count = 1  // tinyint(1)

  constructor(param = {}) {
    super(param)
    this.id            = param.id   || 0
    this.name          = param.name || ""
    this.choices_count = param.choices_count || 1
  }

  toPublicData() {
    return {
      id:            this.id,
      name:          this.name,
      choices_count: this.choices_count
    }
  }

  toJsonData() {
    return {
      name:          this.name,
      choices_count: this.choices_count
    }
  }
}

module.exports = QuestType
