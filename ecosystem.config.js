module.exports = {
  apps : [{
    name   : "biblequiz",
    script : "./bq-api.js",
    instances : "4",
    exec_mode : "cluster",
    watch: true
  }]
}
