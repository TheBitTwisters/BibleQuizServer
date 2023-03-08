const { BaseModel } = require('@thebittwisters/bitmysql');

const Group = class Group extends BaseModel {
  static get tableName() {
    return 'groups';
  }
  static get sortBy() {
    return {
      name: 'ASC',
    };
  }

  id = 0; // int
  active = 1; // tinyint(1)
  name = ''; // varchar(64)
  created_at = Date.now(); // datetime : default now()

  constructor(param = {}) {
    super(param);
    this.id = param.id || 0;
    this.active = param.active || 1;
    this.name = param.name || '';
    this.created_at = param.created_at || Date.now();
  }

  toPublicData() {
    return {
      id: this.id,
      active: this.active,
      name: this.name,
      created_at: this.created_at,
    };
  }

  toJsonData() {
    return {
      active: this.active,
      name: this.name,
    };
  }
};

module.exports = Group;
