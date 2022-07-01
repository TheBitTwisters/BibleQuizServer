const BaseModel = require('./BaseModel')

const Manager = class Manager extends BaseModel {
  static get tableName() {
    return 'managers'
  }

  id              = 0          // int
  name            = ""         // varchar(16)
  pin             = ""         // varchar(255)
  current_game_id = 0          // int (REF) games.id
  last_active_at  = Date.now() // datetime : default now()

  constructor(param = {}) {
    super(param)
    this.id              = param.id              || 0
    this.name            = param.name            || ""
    this.pin             = param.pin             || ""
    this.current_game_id = param.current_game_id || 0
    this.last_active_at  = param.last_active_at  || Date.now()
  }

  toPublicData() {
    return {
      id:              this.id,
      name:            this.name,
      current_game_id: this.current_game_id,
      last_active_at:  this.last_active_at
    }
  }

  toJsonData() {
    return {
      name:            this.name,
      pin:             this.pin,
      current_game_id: this.current_game_id
    }
  }

  setCurrentGame(game_id) {
    this.current_game_id = game_id
    return this.save()
  }
}

module.exports = Manager
