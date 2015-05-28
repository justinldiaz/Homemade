var express = require("express"),
  bodyParser = require("body-parser"),
  path = require("path"),
  _ = require("underscore"),
  db = require("./models");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("bower_components"));


var views = path.join(process.cwd(), "views");

var recipe = [
              {
                recipeName: "10 Empenadas:",
                ingredients: "1 lbs ground beef, 1/3 cup of tomato sause, chopped onions, chopped olives, cubanitas tortia discs, cooking oil, table spoon of adobo.",
                instructions: "Cook pound of beef and add tomato sause, onions, olives and adobo to meat. then separate the tortia discs. after meat is cooked, put coocking oil into frying pan. use spoon to put meat onto tortia disc. fold disc over and use for to close-press tortia. put uncooked empenada into frying pan. let fry for 1 min 30 sec or until golden brown. repeat until you are out of meat or tortias. voila."
              },
              {
                recipeName: "10 Empenadas:",
                ingredients: "1 lbs ground beef, 1/3 cup of tomato sause, chopped onions, chopped olives, cubanitas tortia discs, cooking oil, table spoon of adobo,",
                instructions: "Cook pound of beef and add tomato sause, onions, olives and adobo to meat. then separate the tortia discs. after meat is cooked, put coocking oil into frying pan. use spoon to put meat onto tortia disc. fold disc over and use for to close-press tortia. put uncooked empenada into frying pan. let fry for 1 min 30 sec or until golden brown. repeat until you are out of meat or tortias. voila."
              },
              {
                recipeName: "10 Empenadas:",
                ingredients: "1 lbs ground beef, 1/3 cup of tomato sause, chopped onions, chopped olives, cubanitas tortia discs, cooking oil, table spoon of adobo,",
                instructions: "Cook pound of beef and add tomato sause, onions, olives and adobo to meat. then separate the tortia discs. after meat is cooked, put coocking oil into frying pan. use spoon to put meat onto tortia disc. fold disc over and use for to close-press tortia. put uncooked empenada into frying pan. let fry for 1 min 30 sec or until golden brown. repeat until you are out of meat or tortias. voila."
              },
            ];



function addRecipes(recipeList){
  for (var i=0; i<recipeList.length; i++){
    db.Recipe.create({recipeName: recipeList[i].recipeName, ingredients: recipeList[i].ingredients, instructions: recipeList[i].instructions});
  }
}

app.get("/", function (req, res) {
  var homePath = path.join(views, "index.html");
  res.sendFile(homePath);
});

app.get("/recipes", function (req, res){
  // var recipesPath = path.join(views, "recipes.html");
  // res.sendFile(recipesPath);
  db.Recipe.find({}, function (err, results){
    res.send(JSON.stringify(results));
  });
});

// app.get("/recipes.json", function (req, res){
//   // var recipesPath = path.join(views, "recipes.html");
//   // res.sendFile(recipesPath);
//   //db.Recipe.find({}, function (err, results){
//     console.log("got to /recipes.json")
//     db.Recipe.find({}, function (err, recipes){
//       console.log(err);
//       res.send(recipes);
//     });
//   //})
// });

app.post("/recipes", function (req, res){
  // find new Recipe in the req.body
  var newRecipe = req.body;
  console.log(newRecipe);
  // add the new Recipe to our db
  db.Recipe.create(newRecipe);
  // respond with the created object as json string
  res.send(JSON.stringify(newRecipe));
});



app.post("/update", function(req, res){
  console.log("updating recipes with these params", req.body);
  db.Recipe.findById(req.body.id, function (err, phrase) {
    if (err) {
      res.status(500).send({ error: 'database find error' });
    } else {
      if (req.body.recipeName) {
        Recipe.recipeName = req.body.recipeName;
      }
      if (req.body.ingredients){
        Recipe.ingredients = req.body.ingredients;
      }
      if (req.body.instructions){
        Recipe.instructions = req.body.instructions;
      }
      // save the updated document
      Recipe.save(function (err) {
        if (err){
          res.status(500).send({ error: 'database save error' });
        }
      });
    }
  });
  res.status(200).send();
});


app.delete("/recipes/:id", function (req, res){
  db.Recipe.remove({_id: req.params.id}, function(err, results){
    if (err){
      res.status(500).send({ error: 'database error' });
    } else {
      res.status(200).send();
    }
  });
});

app.listen(3000, function () {
  console.log("WORKING");
});