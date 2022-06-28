const BaseModel = require('./BaseModel')

const Manager = class Manager extends BaseModel {
  static get tableName() {
    return 'managers'
  }

  id   = 0  // int
  name = "" // varchar(16)
  pin  = "" // varchar(255)

  constructor(param = {}) {
    super(param)
    this.id   = param.id   || 0
    this.name = param.name || ""
    this.pin  = param.pin  || ""
  }

  toPublicData() {
    return {
      id:   this.id,
      name: this.name,
      pin:  this.pin
    }
  }

  toJsonData() {
    return {
      name: this.name,
      pin:  this.pin
    }
  }
}

module.exports = Manager
