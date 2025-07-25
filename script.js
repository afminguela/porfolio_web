/* ===================== CORE JS ===================== */
document.addEventListener("DOMContentLoaded", () => {
  // Burger menu
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  burger.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });

  // Dynamic year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Fetch projects
  fetchProjects();
});

/* ===================== CONFIG ===================== */
const API_CONFIG = {
  baseUrl: "https://api.tudominio.com",
  endpoints: { projects: "/api/projects" },
};

/* ===================== FUNCTIONS ===================== */
async function fetchProjects() {
  try {
    const res = await fetch(API_CONFIG.baseUrl + API_CONFIG.endpoints.projects);
    if (!res.ok) throw new Error(res.statusText);
    const projects = await res.json();
    renderProjects(projects);
  } catch (e) {
    console.warn("Falling back to static projects", e);
    renderProjects(getStaticProjects());
  }
}

function renderProjects(list) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";
  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "glass";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p><strong>Tecnologías:</strong> ${p.tech.join(", ")}</p>
      <a class="btn primary" href="${p.url}" target="_blank">Ver proyecto</a>`;
    grid.appendChild(card);
  });
}

function getStaticProjects() {
  return [
    {
      title: "ReceKé",
      description: "Base de datos de recetas",
      tech: ["React", "Node"],
      url: "http://receke.vercel.app",
    },
    {
      title: "Broadcast Management System",
      description: "Gestión operativa TV",
      tech: ["SQL", "Excel"],
      url: "#",
    },
    {
      title: "UX/UI Case Studies",
      description: "Portafolio de diseño",
      tech: ["Figma", "Next.js"],
      url: "#",
    },
  ];
}

/* ===================== FORM HANDLER ===================== */
const form = document.getElementById("contact-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("¡Mensaje enviado! (simulado)");
  form.reset();
});
