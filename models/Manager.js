const bitmysql = require('@thebittwisters/bitmysql');
const { BaseModel } = require('@thebittwisters/bitmysql');

const Manager = class Manager extends BaseModel {
  static get tableName() {
    return 'managers';
  }

  id = 0; // int
  name = ''; // varchar(64)
  pin = ''; // varchar(60)

  constructor(param = {}) {
    super(param);
    this.id = param.id || 0;
    this.name = param.name || '';
    this.pin = param.pin || '';
  }

  toPublicData() {
    return {
      id: this.id,
      name: this.name,
    };
  }

  toJsonData() {
    return {
      name: this.name,
    };
  }
};

module.exports = Manager;
