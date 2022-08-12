let suggestion = [
  "hand",
  "hospitality",
  "rub",
  " transparent",
  "bomber",
  "minimum",
  "warning",
  "comprehensive",
  "proper",
  "reason",
  "functional",
  "season",
  "fan",
  "kid",
  "agent",
  "museum",
  "ensure",
  "hobby",
  "creation",
  "outfit",
  " spy",
  "ridge",
  "double",
  "composer",
  "champagne",
  "harass",
  " absorption",
  " end",
  "sting",
  "stable",
  "mouth",
  " pepper",
  "kick",
  " good",
  "knife",
  "lion",
  "print",
  "horoscope",
  "flatware",
  "unanimous",
  "extend",
  "range",
  "carbon",
  "technique",
  "cute",
  "Mars",
  "chase",
  "What weird thing do you do when nobody else is around?",
  "If you could have any person become a member of your family, who would you choose?",
  "What do you find you recently spend a lot of time wondering about?",
  "What's something that you recently learned that everyone else already knew?",
  "What's an interesting fact that you recently learned?",
  "What challenge would you like to see your best friend take on?",
  "Who have you met only one time that left a huge impression on you?",
  "What's your story about being under intense pressure and how did you handle it?",
  "Do you consider yourself an introvert or an extrovert?",
];
const $ = document;
let inputElem = $.querySelector(".input");
const searchList = $.querySelector(".search-list");

// Filtering suggestion words or sentences
function autoFill() {
  searchList.innerHTML = "";
  let searchValue = inputElem.value;
  if (searchValue) {
    searchList.classList.add("active");
    let filtered = suggestion.filter((word) => {
      return word.toLowerCase().startsWith(searchValue.toLowerCase());
    });
    searchList.innerHTML = filtered;
    suggestionWordsGenerator(filtered);
  } else {
    searchList.classList.remove("active");
  }
}

function suggestionWordsGenerator(wordsArray) {
  let listItems = wordsArray.map(function (word) {
    return `<li class="custom"> ${word} </li>`;
  });
  if (!listItems.length) {
    customSuggest = `<li> ${inputElem.value} </li>`;
  } else {
    customSuggest = listItems.join("");
  }
  searchList.innerHTML = customSuggest;
  selectItem();
}
// Selecting items of list
function selectItem() {
  let allListItems = searchList.querySelectorAll("li");
  allListItems.forEach(function (wordItem) {
    wordItem.addEventListener("click", function (event) {
      inputElem.value = event.target.textContent;
      searchList.classList.remove("active");
      searchList.innerHTML = "";
      // Save your search item
      saveToLocalStorage(event.target.textContent);
    });
  });
}
// Save to local storage
function saveToLocalStorage(userChoice) {
  let userChoiceArray =
    JSON.parse(localStorage.getItem("userChoiceArray")) || [];
  userChoiceArray.push(userChoice);
  if (userChoiceArray.length >= 5) {
    userChoiceArray.shift();
  } else {
    userChoiceArray.push(userChoice);
  }

  localStorage.setItem("userChoiceArray", JSON.stringify(userChoiceArray));
}
// Using items in local storage for Dom
function addSaveLocalToSuggestionOfUser() {
  const userChoiceArray = JSON.parse(localStorage.getItem("userChoiceArray"));
  suggestionWordsGenerator(userChoiceArray);
  searchList.classList.add("active");
}

inputElem.addEventListener("keyup", autoFill);
inputElem.addEventListener("focus", addSaveLocalToSuggestionOfUser);
