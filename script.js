fetch("data.json")
  .then(response => response.json())
  .then(data => renderPage(data))
  .catch(error => console.error("Error loading data.json:", error));

function renderPage(data) {

  /* =======================
     HERO SECTION
  ======================= */
  document.getElementById("fullName").textContent =
    data.personal_info.full_name;

  document.getElementById("position").textContent =
    `${data.personal_info.title}, ${data.personal_info.position}`;

  const aff = data.personal_info.affiliation;
  document.getElementById("affiliation").textContent =
    `${aff.department}, ${aff.school}, ${aff.university}, ${aff.country}`;


  /* =======================
     ABOUT ME
  ======================= */
  document.getElementById("aboutText").textContent =
    data.biography.about_me;

  document.getElementById("researchFocus").textContent =
    data.biography.research_focus_statement;


  /* =======================
     EDUCATION
  ======================= */
  const educationList = document.getElementById("educationList");
  educationList.innerHTML = "";

  data.education.forEach(edu => {
    educationList.innerHTML += `
      <li class="mb-2">
        <strong>${edu.degree} in ${edu.field}</strong><br>
        ${edu.institution}, ${edu.year}
      </li>`;
  });


  /* =======================
     EXPERIENCE
  ======================= */
  const experienceList = document.getElementById("experienceList");
  experienceList.innerHTML = "";

  data.professional_experience.forEach(exp => {
    experienceList.innerHTML += `
      <li class="mb-2">
        <strong>${exp.position}</strong><br>
        ${exp.institution} (${exp.start_year} – ${exp.end_year})
      </li>`;
  });


  /* =======================
     COURSES
  ======================= */
  const currentCourses = document.getElementById("currentCourses");
  currentCourses.innerHTML = "";

  data.teaching.current_courses.forEach(course => {
    if (course.url) {
      currentCourses.innerHTML += `
        <li>
          <a href="${course.url}" 
             target="_blank" 
             class="course-link">
            ${course.course_name}
            <i class="bi bi-box-arrow-up-right link-icon"></i>
          </a>
        </li>`;
    } else {
      currentCourses.innerHTML += `<li>${course.course_name}</li>`;
    }
  });

  const previousCourses = document.getElementById("previousCourses");
  previousCourses.innerHTML = "";

  data.teaching.previous_courses.forEach(course => {
    previousCourses.innerHTML += `<li>${course}</li>`;
  });


  /* =======================
     PUBLICATIONS
  ======================= */
  const PREVIEW_COUNT = 5;
  const publicationList = document.getElementById("publicationList");
  const publicationListMore = document.getElementById("publicationListMore");
  const morePubsSection = document.getElementById("morePubsSection");

  publicationList.innerHTML = "";
  publicationListMore.innerHTML = "";

  function pubHTML(pub) {
    return `
      <li class="mb-3">
        <div class="fw-semibold">${pub.title}</div>
        ${pub.authors.join(", ")} (${pub.year})<br>
        <em>${pub.journal || ""}</em><br>
        DOI:
        ${pub.doi
          ? `<a href="https://doi.org/${pub.doi}" target="_blank">${pub.doi}</a>`
          : `<span class="text-muted">N/A</span>`}
      </li>`;
  }

  data.publications.forEach((pub, index) => {
    if (index < PREVIEW_COUNT) {
      publicationList.innerHTML += pubHTML(pub);
    } else {
      publicationListMore.innerHTML += pubHTML(pub);
    }
  });

  if (data.publications.length > PREVIEW_COUNT) {
    morePubsSection.style.display = "block";
    const remaining = data.publications.length - PREVIEW_COUNT;
    document.getElementById("btnMorePubs").innerHTML =
      `<i class="bi bi-chevron-down me-1"></i> Show ${remaining} more`;
  }
}

function toggleMorePubs() {
  const moreList = document.getElementById("publicationListMore");
  const btn = document.getElementById("btnMorePubs");
  const isHidden = moreList.style.display === "none";

  if (isHidden) {
    moreList.style.display = "block";
    btn.innerHTML = `<i class="bi bi-chevron-up me-1"></i> Show less`;
  } else {
    moreList.style.display = "none";
    const remaining = moreList.querySelectorAll("li").length;
    btn.innerHTML = `<i class="bi bi-chevron-down me-1"></i> Show ${remaining} more`;
  }
}
