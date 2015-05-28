var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Project1_Homemade");


var recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    default: ""
  },
  ingredients: {
    type: String,
    default: ""
  },
  instructions: {
    type: String,
    default: ""
  }
});

var Recipe = mongoose.model("Recipe", recipeSchema);

module.exports.Recipe = Recipe;