$(function(){

  Recipes.all();
  View.init();
});

// // // // // // //

// VIEW OBJECT
function View() {};
View.init = function() {
  // recipe form submit event listener
  $("#newRecipe").on("submit", function(e){
    e.preventDefault();
    var recipeParams = $(this).serialize();
    Recipes.create(recipeParams);
    $("#newRecipe")[0].reset();
    // $("#newRecipe").focus();
  });
}
View.render = function(items, parentId, templateId) {
  var template = _.template($("#" + templateId).html());
  $("#" + parentId).html(template({collection: items}));
};


function Recipes() {};
Recipes.all = function() {
  $.get("/recipes", function (res){ 
    var recipes = JSON.parse(res);

    View.render(recipes, "recipe-ul", "recipeTemp");
  });
}

Recipes.create = function(recipeParams) {
  $.post("/recipes", recipeParams).done(function(res){

    Recipes.all();
  });
}

Recipes.delete = function(recipe) {
  var recipeId = $(recipe).data().id;
  $.ajax({
    url: '/recipes/' + recipeId,
    type: 'DELETE',
    success: function(res) {
      Recipes.all();
    }
  });
};

Recipes.update = function(e, form){
  e.preventDefault();
  // pull the values we want out of form
  var $form = $(form);
  var recipeId = $form.data().recipeId;
  var newRecipeName = $form.find("input[name='recipeName']").val();
  var newIngredients = $form.find("input[name='ingredients']").val();
  var newInstructions = $form.find("input[name='instructions']").val();
  // send a POST request with the form values
  $.post("/update", {id: recipeId, recipeName: newRecipeName, ingredients: newIngredients, instructions: newInstructions})
  .done(function(res){
    // once done, re-render everything
    Recipes.all();
  });
}