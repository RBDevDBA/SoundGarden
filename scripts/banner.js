const slider = document.querySelector(".slider");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");
const slideIcons = document.querySelectorAll(".slide-icon");
const numberOfSlides = slides.length;
let slideNumber = 0;
let playSlider;

// função para atualizar o slide ativo e o ícone ativo
const updateActiveSlideAndIcon = () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });

  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
};

// função para avançar para o próximo slide
const nextSlide = () => {
  slideNumber++;

  if (slideNumber > numberOfSlides - 1) {
    slideNumber = 0;
  }

  updateActiveSlideAndIcon();
};

// função para retroceder para o slide anterior
const prevSlide = () => {
  slideNumber--;

  if (slideNumber < 0) {
    slideNumber = numberOfSlides - 1;
  }

  updateActiveSlideAndIcon();
};

// vincula o evento de clique para o botão "Próximo"
nextBtn.addEventListener("click", () => {
  nextSlide();
});

// vincula o evento de clique para o botão "Anterior"
prevBtn.addEventListener("click", () => {
  prevSlide();
});

// inicia o autoplay do slider
const startSlider = () => {
  playSlider = setInterval(() => {
    nextSlide();
  }, 2500);
};

// vincula o evento de pausa do autoplay quando o cursor estiver sobre o slider
slider.addEventListener("mouseover", () => {
  clearInterval(playSlider);
});

// vincula o evento de retomada do autoplay quando o cursor sair do slider
slider.addEventListener("mouseout", () => {
  startSlider();
});

// inicia o autoplay
startSlider();