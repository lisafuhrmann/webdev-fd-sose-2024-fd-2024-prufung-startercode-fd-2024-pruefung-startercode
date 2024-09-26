let images = [];
let currentIndex = 0;

function openModal(activeIndex, imageList) {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const captionText = document.getElementById("caption");

  images = imageList;
  currentIndex = activeIndex;

  modal.style.display = "block";
  updateModalContent(currentIndex);

  const closeButton = document.querySelector(".close");
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

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
