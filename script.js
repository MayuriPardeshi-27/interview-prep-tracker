const studyForm = document.getElementById("studyForm");
const topicInput = document.getElementById("topicInput");
const statusSelect = document.getElementById("statusSelect");
const topicList = document.getElementById("topicList");
const progressText = document.getElementById("progressText");

// Load data from localStorage
let studyTopics = JSON.parse(localStorage.getItem("studyTopics")) || [];

// Render topics
function renderStudyTopics() {
  topicList.innerHTML = "";
  let completedCount = 0;

  studyTopics.forEach((topic, index) => {
    const li = document.createElement("li");

    const statusClass = topic.status.replace(" ", "").toLowerCase();

    li.innerHTML = `
      <div>
        <strong>${topic.name}</strong>
        <span class="status ${statusClass}">${topic.status}</span>
      </div>
      <button onclick="deleteTopic(${index})">Delete</button>
    `;

    if (topic.status === "Completed") {
      completedCount++;
    }

    topicList.appendChild(li);
  });

  progressText.innerText =
    `Your progress: ${completedCount} of ${studyTopics.length} topics completed`;

  localStorage.setItem("studyTopics", JSON.stringify(studyTopics));
}

// Add topic
studyForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = topicInput.value.trim();
  const status = statusSelect.value;

  if (name === "") {
    alert("Please enter a study topic");
    return;
  }

  studyTopics.push({ name, status });
  renderStudyTopics();
  studyForm.reset();
});

// Delete topic
function deleteTopic(index) {
  studyTopics.splice(index, 1);
  renderStudyTopics();
}

// Initial render
renderStudyTopics();
