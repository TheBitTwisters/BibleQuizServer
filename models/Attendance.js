const BaseModel = require('./BaseModel')

const Attendance = class Attendance extends BaseModel {
  static get tableName() {
    return 'attendances'
  }

  id        = 0 // int
  game_id   = 0 // int REF games.id
  player_id = 0 // int REF players.id

  constructor(param = {}) {
    super(param)
    this.id        = param.id        || 0
    this.game_id   = param.game_id   || 0
    this.player_id = param.player_id || 0
  }

  toPublicData() {
    return {
      id:        this.id,
      game_id:   this.game_id,
      player_id: this.player_id
    }
  }

  toJsonData() {
    return {
      game_id:   this.game_id,
      player_id: this.player_id
    }
  }
}

module.exports = Attendance
