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
  const publicationList = document.getElementById("publicationList");
  publicationList.innerHTML = "";

  data.publications.forEach((pub, index) => {
    publicationList.innerHTML += `
      <li class="mb-3">
        <div class="fw-semibold">
          ${pub.title}
        </div>
        ${pub.authors.join(", ")} (${pub.year})<br>
        <em>${pub.journal}</em><br>
        DOI:
        <a href="https://doi.org/${pub.doi}" target="_blank">
          ${pub.doi}
        </a>
      </li>`;
  });
}
