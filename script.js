"use strict";

const searchForm = document.querySelector("#searchForm");
const startDateInput = document.querySelector("#startDate");
const endDateInput = document.querySelector("#endDate");
const resultsContainer = document.querySelector("#results");

const displayResults = (data) => {
  resultsContainer.innerHTML = "";

  if (data.data && data.data.length > 0) {
    data.data.forEach((person) => {
      const userDiv = createUserCard(person);
      resultsContainer.appendChild(userDiv);
    });
  } else {
    resultsContainer.textContent = "Користувачі не знайдені 😒";
  }
};

const createUserCard = (person) => {
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-card");
  userDiv.innerHTML = `
      <h2>${person.firstname} ${person.lastname}</h2>
      <p>${createField("email", person.email)}</p>
      <p>${createField("phone", person.phone)}</p>
      <p>${createField("birth", person.birthday)}</p>
      <p>${createField("gender", person.gender)}</p>
      <p>${createField("web", person.website)}</p>
    `;
  return userDiv;
};

const createField = (fieldName, value) => {
  const fieldIcon = getIconForField(fieldName, value);
  return `<img src="${fieldIcon}" alt="${fieldName}"> ${value}`;
};

const getIconForField = (fieldName, value) => {
  if (fieldName === "gender") {
    return `./imgs/${getGenderIconFileName(value)}.svg`;
  }
  return `./imgs/${fieldName}.svg`;
};

const getGenderIconFileName = (gender) => {
  const genderLowerCase = gender.toLowerCase();
  return genderLowerCase === "female"
    ? "female"
    : genderLowerCase === "male"
    ? "male"
    : "unknown";
};

const fetchDataAndDisplayResults = async () => {
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;

  try {
    const response = await fetch(
      `https://fakerapi.it/api/v1/persons?_birthday_start=${startDate}&_birthday_end=${endDate}`
    );

    if (!response.ok) {
      throw new Error(`Помилка відповіді від сервера: ${response.status}`);
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Помилка під час виконання запиту:", error);
  }
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchDataAndDisplayResults();
});
