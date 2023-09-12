const toggleSwitch = document.getElementById("language-toggle");
const iosToggleLabel = document.querySelector(".ios-toggle-label");
const summaryContent = document.getElementById("summary-content");
const projectsSection = document.getElementById("projects");
const skillsSection = document.getElementById("skills");

let currentLanguage = "fr"; // Default language is French



function toggleLanguage() {
    if (currentLanguage === "en") {
        currentLanguage = "fr";
        iosToggleLabel.classList.add("toggle-left");
        iosToggleLabel.classList.remove("toggle-right");
    } else {
        currentLanguage = "en";
        iosToggleLabel.classList.add("toggle-right");
        iosToggleLabel.classList.remove("toggle-left");
    }
    updateContent();
}


toggleSwitch.addEventListener("change", toggleLanguage);



// Function to update content based on the selected language
function updateContent() {
    fetch(`${currentLanguage}.json`)
        .then((response) => response.json())
        .then((data) => {

            document.getElementById("name").textContent = data.name;
            document.getElementById("role").textContent = data.role;

            summaryContent.textContent = data.summary;

            projectsSection.innerHTML = "";
            skillsSection.innerHTML = "";

            data.projects.forEach((project) => {
                const projectDiv = document.createElement("div");
                projectDiv.classList.add("project");
                projectDiv.innerHTML = `
                    <div class="project-image" style="background-image: url('${project.image}')"></div>
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="${project.github}">GitHub</a>
                `;
                projectsSection.appendChild(projectDiv);
            });

            data.skills.forEach((skill) => {
                const skillDiv = document.createElement("div");
                skillDiv.classList.add("skill");
                skillDiv.innerHTML = `
                    <div class="skill-icon"><img src="${skill.icon}" alt="${skill.name}"></div>
                    <h3>${skill.name}</h3>
                    <p class="skill-level">${skill.level}</p>
                `;
                skillsSection.appendChild(skillDiv);
            });
        });
}

updateContent();


