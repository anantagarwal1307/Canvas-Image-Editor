let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    }
};

const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");


let file = null;
let image = null;

const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, unit = "%", value, min, max) {

    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = (name[0].toUpperCase() + name.slice(1)).replace("HueRotation", "Hue Rotation");

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
        filters[ name ].value = input.value;          
        applyFilters();

    })

    return div
}

function createFilters(){
    Object.keys(filters).forEach(key => {
        
        const filterElement = createFilterElement(key, filters[ key ].unit, filters[ key ].value, filters[ key ].min, filters[ key ].max);

        filtersContainer.appendChild(filterElement);

    })
}

createFilters();

imageInput.addEventListener("change", (event) => {

    file = event.target.files[ 0 ];
    if (!file) return;

    const imagePlaceholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    imagePlaceholder.style.display = "none";

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {

        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    }
})

function applyFilters(){
    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim();
    canvasCtx.drawImage(image, 0, 0);
}


resetButton.addEventListener("click", () => {
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg"
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px"
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%"
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        }
    };
    applyFilters();
    filtersContainer.innerHTML = ""; //Empty the filters
    createFilters(); // Reset the filters

})

downloadButton.addEventListener("click", () => {
    if (!image) return;

    const link = document.createElement("a");
    link.download = "editable-image.png"
    link.href = imageCanvas.toDataURL();
    link.click();
})

const presets = {
    original: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 95,
        contrast: 140,
        saturation: 120,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 85,
        hueRotation: 10,
        blur: 0,
        grayscale: 10,
        sepia: 35,
        opacity: 100,
        invert: 0
    },

    "old school": {
        brightness: 100,
        contrast: 85,
        saturation: 65,
        hueRotation: 0,
        blur: 0,
        grayscale: 25,
        sepia: 45,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 90,
        contrast: 135,
        saturation: 105,
        hueRotation: 0,
        blur: 0,
        grayscale: 5,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 105,
        contrast: 105,
        saturation: 115,
        hueRotation: 15,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 110,
        saturation: 105,
        hueRotation: 190,
        blur: 0,
        grayscale: 5,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 110,
        contrast: 80,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayscale: 15,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    "black and white": {
        brightness: 105,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    noir: {
        brightness: 90,
        contrast: 160,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 115,
        contrast: 85,
        saturation: 105,
        hueRotation: 5,
        blur: 1,
        grayscale: 0,
        sepia: 8,
        opacity: 100,
        invert: 0
    },

    vivid: {
        brightness: 105,
        contrast: 120,
        saturation: 165,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    muted: {
        brightness: 100,
        contrast: 90,
        saturation: 55,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 105,
        contrast: 95,
        saturation: 90,
        hueRotation: 350,
        blur: 0,
        grayscale: 5,
        sepia: 30,
        opacity: 100,
        invert: 0
    },

    "faded film": {
        brightness: 115,
        contrast: 75,
        saturation: 65,
        hueRotation: 5,
        blur: 0,
        grayscale: 20,
        sepia: 25,
        opacity: 100,
        invert: 0
    },

    cyberpunk: {
        brightness: 100,
        contrast: 145,
        saturation: 160,
        hueRotation: 280,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    sunset: {
        brightness: 105,
        contrast: 110,
        saturation: 135,
        hueRotation: 25,
        blur: 0,
        grayscale: 0,
        sepia: 25,
        opacity: 100,
        invert: 0
    },

    soft: {
        brightness: 110,
        contrast: 90,
        saturation: 95,
        hueRotation: 0,
        blur: 0.5,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    }
};

Object.keys(presets).forEach(presetName => {
    
    const presetButton = document.createElement("button");
    presetButton.classList.add("btn");
    presetButton.innerText = presetName[0].toUpperCase() + presetName.slice(1);
    presetsContainer.appendChild(presetButton);

    presetButton.addEventListener('click', () => {
        const preset = presets[ presetName ];
        
        Object.keys(preset).forEach(filterName => {
            filters[ filterName ].value = preset[ filterName ]
        })

        applyFilters(); 
        filtersContainer.innerHTML = "";
        createFilters();
    })
})