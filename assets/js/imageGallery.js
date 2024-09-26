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

      imgElement.addEventListener("click", function () {
        openModal(imgElement.src, imgElement.alt);
      });

      galleryContainer.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Fehler beim Laden der Bildstrecke:", error);
  }
}
// Auch hier hat ChatGPT nachgeholfen
function openModal(imageSrc, imageAlt) {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImage.src = imageSrc;
  captionText.innerHTML = imageAlt;
  const closeButton = document.querySelector(".close");
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

document.addEventListener("DOMContentLoaded", loadImageGallery);
