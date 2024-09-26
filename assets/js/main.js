import { slideshow } from "./modules/slideshow.js";

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", function () {
  hljs.highlightAll();
  slideshow();
});

/* Optimierung des Codes lief über ChatGPT*/
const jsonUrl = "./works.json";

async function loadFinishedWorks() {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error("Fehler beim Laden der JSON-Datei");
    const works = await response.json();

    const worksList = document.querySelector("[data-js-finished-works]");
    worksList.classList.add("works-grid");

    works.slice(-5).forEach((work) => {
      const workItem = document.createElement("li");
      workItem.classList.add("work-item");

      const date = new Date(work.date);
      const formattedDate = date.toLocaleDateString("de-DE", {
        month: "long",
        year: "numeric",
      });

      workItem.innerHTML = `
      <div class="work-content">
          ${
            work.image
              ? `<img src="${work.image}" alt="${work.title}" class="work-image">`
              : ""
          }
          <div class="work-details">
            <h3>${work.title}</h3>
            <p>${work.author}, ${work.type}, ${formattedDate}</p>
          </div>
        </div>
      `;
      worksList.appendChild(workItem);
    });
  } catch (error) {
    console.error("Fehler beim Laden der abgeschlossenen Arbeiten:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadFinishedWorks);
