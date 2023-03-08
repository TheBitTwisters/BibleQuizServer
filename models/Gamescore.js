const { BaseModel, Queries } = require('@thebittwisters/bitmysql');

const Gamescore = class Gamescore extends BaseModel {
  static get tableName() {
    return 'gamescores';
  }
  static get sortBy() {
    return {
      score: 'DESC',
    };
  }

  id = 0; // int
  game_id = 0; // int
  group_id = 0; // int
  score = 0; // tinyint

  static getAllScores() {
    return new Promise(async (resolve, reject) => {
      try {
        var q = new Queries.CustomQuery();
        q.setSql(`
          SELECT G.name, SUM(S.score) score
            FROM gamescores S INNER JOIN groups G ON G.id = S.group_id
        GROUP BY S.group_id ORDER BY score DESC, G.name ASC
        `);
        await q.execute();
        var results = q.getList();
        var list = [];
        for (var result of results) {
          list.push(result);
        }
        resolve(list);
      } catch (err) {
        console.error(err);
        reject({
          err: true,
          code: 503,
          message: 'Internal(DB) server error',
        });
      }
    });
  }

  constructor(param = {}) {
    super(param);
    this.id = param.id || 0;
    this.game_id = param.game_id || 0;
    this.group_id = param.group_id || 0;
    this.score = param.score || 0;
  }

  toPublicData() {
    return {
      id: this.id,
      game_id: this.game_id,
      group_id: this.group_id,
      score: this.score,
    };
  }

  toJsonData() {
    return {
      id: this.id,
      game_id: this.game_id,
      group_id: this.group_id,
      score: this.score,
    };
  }
};

module.exports = Gamescore;
