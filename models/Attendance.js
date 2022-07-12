const BaseModel = require('./BaseModel')

const Attendance = class Attendance extends BaseModel {
  static get tableName() {
    return 'attendances'
  }

  id      = 0 // int
  game_id = 0 // int REF games.id
  user_id = 0 // int REF players.id

  constructor(param = {}) {
    super(param)
    this.id      = param.id      || 0
    this.game_id = param.game_id || 0
    this.user_id = param.user_id || 0
  }

  toPublicData() {
    return {
      id:      this.id,
      game_id: this.game_id,
      user_id: this.user_id
    }
  }

  toJsonData() {
    return {
      game_id: this.game_id,
      user_id: this.user_id
    }
  }
}

module.exports = Attendance
