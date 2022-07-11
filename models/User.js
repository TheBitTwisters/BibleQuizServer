const BaseModel = require('./BaseModel')

const User = class User extends BaseModel {
  static get tableName() {
    return 'users'
  }
  static get sortBy() {
    return {
      'fullname': 'ASC'
    }
  }

  id        = 0          // int
  active    = true       // tinyint(1)
  type      = "player"   // varchar(8)
  name      = ""         // varchar(64)
  pin       = ""         // varchar(60)
  fullname  = ""         // varchar(255)
  joined_at = Date.now() // datetime : default now()

  constructor(param = {}) {
    super(param)
    this.id        = param.id        || 0
    this.active    = param.active    || 1
    this.type      = param.type      || "player"
    this.name      = param.name      || ""
    this.pin       = param.pin       || ""
    this.fullname  = param.fullname  || ""
    this.joined_at = param.joined_at || Date.now()
  }

  toPublicData() {
    return {
      id:        this.id,
      active:    this.active,
      type:      this.type,
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

module.exports = User
