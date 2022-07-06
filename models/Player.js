const BaseModel = require('./BaseModel')

const Player = class Player extends BaseModel {
  static get tableName() {
    return 'players'
  }
  static get sortBy() {
    return {
      'fullname': 'ASC'
    }
  }

  id        = 0          // int
  active    = true       // tinyint(1)
  name      = ""         // varchar(64)
  fullname  = ""         // varchar(255)
  joined_at = Date.now() // datetime : default now()

  constructor(param = {}) {
    super(param)
    this.id        = param.id        || 0
    this.active    = param.active    || 1
    this.name      = param.name      || ""
    this.fullname  = param.fullname  || ""
    this.joined_at = param.joined_at || Date.now()
  }

  toPublicData() {
    return {
      id:        this.id,
      active:    this.active,
      name:      this.name,
      fullname:  this.fullname,
      joined_at: this.joined_at
    }
  }

  toJsonData() {
    return {
      active:   this.active,
      name:     this.name,
      fullname: this.fullname
    }
  }
}

module.exports = Player
