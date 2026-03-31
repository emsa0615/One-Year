const container = document.querySelector("main");
let counter = 0;

const totalSlides = 36;
const folder = "slides";

const music=document.getElementById("bgMusic")
music.volume=0.3

document.getElementById("on").addEventListener("click", () => {
    document.querySelector("main").style.display="flex"
    document.querySelector("#open").style.display="none"
})

function startMusic(){
  music.play().catch(()=>{})

  document.removeEventListener("click",startMusic)
  document.removeEventListener("keydown",startMusic)
  document.removeEventListener("touchstart",startMusic)
}

//listen for any interaction
document.addEventListener("click", startMusic)
document.addEventListener("keydown",startMusic)
document.addEventListener("touchstart",startMusic)

/* CREATE SLIDES */
for (let i = 1; i <= totalSlides; i++) {

    const slide = document.createElement("div");
    slide.classList.add("slide");

    let img = document.createElement("img");
    img.src = `${folder}/no${i}.jpg`;

    img.onerror = function () {
        this.onerror = null;
        this.src = `${folder}/no${i}.jpeg`;

        this.onerror = function () {
            this.onerror = null;
            this.src = `${folder}/no${i}.png`;

            this.onerror = function () {
                slide.innerHTML = `
                    <video muted autoplay loop playsinline>
                        <source src="${folder}/no${i}.mp4" type="video/mp4">
                    </video>
                `;
            };
        };
    };

    slide.appendChild(img);
    slide.style.left = `${(i - 1) * 100}%`;

    container.appendChild(slide);
}

const slides = document.querySelectorAll(".slide");

/* NAVIGATION */
function next(){
    if(counter < slides.length - 1){
        counter++;
        updateSlide();
    }
}

function prev(){
    if(counter > 0){
        counter--;
        updateSlide();
    }
}

/* UPDATE */
function updateSlide(){
    slides.forEach((slide, index)=>{
        slide.style.transform = `translateX(-${counter * 100}%)`;
        slide.classList.toggle("active", index === counter);
    });

    handleVideos();
}

/* VIDEO CONTROL */
function handleVideos(){
    slides.forEach((slide, index)=>{
        const video = slide.querySelector("video");

        if(video){
            if(index === counter){
                video.play().catch(()=>{});

                // click to unmute
                slide.onclick = () => {
                    video.muted = false;
                    video.controls = true;
                };

            } else {
                video.pause();
                video.currentTime = 0;
            }
        }
    });
}

/* INIT */
updateSlide();