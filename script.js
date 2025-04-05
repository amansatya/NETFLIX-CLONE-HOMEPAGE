document.addEventListener("DOMContentLoaded", function () {
    const languageDropdown = document.querySelector(".language-dropdown");
    const selectedLanguage = document.querySelector(".selected-language");
    const signInButton = document.querySelector("[data-lang='signIn']");
    const bannerSection = document.querySelector(".bannerSection");
    const playPauseButton = document.querySelector(".playPauseIcon");
    const emailInputBox = document.querySelector(".emailInputBox");
    const carousel = document.getElementById("carousel");
    const rightBtn = document.getElementById("rightBtn");
    const leftBtn = document.getElementById("leftBtn");
    const scrollToStartBtn = document.getElementById("scrollToStart");
    const scrollToEndBtn = document.getElementById("scrollToEnd");
    if (!languageDropdown || !selectedLanguage || !signInButton || !bannerSection || !playPauseButton || !emailInputBox) {
        console.error("One or more elements are missing!");
        return;
    }
    function changeLanguage(lang) {
        document.querySelectorAll("[data-lang]").forEach((element) => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                if (element.tagName === "INPUT") {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation.replace(/\\n/g, "<br>");
                }
            }
        });
        signInButton.style.width = "auto";
        signInButton.style.padding = "0 1rem";
        signInButton.style.fontWeight = "bold";
    }
    languageDropdown.addEventListener("change", function () {
        const selectedOption = languageDropdown.options[languageDropdown.selectedIndex];
        selectedLanguage.textContent = selectedOption.text;
        const selectedLang = selectedOption.value === "hi-IN" ? "hi" : "en";
        changeLanguage(selectedLang);
    });
    let isPaused = false;
    let position = 0;
    let animationFrame;
    function moveBackground() {
        if (!isPaused) {
            position -= 0.3;
            bannerSection.style.backgroundPosition = `${position}px 0`;
            animationFrame = requestAnimationFrame(moveBackground);
        }
    }
    function updateButtonIcon() {
        playPauseButton.innerHTML = isPaused
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"></polygon></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><rect x="6" y="5" width="4" height="14"></rect><rect x="14" y="5" width="4" height="14"></rect></svg>`;
    }
    playPauseButton.addEventListener("click", function () {
        isPaused = !isPaused;
        if (isPaused) {
            cancelAnimationFrame(animationFrame);
        } else {
            moveBackground();
        }
        updateButtonIcon();
    });
    window.addEventListener("resize", function () {
        cancelAnimationFrame(animationFrame);
        position = 0;
        bannerSection.style.backgroundPosition = "0px 0";
        if (!isPaused) moveBackground();
    });
    updateButtonIcon();
    moveBackground();
    if (carousel && rightBtn && leftBtn) {
        function updateCarouselButtons() {
            const scrollLeft = carousel.scrollLeft;
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

            rightBtn.style.opacity = scrollLeft >= maxScrollLeft - 5 ? '0' : '1';
            rightBtn.style.pointerEvents = scrollLeft >= maxScrollLeft - 5 ? 'none' : 'auto';

            leftBtn.style.opacity = scrollLeft <= 5 ? '0' : '1';
            leftBtn.style.pointerEvents = scrollLeft <= 5 ? 'none' : 'auto';
        }
        rightBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
        });
        leftBtn.addEventListener("click", () => {
            carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
        });
        carousel.addEventListener("scroll", updateCarouselButtons);
        window.addEventListener("load", updateCarouselButtons);
        updateCarouselButtons();
        carousel.setAttribute("tabindex", "0"); // Make focusable
        carousel.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") {
                carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
            } else if (e.key === "ArrowLeft") {
                carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
            }
        });
        scrollToStartBtn?.addEventListener("click", () => {
            carousel.scrollTo({ left: 0, behavior: "smooth" });
        });
        scrollToEndBtn?.addEventListener("click", () => {
            carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
        });
    }
});
