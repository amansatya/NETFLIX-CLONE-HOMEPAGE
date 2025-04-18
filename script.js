document.addEventListener("DOMContentLoaded", function () {
    const languageDropdowns = document.querySelectorAll(".language-dropdown");
    const selectedLanguageSpans = document.querySelectorAll(".selected-language");
    const signInButton = document.querySelector("[data-lang='signIn']");
    const bannerSection = document.querySelector(".bannerSection");
    const playPauseButton = document.querySelector(".playPauseIcon");
    const emailInputBox = document.querySelector(".emailInputBox");
    const carousel = document.getElementById("carousel");
    const rightBtn = document.getElementById("rightBtn");
    const leftBtn = document.getElementById("leftBtn");
    const scrollToStartBtn = document.getElementById("scrollToStart");
    const scrollToEndBtn = document.getElementById("scrollToEnd");
    if (!languageDropdowns.length || !selectedLanguageSpans.length || !signInButton || !bannerSection || !playPauseButton || !emailInputBox) {
        console.error("One or more elements are missing!");
        return;
    }
    function changeTitleAndMeta(lang) {
        const metaDesc = document.querySelector("meta[name='description']");
        if (lang === "hi") {
            document.title = "Netflix भारत - टीवी शो और फ़िल्में ऑनलाइन देखें";
            metaDesc?.setAttribute("content", "Netflix पर टीवी शो और फ़िल्में ऑनलाइन देखें।");
        } else {
            document.title = "Netflix India – Watch TV Shows Online, Watch Movies Online";
            metaDesc?.setAttribute("content", "Watch Netflix movies & TV shows online.");
        }
    }
    function switchPostersByLanguage(lang) {
        document.querySelectorAll('#carousel img').forEach(img => {
            const newSrc = img.getAttribute(`data-${lang}`);
            if (newSrc) img.src = newSrc;
        });
    }
    function changeLanguage(lang) {
        document.querySelectorAll("[data-lang]").forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                if (element.tagName === "INPUT") {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation.replace(/\\n/g, "<br>");
                }
            }
        });
        changeTitleAndMeta(lang);
        switchPostersByLanguage(lang);
        Object.assign(signInButton.style, {
            width: "auto",
            padding: "0 1rem",
            fontWeight: "bold"
        });
    }
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang) {
        const langOption = [...languageDropdowns[0].options].find(opt => opt.value === savedLang);
        if (langOption) {
            languageDropdowns.forEach(dropdown => dropdown.value = savedLang);
            selectedLanguageSpans.forEach(span => {
                span.textContent = langOption.text;
            });
            changeLanguage(savedLang === "hi-IN" ? "hi" : "en");
        }
    }
    languageDropdowns.forEach(dropdown => {
        dropdown.addEventListener("change", function () {
            const selectedOption = dropdown.options[dropdown.selectedIndex];
            const selectedLang = selectedOption.value === "hi-IN" ? "hi" : "en";

            selectedLanguageSpans.forEach(span => {
                span.textContent = selectedOption.text;
            });

            languageDropdowns.forEach(d => d.value = selectedOption.value); // sync all dropdowns
            changeLanguage(selectedLang);
            localStorage.setItem("preferredLanguage", selectedOption.value);
        });
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
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"><polygon points="5,3 19,12 5,21"></polygon></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"><rect x="6" y="5" width="4" height="14"></rect><rect x="14" y="5" width="4" height="14"></rect></svg>`;
    }
    playPauseButton.addEventListener("click", () => {
        isPaused = !isPaused;
        if (isPaused) cancelAnimationFrame(animationFrame);
        else moveBackground();
        updateButtonIcon();
    });
    window.addEventListener("resize", () => {
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
        carousel.setAttribute("tabindex", "0");
        carousel.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") carousel.scrollBy({ left: carousel.clientWidth, behavior: "smooth" });
            else if (e.key === "ArrowLeft") carousel.scrollBy({ left: -carousel.clientWidth, behavior: "smooth" });
        });
        scrollToStartBtn?.addEventListener("click", () => {
            carousel.scrollTo({ left: 0, behavior: "smooth" });
        });
        scrollToEndBtn?.addEventListener("click", () => {
            carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
        });
    }
    const faqCards = document.querySelectorAll(".faqCard");
    faqCards.forEach(card => {
        const question = card.querySelector(".faqQuestion");
        const toggle = card.querySelector(".faqQuestionSpan");
        const answer = card.querySelector(".faqAnswer");
        question.addEventListener("click", () => {
            const isOpen = card.classList.contains("open");
            faqCards.forEach(c => {
                c.classList.remove("open");
                c.querySelector(".faqAnswer").style.display = "none";
                c.querySelector(".faqQuestionSpan").textContent = "+";
            });
            if (!isOpen) {
                card.classList.add("open");
                answer.style.display = "block";
                toggle.textContent = "×";
            }
        });
    });
});