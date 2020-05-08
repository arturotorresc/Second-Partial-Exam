const API_KEY = "1";

function fetchMeals(event) {
  event.preventDefault();
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?";
  const mealName = event.target[0].value;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
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
