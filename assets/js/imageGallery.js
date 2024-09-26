const jsonUrl = "/works/n-pola/04-results/images/metadata.json";

async function loadImageGallery() {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error("Fehler beim Laden der JSON-Datei");
    const images = await response.json();

    const galleryContainer = document.querySelector("#image-gallery");

    images.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = `/works/n-pola/04-results/${image.src}`;
      imgElement.alt = image.metadata.Description || "Bild";
      imgElement.classList.add("gallery-image");

      imgElement.onerror = function () {
        console.error(`Bild konnte nicht geladen werden: ${imgElement.src}`);
      };

      galleryContainer.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Fehler beim Laden der Bildstrecke:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadImageGallery);
