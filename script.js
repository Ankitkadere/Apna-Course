
const categoryButtons = document.querySelectorAll(".category-btn");
const coursessearch = document.querySelectorAll(".course-item");
const noMoreCoursesText = document.querySelector("center h2");

function filterCourses(category) {
  let anyVisible = false;
  coursessearch.forEach((course) => {
    if (category === "all" || course.dataset.category === category) {
      course.style.display = "block";
      anyVisible = true;
    } else {
      course.style.display = "none";
    }
  });
  noMoreCoursesText.style.display = anyVisible ? "none" : "block";
}

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active styles and aria-pressed
    categoryButtons.forEach((b) => {
      b.classList.remove("text-[#0f6f61]", "font-bold");
      b.setAttribute("aria-pressed", "false");
    });
    // Add active styles and aria-pressed to clicked
    btn.classList.add("text-[#0f6f61]", "font-bold");
    btn.setAttribute("aria-pressed", "true");

    const filter = btn.getAttribute("data-filter");
    filterCourses(filter);
  });
});

// Initialize: show all courses by default and no active category
// Show all courses and no category selected initially
filterCourses("all");




const courses = ["English Speaking", "Telly", "DCA", "PGDCA", "11th", "12th"];
const input = document.getElementById("search");
const suggestionsList = document.getElementById("suggestions-list");

function filterSuggestions() {
  const value = input.value.toLowerCase();
  suggestionsList.innerHTML = "";
  if (!value) {
    suggestionsList.classList.add("hidden");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-activedescendant", "");
    return;
  }
  // Filter courses that include the input value anywhere (not just startsWith)
  const filtered = courses.filter((course) =>
    course.toLowerCase().includes(value)
  );
  if (filtered.length === 0) {
    suggestionsList.classList.add("hidden");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-activedescendant", "");
    return;
  }
  filtered.forEach((course, index) => {
    const li = document.createElement("li");
    li.setAttribute("role", "option");
    li.id = `suggestion-${index}`;
    li.tabIndex = -1;
    li.className =
      "px-4 py-2 cursor-pointer hover:bg-[#e6f4f1] focus:bg-[#cde9e4] focus:outline-none";
    li.textContent = course;
    li.addEventListener("click", () => {
      input.value = course;
      suggestionsList.classList.add("hidden");
      input.setAttribute("aria-expanded", "false");
      input.setAttribute("aria-activedescendant", "");
      input.focus();
    });
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        li.click();
      }
    });
    suggestionsList.appendChild(li);
  });
  suggestionsList.classList.remove("hidden");
  input.setAttribute("aria-expanded", "true");
  input.setAttribute("aria-activedescendant", "");
}

function handleKeyDown(e) {
  const options = Array.from(suggestionsList.querySelectorAll("li"));
  if (suggestionsList.classList.contains("hidden")) return;

  let currentIndex = options.findIndex(
    (option) => option === document.activeElement
  );

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (currentIndex < options.length - 1) {
      options[currentIndex + 1].focus();
      input.setAttribute("aria-activedescendant", options[currentIndex + 1].id);
    } else if (currentIndex === -1 && options.length > 0) {
      options[0].focus();
      input.setAttribute("aria-activedescendant", options[0].id);
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (currentIndex > 0) {
      options[currentIndex - 1].focus();
      input.setAttribute("aria-activedescendant", options[currentIndex - 1].id);
    } else if (currentIndex === 0) {
      input.focus();
      input.setAttribute("aria-activedescendant", "");
    }
  } else if (e.key === "Enter") {
    if (currentIndex >= 0) {
      e.preventDefault();
      input.value = options[currentIndex].textContent;
      suggestionsList.classList.add("hidden");
      input.setAttribute("aria-expanded", "false");
      input.setAttribute("aria-activedescendant", "");
      input.focus();
    }
  } else if (e.key === "Escape") {
    suggestionsList.classList.add("hidden");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-activedescendant", "");
    input.focus();
  }
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("#search") && !e.target.closest("#suggestions-list")) {
    suggestionsList.classList.add("hidden");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-activedescendant", "");
  }
});

// Course list by search
