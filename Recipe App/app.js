let searchBox = document.querySelector('.searchBox');
let searchBtn = document.querySelector('#btn');
let recipeContainer = document.querySelector('.container');
let recipeDetailsContent = document.querySelector('.recipe-details-content');
let recipeCloseBtn = document.querySelector('.close');



const fetchRecipes = async(query) => {
    recipeContainer.innerHTML = '<h2>Fetching recipes...</h2>'

    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeContainer.innerHTML = '';
    response.meals.forEach((meal) =>{
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `;

        const button = document.createElement('button');
        button.textContent = 'View recipe';
        recipeDiv.appendChild(button);

        //Adding event listener
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv);
    });}
    catch(error){
        recipeContainer.innerHTML = '<h2>Error in fetching recipes...</h2>'
    }
}
//fetches ingredients
const fetchIngredients = (meal) =>{
    let ingredientList = '';
    for(let i = 1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientList;
} 

const openRecipePopup = (meals) =>{
    recipeDetailsContent.innerHTML = `
    <h2 class='recipeName'>${meals.strMeal}</h2>
    <h3>Ingredients: </h3>
    <ul class='ingredientsList'>${fetchIngredients(meals)}</ul>
    <div class='recipeInstructions'>
        <h3>Instructions: </h3>
        <p>${meals.strInstructions}</p>
    </div>
    `

    recipeDetailsContent.parentElement.style.display = 'block';
}


recipeCloseBtn.addEventListener('click', () =>{
    recipeDetailsContent.parentElement.style.display = 'none';
})

searchBtn.addEventListener('click', () =>{
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type any meal in the search box to search</h2>`;
        return;
    }
    fetchRecipes(searchInput);
})