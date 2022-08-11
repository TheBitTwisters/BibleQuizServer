const BaseModel = require('./BaseModel')

const Member = class Member extends BaseModel {
  static get tableName() {
    return 'members'
  }
  static get sortBy() {
    return {
      'last_name': 'ASC',
      'first_name': 'ASC'
    }
  }

  id         = 0          // int
  active     = 1          // tinyint(1)
  group_id   = 0          // int
  name       = ""         // varchar(64)
  last_name  = ""         // varchar(32)
  first_name = ""         // varchar(32)
  joined_at  = Date.now() // datetime : default now()

  constructor(param = {}) {
    super(param)
    this.id         = param.id         || 0
    this.active     = param.active     || 1
    this.group_id   = param.group_id   || 0
    this.name       = param.name       || ""
    this.last_name  = param.last_name  || ""
    this.first_name = param.first_name || ""
    this.joined_at  = param.joined_at  || Date.now()
  }

  setGroup(group_id) {
    return new Promise(async (resolve, reject) => {
      try {
        var result = false
        if (this.id > 0) {
          var q = new mysql.CustomQuery()
          var sql = 'UPDATE users SET group_id=? WHERE id=?'
          q.setSql(sql)
          q.setParams({
            group_id: group_id,
            id: this.id
          })
          await q.execute()
          result = q.results.changedRows > 0
        }
        resolve(result)
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

  toPublicData() {
    return {
      id:         this.id,
      active:     this.active,
      group_id:   this.group_id,
      name:       this.name,
      last_name:  this.last_name,
      first_name: this.first_name,
      joined_at:  this.joined_at
    }
  }

  toJsonData() {
    return {
      active:     this.active,
      name:       this.name,
      last_name:  this.last_name,
      first_name: this.first_name
    }
  }
}

module.exports = Member
