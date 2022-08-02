const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll(".rotate button");
const previewImg = document.querySelector(".preview-img img");
const resetFilterBtn = document.querySelector(".reset-filter");
const chooseImgBtn = document.querySelector(".choose-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0;

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg)`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
};

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerHTML = option.innerHTML;
        
        if(option.id === "brightness") {
           filterSlider.value = brightness; 
           filterValue.innerHTML = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.value =  saturation;
            filterValue.innerHTML = `${saturation}%`;
        } else if(option.id === "inversion") {
            filterSlider.value = inversion;
            filterValue.innerHTML = `${inversion}%`;
        } else {
            filterSlider.value = grayscale;
            filterValue.innerHTML = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerHTML = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilters();
};

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
       if(option.id === "left") {
           rotate -= 90;
       } 
       else {
           rotate += 90;
       } 
       applyFilters();     
    });
});

const resetFilter = () => {
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0;
    applyFilters();
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());