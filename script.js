//your code here
const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selectedImages = [];
let identicalImageClass;
const imageContainer = document.getElementById('image-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const messagePara = document.getElementById('para');

// Function to load images
function loadImages() {
    const shuffledImages = shuffleArray(images.slice());
    identicalImageClass = shuffledImages[Math.floor(Math.random() * 5)];
    const imagesToDisplay = [...shuffledImages, identicalImageClass];
    shuffleArray(imagesToDisplay);

    imageContainer.innerHTML = '';
    imagesToDisplay.forEach(imageClass => {
        const imgElement = document.createElement('img');
        imgElement.classList.add(imageClass);
        imgElement.addEventListener('click', handleImageClick);
        imageContainer.appendChild(imgElement);
    });
}

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Handle image click
function handleImageClick(event) {
    const selectedClass = event.target.className;

    if (!selectedImages.includes(selectedClass)) {
        selectedImages.push(selectedClass);
        event.target.classList.add('selected');
    }

    resetButton.style.display = 'block';

    if (selectedImages.length === 2) {
        verifyButton.style.display = 'block';
    }

    if (selectedImages.length > 2) {
        resetSelection();
    }
}

// Reset selections
function resetSelection() {
    selectedImages = [];
    document.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
    verifyButton.style.display = 'none';
}

// Verify button click
verifyButton.addEventListener('click', () => {
    const areIdentical = selectedImages[0] === selectedImages[1];
    messagePara.textContent = areIdentical 
        ? "You are a human. Congratulations!" 
        : "We can't verify you as a human. You selected the non-identical tiles.";
    verifyButton.style.display = 'none';
});

// Reset button click
resetButton.addEventListener('click', () => {
    resetSelection();
    resetButton.style.display = 'none';
    messagePara.textContent = '';
    loadImages();
});

// Initial load
loadImages();