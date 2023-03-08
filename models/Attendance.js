const { BaseModel } = require('@thebittwisters/bitmysql');

const Attendance = class Attendance extends BaseModel {
  static get tableName() {
    return 'attendances';
  }
  static get sortBy() {
    return {
      name: 'ASC',
    };
  }

  id = 0; // int
  game_id = 0; // int REF games.id
  member_id = 0; // int REF members.id
  group_id = 0; // int REF groups.id
  name = ''; // varchar(16)
  pass = ''; // varchar(16)

  constructor(param = {}) {
    super(param);
    this.id = param.id || 0;
    this.game_id = param.game_id || 0;
    this.member_id = param.member_id || 0;
    this.group_id = param.group_id || 0;
    this.name = param.name || '';
    this.pass = param.pass || '';
  }

  toPublicData() {
    return {
      id: this.id,
      game_id: this.game_id,
      member_id: this.member_id,
      group_id: this.group_id,
      name: this.name,
    };
  }

  toJsonData() {
    var data = {
      game_id: this.game_id,
      name: this.name,
      pass: this.pass,
    };
    if (this.member_id > 0) {
      data.member_id = this.member_id;
    }
    if (this.group_id > 0) {
      data.group_id = this.group_id;
    }
    return data;
  }
};

module.exports = Attendance;
