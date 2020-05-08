const API_KEY = "1";

function fetchMeals(event) {
  event.preventDefault();
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?";
  const mealName = event.target[0].value;
  if (!mealName) {
    window.alert("Type the name of a meal!");
    return;
  }
  const options = {
    method: "GET",
    headers: {},
  };
  fetch(url + `s=${mealName}`, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((data) => {
      console.log(data);
      if (!data.meals) {
        throw new Error("No meal found");
      }
      if (!data.meals.length === 0) {
        throw new Error("No meal found");
      }
      const results = document.querySelector(".js-search-results");
      results.innerHTML = "";
      for (let meal of data.meals) {
        results.innerHTML += `
        <div>
          <ul>
            <li>Name: ${meal.strMeal}</li>
            <li>Meal area: ${meal.strArea}</li>
            <li>Instructions: </li>
            <li>${meal.strInstructions}</li>
            <li>Meal's picture: <img src="${meal.strMealThumb}" alt="meal-photo" /></li>
          </ul>
        </div>
        `;
      }
    })
    .catch((err) => {
      const results = document.querySelector(".js-search-results");
      results.innerHTML = "";
      results.innerHTML = "Results not found";
      console.log(err);
    });
}

function registerForm() {
  const form = document.querySelector(".js-search-form");
  form.addEventListener("submit", fetchMeals);
}

window.addEventListener("DOMContentLoaded", () => {
  registerForm();
});
