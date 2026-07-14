(function () {
  "use strict";

  const moduleGrid = document.getElementById("module-grid");
  const featurePanels = document.querySelectorAll(".feature-panel");
  let currentOpenPanelName = null;
  let isPanelSwitching = false;

  function openPanel(panelName) {
    if (isPanelSwitching) return;
    if (currentOpenPanelName === panelName) return;
    isPanelSwitching = true;
    featurePanels.forEach((panel) => panel.classList.remove("is-active"));
    const targetPanel = document.getElementById("panel-" + panelName);
    if (targetPanel) {
      targetPanel.classList.add("is-active");
      moduleGrid.style.display = "none";
      currentOpenPanelName = panelName;
      targetPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      isPanelSwitching = false;
    }, 150);
  }

  function closePanel() {
    featurePanels.forEach((panel) => panel.classList.remove("is-active"));
    moduleGrid.style.display = "grid";
    currentOpenPanelName = null;
  }

  moduleGrid.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".module-card");
    if (!clickedCard) return;
    openPanel(clickedCard.dataset.panel);
  });

  document.querySelectorAll("[data-back]").forEach((backButton) => {
    backButton.addEventListener("click", closePanel);
  });

  const themeSwitch = document.getElementById("theme-switch");

  function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }
  function setTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    try {
      localStorage.setItem("dashboard-theme", themeName);
    } catch (error) {}
    updateBackgroundGlow();
  }
  function toggleTheme() {
    setTheme(getCurrentTheme() === "dark" ? "light" : "dark");
  }
  themeSwitch.addEventListener("click", toggleTheme);
  themeSwitch.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleTheme();
    }
  });

  const clockDateLabel = document.getElementById("clock-day-label");
  const clockDateValue = document.getElementById("clock-date");
  const clockTimeValue = document.getElementById("clock-time");

  function padTwoDigits(number) {
    return number.toString().padStart(2, "0");
  }

  function updateClock() {
    const now = new Date();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    clockDateLabel.textContent = dayNames[now.getDay()];
    clockDateValue.textContent = `${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    let hours12 = now.getHours();
    const amOrPm = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12;
    if (hours12 === 0) hours12 = 12;
    clockTimeValue.textContent = `${padTwoDigits(hours12)}:${padTwoDigits(now.getMinutes())}:${padTwoDigits(now.getSeconds())} ${amOrPm}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  const backgroundGlowEl = document.getElementById("background-glow");
  function getGlowGradientForHour(hourOfDay, themeName) {
    const gradientStopsByTimeOfDay = {
      night: ["#1B2A55", "#12161D"],
      dawn: ["#5B4A7A", "#12161D"],
      morning: ["#3E6E8E", "#12161D"],
      midday: ["#E7A33E", "#12161D"],
      evening: ["#C9605F", "#12161D"],
      dusk: ["#4A3B6B", "#12161D"],
      lateNight: ["#1B2A55", "#12161D"],
    };
    let timeOfDayKey;
    if (hourOfDay < 5) timeOfDayKey = "night";
    else if (hourOfDay < 8) timeOfDayKey = "dawn";
    else if (hourOfDay < 11) timeOfDayKey = "morning";
    else if (hourOfDay < 16) timeOfDayKey = "midday";
    else if (hourOfDay < 19) timeOfDayKey = "evening";
    else if (hourOfDay < 22) timeOfDayKey = "dusk";
    else timeOfDayKey = "lateNight";
    const [innerColor, outerColorDefault] =
      gradientStopsByTimeOfDay[timeOfDayKey];
    const outerColor = themeName === "light" ? "#E7EBEF" : outerColorDefault;
    return `radial-gradient(circle at 15% 0%, ${innerColor}, ${outerColor} 60%)`;
  }
  function updateBackgroundGlow() {
    const currentHour = new Date().getHours();
    backgroundGlowEl.style.background = getGlowGradientForHour(
      currentHour,
      getCurrentTheme(),
    );
  }
  updateBackgroundGlow();
  setInterval(updateBackgroundGlow, 60 * 1000);

  function loadFromStorage(storageKey, fallbackValue) {
    try {
      const rawValue = localStorage.getItem(storageKey);
      return rawValue ? JSON.parse(rawValue) : fallbackValue;
    } catch (error) {
      return fallbackValue;
    }
  }
  function saveToStorage(storageKey, value) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {}
  }

  const TODO_STORAGE_KEY = "dashboard-todos";
  let todoItems = loadFromStorage(TODO_STORAGE_KEY, []);

  const todoTextInput = document.getElementById("todo-text-input");
  const todoAddButton = document.getElementById("todo-add-button");
  const todoListEl = document.getElementById("todo-list");
  const todoModuleStatus = document.getElementById("todo-module-status");

  function renderTodoList() {
    todoListEl.innerHTML = "";
    if (todoItems.length === 0) {
      todoListEl.innerHTML =
        '<div class="empty-state-message">No tasks yet. Add your first one above.</div>';
    } else {
      todoItems.forEach((todoItem) => {
        const listItemEl = document.createElement("li");
        listItemEl.className =
          "todo-item" +
          (todoItem.done ? " is-completed" : "") +
          (todoItem.important ? " is-important" : "");
        listItemEl.dataset.id = todoItem.id;
        listItemEl.innerHTML = `
                <button class="icon-button complete-toggle-button" title="Mark complete">${todoItem.done ? "✅" : "⬜"}</button>
                <span class="todo-item-text"></span>
                <button class="icon-button important-toggle-button ${todoItem.important ? "is-active" : ""}" title="Mark important">★</button>
                <button class="icon-button delete-button" title="Delete">✕</button>
              `;
        listItemEl.querySelector(".todo-item-text").textContent = todoItem.text;
        todoListEl.appendChild(listItemEl);
      });
    }
    const completedCount = todoItems.filter((todoItem) => todoItem.done).length;
    todoModuleStatus.textContent = todoItems.length
      ? `${completedCount} of ${todoItems.length} done`
      : "— open —";
    saveToStorage(TODO_STORAGE_KEY, todoItems);
  }

  function addTodoItem() {
    const inputValue = todoTextInput.value.trim();
    if (!inputValue) return;
    todoItems.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: inputValue,
      done: false,
      important: false,
    });
    todoTextInput.value = "";
    renderTodoList();
  }
  todoAddButton.addEventListener("click", addTodoItem);
  todoTextInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addTodoItem();
  });

  todoListEl.addEventListener("click", (event) => {
    const clickedListItem = event.target.closest(".todo-item");
    if (!clickedListItem) return;
    const itemId = clickedListItem.dataset.id;
    const matchingTodo = todoItems.find((todoItem) => todoItem.id === itemId);
    if (!matchingTodo) return;
    if (event.target.closest(".complete-toggle-button")) {
      matchingTodo.done = !matchingTodo.done;
    } else if (event.target.closest(".important-toggle-button")) {
      matchingTodo.important = !matchingTodo.important;
    } else if (event.target.closest(".delete-button")) {
      todoItems = todoItems.filter((todoItem) => todoItem.id !== itemId);
    }
    renderTodoList();
  });

  renderTodoList();

  const PLANNER_STORAGE_KEY = "dashboard-planner";
  let plannerEntriesByHour = loadFromStorage(PLANNER_STORAGE_KEY, {});
  const plannerHourListEl = document.getElementById("planner-hour-list");
  const plannerModuleStatus = document.getElementById("planner-module-status");
  let plannerSaveDebounceTimer = null;

  function formatHourLabel(hour24) {
    const amOrPm = hour24 >= 12 ? "PM" : "AM";
    let hour12 = hour24 % 12;
    if (hour12 === 0) hour12 = 12;
    return `${padTwoDigits(hour12)}:00 ${amOrPm}`;
  }

  function renderPlanner() {
    plannerHourListEl.innerHTML = "";
    const currentHour = new Date().getHours();
    for (let hour = 6; hour <= 23; hour++) {
      const rowEl = document.createElement("div");
      rowEl.className =
        "planner-hour-row" + (hour === currentHour ? " is-current-hour" : "");
      rowEl.innerHTML = `<div class="hour-label">${formatHourLabel(hour)}</div>`;
      const hourInput = document.createElement("input");
      hourInput.type = "text";
      hourInput.placeholder = "What's happening this hour?";
      hourInput.maxLength = 120;
      hourInput.value = plannerEntriesByHour[hour] || "";
      hourInput.dataset.hour = hour;
      rowEl.appendChild(hourInput);
      plannerHourListEl.appendChild(rowEl);
    }
    const filledSlotCount = Object.values(plannerEntriesByHour).filter(
      (entry) => entry && entry.trim(),
    ).length;
    plannerModuleStatus.textContent = filledSlotCount
      ? `${filledSlotCount} slots planned`
      : "— open —";
  }

  plannerHourListEl.addEventListener("input", (event) => {
    const changedInput = event.target;
    if (changedInput.tagName !== "INPUT") return;
    const hour = changedInput.dataset.hour;
    plannerEntriesByHour[hour] = changedInput.value;
    clearTimeout(plannerSaveDebounceTimer);
    plannerSaveDebounceTimer = setTimeout(() => {
      Object.keys(plannerEntriesByHour).forEach((hourKey) => {
        if (
          !plannerEntriesByHour[hourKey] ||
          !plannerEntriesByHour[hourKey].trim()
        ) {
          delete plannerEntriesByHour[hourKey];
        }
      });
      saveToStorage(PLANNER_STORAGE_KEY, plannerEntriesByHour);
      const filledSlotCount = Object.values(plannerEntriesByHour).filter(
        (entry) => entry && entry.trim(),
      ).length;
      plannerModuleStatus.textContent = filledSlotCount
        ? `${filledSlotCount} slots planned`
        : "— open —";
    }, 400);
  });

  renderPlanner();
  setInterval(renderPlanner, 60 * 1000);

  const QUOTE_LIBRARY = [
    [
      "The way to get started is to quit talking and begin doing.",
      "Walt Disney",
    ],
    ["Well done is better than well said.", "Benjamin Franklin"],
    ["Focus on being productive instead of busy.", "Tim Ferriss"],
    ["Action is the foundational key to all success.", "Pablo Picasso"],
    [
      "You don't have to be great to start, but you have to start to be great.",
      "Zig Ziglar",
    ],
    [
      "Small daily improvements are the key to staggering long-term results.",
      "James Clear",
    ],
    ["The secret of getting ahead is getting started.", "Mark Twain"],
    [
      "Discipline is choosing between what you want now and what you want most.",
      "Abraham Lincoln",
    ],
    ["Until we can manage time, we can manage nothing else.", "Peter Drucker"],
    [
      "Amateurs sit and wait for inspiration; the rest of us just get up and go to work.",
      "Stephen King",
    ],
    [
      "Productivity is never an accident. It is always the result of a commitment to excellence.",
      "Paul J. Meyer",
    ],
    ["Either you run the day, or the day runs you.", "Jim Rohn"],
    ["Don't watch the clock; do what it does. Keep going.", "Sam Levenson"],
    [
      "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
      "Stephen Covey",
    ],
    [
      "Simplicity boils down to two steps: identify the essential, eliminate the rest.",
      "Leo Babauta",
    ],
    ["What gets measured gets managed.", "Peter Drucker"],
    ["You can do anything, but not everything.", "David Allen"],
    [
      "Slow down and enjoy life. It's not only the scenery you miss by going too fast.",
      "Eddie Cantor",
    ],
    [
      "Concentrate all your thoughts upon the work at hand.",
      "Alexander Graham Bell",
    ],
    ["It always seems impossible until it's done.", "Nelson Mandela"],
  ];
  let lastQuoteIndex = -1;
  const quoteTextEl = document.getElementById("quote-text");
  const quoteAuthorEl = document.getElementById("quote-author");
  const quoteNewButton = document.getElementById("quote-new-button");
  const quoteModuleStatus = document.getElementById("quote-module-status");

  function fetchRandomQuote() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let randomIndex = Math.floor(Math.random() * QUOTE_LIBRARY.length);
          if (QUOTE_LIBRARY.length > 1) {
            while (randomIndex === lastQuoteIndex) {
              randomIndex = Math.floor(Math.random() * QUOTE_LIBRARY.length);
            }
          }
          lastQuoteIndex = randomIndex;
          resolve(QUOTE_LIBRARY[randomIndex]);
        } catch (error) {
          reject(error);
        }
      }, 450);
    });
  }

  async function showNewQuote() {
    quoteNewButton.disabled = true;
    quoteTextEl.textContent = "Fetching a new line…";
    quoteAuthorEl.textContent = "";
    try {
      const [quoteText, quoteAuthor] = await fetchRandomQuote();
      quoteTextEl.textContent = `“${quoteText}”`;
      quoteAuthorEl.textContent = `— ${quoteAuthor}`;
      quoteModuleStatus.textContent = quoteAuthor;
    } catch (error) {
      quoteTextEl.textContent =
        "Couldn't load a quote right now — here's one to hold onto:";
      quoteAuthorEl.textContent = "— Keep going.";
    } finally {
      quoteNewButton.disabled = false;
    }
  }
  quoteNewButton.addEventListener("click", showNewQuote);
  showNewQuote();

  const WORK_SESSION_SECONDS = 25 * 60;
  const BREAK_SESSION_SECONDS = 5 * 60;
  let secondsRemaining = WORK_SESSION_SECONDS;
  let currentSessionType = "work";
  let pomodoroIntervalId = null;

  const pomodoroTimeDisplay = document.getElementById("pomodoro-time-display");
  const pomodoroSessionName = document.getElementById("pomodoro-session-name");
  const pomodoroSessionDot = document.getElementById("pomodoro-session-dot");
  const pomodoroStartButton = document.getElementById("pomodoro-start-button");
  const pomodoroPauseButton = document.getElementById("pomodoro-pause-button");
  const pomodoroResetButton = document.getElementById("pomodoro-reset-button");
  const pomodoroStatusMessage = document.getElementById(
    "pomodoro-status-message",
  );
  const pomodoroModuleStatus = document.getElementById(
    "pomodoro-module-status",
  );

  function formatMinutesSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${padTwoDigits(minutes)}:${padTwoDigits(seconds)}`;
  }

  function renderPomodoro() {
    pomodoroTimeDisplay.textContent = formatMinutesSeconds(secondsRemaining);
    pomodoroSessionName.textContent =
      currentSessionType === "work" ? "Work Session" : "Break";
    pomodoroSessionDot.classList.toggle(
      "is-break",
      currentSessionType === "break",
    );
    pomodoroModuleStatus.textContent = `${formatMinutesSeconds(secondsRemaining)} ${currentSessionType === "work" ? "work" : "break"}`;
  }

  function playCompletionBeep() {
    try {
      const audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 880;
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.6,
      );
      oscillator.connect(gainNode).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.6);
    } catch (error) {}
  }

  function tickPomodoroTimer() {
    secondsRemaining--;
    if (secondsRemaining <= 0) {
      playCompletionBeep();
      if (currentSessionType === "work") {
        currentSessionType = "break";
        secondsRemaining = BREAK_SESSION_SECONDS;
        pomodoroStatusMessage.textContent =
          "Work session complete — take a 5 minute break.";
      } else {
        currentSessionType = "work";
        secondsRemaining = WORK_SESSION_SECONDS;
        pomodoroStatusMessage.textContent =
          "Break's over — back to a work session.";
      }
    }
    renderPomodoro();
  }

  function startPomodoro() {
    if (pomodoroIntervalId) return;
    pomodoroIntervalId = setInterval(tickPomodoroTimer, 1000);
    pomodoroStatusMessage.textContent = "";
  }
  function pausePomodoro() {
    clearInterval(pomodoroIntervalId);
    pomodoroIntervalId = null;
  }
  function resetPomodoro() {
    pausePomodoro();
    currentSessionType = "work";
    secondsRemaining = WORK_SESSION_SECONDS;
    pomodoroStatusMessage.textContent = "";
    renderPomodoro();
  }

  pomodoroStartButton.addEventListener("click", startPomodoro);
  pomodoroPauseButton.addEventListener("click", pausePomodoro);
  pomodoroResetButton.addEventListener("click", resetPomodoro);
  renderPomodoro();

  const WEATHER_CODE_DESCRIPTIONS = {
    0: ["Clear sky", "☀️"],
    1: ["Mainly clear", "🌤️"],
    2: ["Partly cloudy", "⛅"],
    3: ["Overcast", "☁️"],
    45: ["Fog", "🌫️"],
    48: ["Depositing rime fog", "🌫️"],
    51: ["Light drizzle", "🌦️"],
    53: ["Drizzle", "🌦️"],
    55: ["Dense drizzle", "🌦️"],
    61: ["Light rain", "🌧️"],
    63: ["Rain", "🌧️"],
    65: ["Heavy rain", "🌧️"],
    71: ["Light snow", "🌨️"],
    73: ["Snow", "🌨️"],
    75: ["Heavy snow", "🌨️"],
    80: ["Rain showers", "🌦️"],
    81: ["Rain showers", "🌦️"],
    82: ["Violent showers", "⛈️"],
    95: ["Thunderstorm", "⛈️"],
    96: ["Thunderstorm w/ hail", "⛈️"],
    99: ["Thunderstorm w/ hail", "⛈️"],
  };
  function describeWeatherCode(code) {
    return WEATHER_CODE_DESCRIPTIONS[code] || ["Conditions unclear", "🌡️"];
  }

  const weatherLocationEl = document.getElementById("weather-location");
  const weatherTemperatureEl = document.getElementById("weather-temperature");
  const weatherConditionEl = document.getElementById("weather-condition");
  const weatherFeelsLikeEl = document.getElementById("weather-feels-like");
  const weatherWindEl = document.getElementById("weather-wind");
  const weatherHumidityEl = document.getElementById("weather-humidity");
  const weatherUpdatedAtEl = document.getElementById("weather-updated-at");
  const weatherStatusMessageEl = document.getElementById(
    "weather-status-message",
  );
  const weatherRetryButton = document.getElementById("weather-retry-button");
  const weatherModuleStatus = document.getElementById("weather-module-status");
  const statusBarWeatherText = document.getElementById(
    "status-bar-weather-text",
  );
  const statusBarWeatherIcon = document.querySelector(
    "#status-bar-weather-chip .weather-chip-icon",
  );

  const DEFAULT_LOCATION = { lat: 21.1702, lon: 72.8311, name: "Surat" };
  const WEATHER_CITY_STORAGE_KEY = "dashboard-weather-city";

  function showWeatherLoadingState() {
    weatherLocationEl.textContent = "Locating…";
    weatherConditionEl.textContent = "Fetching current conditions…";
    weatherModuleStatus.textContent = "— checking —";
    statusBarWeatherText.textContent = "Loading…";
    weatherStatusMessageEl.textContent = "";
    weatherStatusMessageEl.className = "status-message";
  }

  async function formatCoordinatesAsLabel(lat, lon) {
    return `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
  }

  async function loadWeather(lat, lon, placeName) {
    showWeatherLoadingState();
    try {
      const requestUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
      const response = await fetch(requestUrl);
      if (!response.ok) throw new Error("Weather service unavailable");
      const weatherData = await response.json();
      const currentConditions = weatherData.current;
      const [conditionDescription, conditionIcon] = describeWeatherCode(
        currentConditions.weather_code,
      );
      const locationLabel =
        placeName || (await formatCoordinatesAsLabel(lat, lon));

      weatherLocationEl.textContent = locationLabel;
      weatherTemperatureEl.textContent = `${Math.round(currentConditions.temperature_2m)}°C`;
      weatherConditionEl.textContent = conditionDescription;
      weatherFeelsLikeEl.textContent = `${Math.round(currentConditions.apparent_temperature)}°C`;
      weatherWindEl.textContent = `${Math.round(currentConditions.wind_speed_10m)} km/h`;
      weatherHumidityEl.textContent = `${Math.round(currentConditions.relative_humidity_2m)}%`;
      weatherUpdatedAtEl.textContent = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      weatherModuleStatus.textContent = `${Math.round(currentConditions.temperature_2m)}°C · ${conditionDescription}`;
      statusBarWeatherIcon.textContent = conditionIcon;
      statusBarWeatherText.textContent = `${Math.round(currentConditions.temperature_2m)}°C ${locationLabel}`;
    } catch (error) {
      weatherConditionEl.textContent = "Could not load weather right now.";
      weatherModuleStatus.textContent = "— unavailable —";
      statusBarWeatherText.textContent = "Unavailable";
      weatherStatusMessageEl.textContent =
        "Network or service error — tap Retry.";
      weatherStatusMessageEl.className = "status-message is-error";
    }
  }

  function locateUserAndLoadWeather() {
    if (!navigator.geolocation) {
      loadWeather(
        DEFAULT_LOCATION.lat,
        DEFAULT_LOCATION.lon,
        DEFAULT_LOCATION.name,
      );
      return;
    }
    showWeatherLoadingState();
    navigator.geolocation.getCurrentPosition(
      (position) =>
        loadWeather(position.coords.latitude, position.coords.longitude, null),
      () =>
        loadWeather(
          DEFAULT_LOCATION.lat,
          DEFAULT_LOCATION.lon,
          DEFAULT_LOCATION.name,
        ),
      { timeout: 6000 },
    );
  }

  function initializeWeather() {
    const savedCity = loadFromStorage(WEATHER_CITY_STORAGE_KEY, null);
    if (
      savedCity &&
      typeof savedCity.lat === "number" &&
      typeof savedCity.lon === "number"
    ) {
      loadWeather(savedCity.lat, savedCity.lon, savedCity.name);
      return;
    }
    locateUserAndLoadWeather();
  }
  weatherRetryButton.addEventListener("click", initializeWeather);
  initializeWeather();

  const GOALS_STORAGE_KEY = "dashboard-goals";
  let goalItems = loadFromStorage(GOALS_STORAGE_KEY, []);

  const goalTextInput = document.getElementById("goal-text-input");
  const goalAddButton = document.getElementById("goal-add-button");
  const goalListEl = document.getElementById("goal-list");
  const goalProgressLabelEl = document.getElementById("goal-progress-label");
  const goalProgressFillEl = document.getElementById("goal-progress-fill");
  const goalsModuleStatus = document.getElementById("goals-module-status");

  function renderGoalList() {
    goalListEl.innerHTML = "";
    if (goalItems.length === 0) {
      goalListEl.innerHTML =
        '<div class="empty-state-message">No goals set for today yet.</div>';
    } else {
      goalItems.forEach((goalItem) => {
        const listItemEl = document.createElement("li");
        listItemEl.className = "goal-item" + (goalItem.done ? " is-done" : "");
        listItemEl.dataset.id = goalItem.id;
        listItemEl.innerHTML = `
                <div class="goal-check-circle">${goalItem.done ? "✓" : ""}</div>
                <span class="goal-item-text"></span>
                <button class="icon-button delete-button" title="Remove">✕</button>
              `;
        listItemEl.querySelector(".goal-item-text").textContent = goalItem.text;
        goalListEl.appendChild(listItemEl);
      });
    }
    const totalGoals = goalItems.length;
    const completedGoals = goalItems.filter((goalItem) => goalItem.done).length;
    const completionPercent = totalGoals
      ? Math.round((completedGoals / totalGoals) * 100)
      : 0;
    goalProgressLabelEl.textContent = `${completedGoals} of ${totalGoals} completed`;
    goalProgressFillEl.style.width = completionPercent + "%";
    goalsModuleStatus.textContent = `${completedGoals} of ${totalGoals} done`;
    saveToStorage(GOALS_STORAGE_KEY, goalItems);
  }

  function addGoalItem() {
    const inputValue = goalTextInput.value.trim();
    if (!inputValue) return;
    goalItems.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: inputValue,
      done: false,
    });
    goalTextInput.value = "";
    renderGoalList();
  }
  goalAddButton.addEventListener("click", addGoalItem);
  goalTextInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addGoalItem();
  });

  goalListEl.addEventListener("click", (event) => {
    const clickedListItem = event.target.closest(".goal-item");
    if (!clickedListItem) return;
    const itemId = clickedListItem.dataset.id;
    if (event.target.closest(".goal-check-circle")) {
      const matchingGoal = goalItems.find((goalItem) => goalItem.id === itemId);
      if (matchingGoal) matchingGoal.done = !matchingGoal.done;
      renderGoalList();
    } else if (event.target.closest(".delete-button")) {
      goalItems = goalItems.filter((goalItem) => goalItem.id !== itemId);
      renderGoalList();
    }
  });

  renderGoalList();
})();
