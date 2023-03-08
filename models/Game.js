const { BaseModel } = require('@thebittwisters/bitmysql');

const Game = class Game extends BaseModel {
  static get tableName() {
    return 'games';
  }

  id = 0; // int
  active = 1; // tinyint(1)
  title = ''; // varchar(64)
  date = ''; // date : default curdate()
  current_question_id = 0; // int (REF) questions.id
  created_at = Date.now(); // datetime : default now()

  constructor(param = {}) {
    super(param);
    this.id = param.id || 0;
    this.active = param.active || 1;
    this.title = param.title || '';
    this.date = param.date || '';
    this.current_question_id = param.current_question_id || 0;
    this.created_at = param.created_at || Date.now();
  }

  toPublicData() {
    return {
      id: this.id,
      active: this.active,
      title: this.title,
      date: this.date,
      current_question_id: this.current_question_id,
      created_at: this.created_at,
    };
  }

  toJsonData() {
    return {
      active: this.active,
      title: this.title,
      date: this.date,
      current_question_id: this.current_question_id,
    };
  }
};

module.exports = Game;
