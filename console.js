var REPL = require("repl");
var db = require("./models");

var repl = REPL.start("Recipe > ");
repl.context.db = db;

repl.on("exit", function () {
  console.log("GOODBYE!!");
  process.exit();
});
