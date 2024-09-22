// Disable other fields when an image is uploaded
const fileUpload = document.getElementById("fileUpload");
const formElements = document.querySelectorAll("select, input:not([type='file'])");
const submitBtn = document.getElementById("submitBtn");
const colorWheel = document.getElementById("colorWheel");

fileUpload.addEventListener("change", function () {
    if (this.files.length > 0) {
        formElements.forEach(el => el.disabled = true);
    } else {
        formElements.forEach(el => el.disabled = false);
    }
});

function suggestLowerColor(dominantColor) {
    const colorMap = {
        "rgb(255, 82, 82)": "Black",
        "rgb(255, 179, 0)": "Navy Blue",
        "rgb(0, 0, 255)": "Grey",
        "rgb(0, 0, 0)": "White",
        "rgb(255, 255, 255)": "Black",
        "rgb(255, 105, 180)": "Black",
        "rgb(0, 128, 0)": "Khaki",
        "rgb(255, 165, 0)": "Dark Brown"
    };
    return colorMap[dominantColor] || "Dark pants";
}

const colorNamesMap = {
    "rgb(255, 82, 82)": "Red",
    "rgb(255, 179, 0)": "Amber",
    "rgb(0, 0, 255)": "Blue",
    "rgb(0, 0, 0)": "Black",
    "rgb(255, 255, 255)": "White",
    "rgb(255, 105, 180)": "Pink",
    "rgb(0, 128, 0)": "Green",
    "rgb(255, 165, 0)": "Orange",
    "rgb(255, 228, 196)": "Bisque",
    "rgb(255, 160, 122)": "Light Salmon",
    "rgb(255, 192, 203)": "Pink",
    "rgb(255, 250, 205)": "Lemon Chiffon",
    "rgb(245, 222, 179)": "Wheat",
    "rgb(255, 218, 185)": "Peach Puff",
    "rgb(173, 216, 230)": "Light Blue",
    "rgb(0, 191, 255)": "Deep Sky Blue",
    "rgb(255, 215, 0)": "Gold",
    "rgb(220, 20, 60)": "Crimson",
};

// Function to draw detected color on the color wheel
function drawColorWheel(dominantColor) {
    const ctx = colorWheel.getContext('2d');
    ctx.clearRect(0, 0, colorWheel.width, colorWheel.height); // Clear previous drawing
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, 2 * Math.PI); // Draw circle
    ctx.fillStyle = dominantColor; // Fill with detected color
    ctx.fill();
    ctx.stroke();
}

// Submit Button Click Event
submitBtn.onclick = function () {
    if (fileUpload.files.length > 0) {
        const file = fileUpload.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let r = 0, g = 0, b = 0, count = 0;

                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                    count++;
                }

                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);

                const dominantColor = `rgb(${r}, ${g}, ${b})`;
                const lowerColorSuggestion = suggestLowerColor(dominantColor);
                const colorName = colorNamesMap[dominantColor] || "unknown color";

                document.getElementById("suggestionText").innerText =
                    `Detected dominant color: ${colorName} (${dominantColor}). Suggested lower: ${lowerColorSuggestion}.`;

                // Draw the detected color on the color wheel
                drawColorWheel(dominantColor);
            };
        };
        reader.readAsDataURL(file);
    }
};
