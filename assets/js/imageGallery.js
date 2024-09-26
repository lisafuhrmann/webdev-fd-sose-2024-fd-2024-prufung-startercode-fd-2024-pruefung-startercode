const jsonUrl = "/works/n-pola/04-results/images/metadata.json";
let images = [];

async function loadImageGallery() {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error("Fehler beim Laden der JSON-Datei");
    images = await response.json();

    const galleryContainer = document.getElementById("image-gallery");

    images.forEach((image, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = `/works/n-pola/04-results/${image.src}`;
      imgElement.alt = image.metadata.Description || "Bild";
      imgElement.classList.add("gallery-image");

      imgElement.addEventListener("click", function () {
        openModal(index, images);
      });

      galleryContainer.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Fehler beim Laden der Bildstrecke:", error);
  }
}

function openModal(activeIndex, imageList) {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");

  images = imageList; // Setze die Bilderliste
  currentIndex = activeIndex; // Setze den aktuellen Index

  modal.style.display = "block"; // Modal anzeigen
  updateModalContent(currentIndex); // Modal-Inhalt aktualisieren

  const closeButton = document.querySelector(".close");
  closeButton.onclick = function () {
    modal.style.display = "none"; // Modal schließen
  };

  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none"; // Modal schließen beim Klick auf den Hintergrund
    }
  };

  // Event-Listener für die Carousel-Buttons
  const buttons = document.querySelectorAll("[data-carousel-button]");
  buttons.forEach((button) => {
    button.addEventListener("click", handleCarouselClick);
  });
}

function handleCarouselClick(event) {
  const button = event.currentTarget;
  const offset = button.dataset.carouselButton === "next" ? 1 : -1;
  currentIndex += offset;

  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  updateModalContent(currentIndex);
}

function updateModalContent(index) {
  const modalImage = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");

  modalImage.src = `/works/n-pola/04-results/${images[index].src}`;
  captionText.innerHTML = images[index].metadata.Description || "Bild";
}

document.addEventListener("DOMContentLoaded", loadImageGallery);
