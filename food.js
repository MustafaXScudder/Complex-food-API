// MealFinder Class to handle API calls and UI updates
class MealFinder {
    constructor() {
        this.getRandomMeal = function () {
            // Fetch a random meal from MealDB API
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(response => response.json())
                .then(data => {
                    let meal = data.meals[0];
                    this.displayMeal(meal);
                    this.getGroceryStores(); // Fetch grocery stores after getting the meal
                }, bind(this)) // Bind 'this' to maintain scope
                .catch(error => console.log('Error fetching meal:', error));
        };

        this.displayMeal = function (meal) {
            // Display meal name and image
            document.getElementById('meal-name').innerText = meal.strMeal;
            document.getElementById('meal-image').src = meal.strMealThumb;

            // Extract and display ingredients
            let ingredientsList = document.getElementById('ingredients');
            ingredientsList.innerHTML = ''; // Clear previous ingredients

            for (let i = 1; i <= 20; i++) {
                let ingredient = meal['strIngredient' + i];
                let measure = meal['strMeasure' + i];
                if (ingredient && ingredient.trim()) {
                    let listItem = document.createElement('li');
                    listItem.innerText = measure + ' ' + ingredient;
                    ingredientsList.appendChild(listItem);
                }
            }
        };

        this.getGroceryStores = function () {
            // Dummy grocery API call (replace with real API later)
            fetch('https://api.example.com/grocery-stores') // Replace with a real grocery API
                .then(response => response.json())
                .then(data => {
                    this.displayGroceryStores(data.stores);
                }, bind(this))
                .catch(error => console.log('Error fetching grocery stores:', error));
        };

        this.displayGroceryStores = function (stores) {
            let storesList = document.getElementById('grocery-stores');
            storesList.innerHTML = ''; // Clear previous results

            stores.forEach(function (store) {
                let listItem = document.createElement('li');
                listItem.innerText = store.name + ' - ' + store.address;
                storesList.appendChild(listItem);
            });
        };
    }
}

// Initialize MealFinder on button click
document.getElementById('get-meal').addEventListener('click', function() {
    let mealFinder = new MealFinder();
    mealFinder.getRandomMeal();
});
