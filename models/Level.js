const { BaseModel } = require('@thebittwisters/bitmysql');

const Level = class Level extends BaseModel {
  static get tableName() {
    return 'levels';
  }
  static get sortBy() {
    return {
      score: 'ASC',
    };
  }

  id = 0; // int
  name = ''; // varchar(32)
  score = 1; // tinyint

  constructor(param = {}) {
    super(param);
    this.id = param.id || 0;
    this.name = param.name || '';
    this.score = param.score || '';
  }

  toPublicData() {
    return {
      id: this.id,
      name: this.name,
      score: this.score,
    };
  }

  toJsonData() {
    return {
      name: this.name,
      score: this.score,
    };
  }
};

module.exports = Level;
