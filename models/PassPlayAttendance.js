const { BaseModel } = require('@thebittwisters/bitmysql');

const PassPlayAttendance = class PassPlayAttendance extends BaseModel {
  static get tableName() {
    return 'passplay_attendance';
  }
  static get sortBy() {
    return {
      question_id: 'ASC',
      attendance_id: 'ASC',
    };
  }

  id = 0; // int
  question_id = 0; // int REF questions.id
  attendance_id = 0; // int REF attendances.id
  play = 0; // tinyint(1)

  constructor(param = {}) {
    super(param);
    this.id = param.id || 0;
    this.question_id = param.question_id || 0;
    this.attendance_id = param.attendance_id || 0;
    this.play = param.play || 0;
  }

  toPublicData() {
    return {
      id: this.id,
      question_id: this.question_id,
      attendance_id: this.attendance_id,
      play: this.play,
    };
  }

  toJsonData() {
    var data = {
      question_id: this.question_id,
      attendance_id: this.attendance_id,
      play: this.play,
    };
    return data;
  }
};

module.exports = PassPlayAttendance;
