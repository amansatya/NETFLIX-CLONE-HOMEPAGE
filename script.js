document.addEventListener("DOMContentLoaded", function () {
    const languageDropdown = document.querySelector(".language-dropdown");
    const selectedLanguage = document.querySelector(".selected-language");
    const signInButton = document.querySelector("[data-lang='signIn']");
    const bannerSection = document.querySelector(".bannerSection");
    const playPauseButton = document.querySelector(".playPauseIcon");
    const emailInputBox = document.querySelector(".emailInputBox");
    if (!languageDropdown || !selectedLanguage || !signInButton || !bannerSection || !playPauseButton || !emailInputBox) {
        console.error("One or more elements are missing!");
        return;
    }
    let isPaused = false;
    let position = 0;
    let animationFrame;
    function changeLanguage(lang) {
        document.querySelectorAll("[data-lang]").forEach((element) => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                if (element.tagName === "INPUT")
                    element.placeholder = translation;
                else
                    element.innerHTML = translation.replace(/\\n/g, "<br>");
            }
        });
        signInButton.style.width = lang === "hi" ? "90px" : "60px";
        signInButton.style.fontWeight = "bold";
    }
    languageDropdown.addEventListener("change", function () {
        const selectedOption = languageDropdown.options[languageDropdown.selectedIndex];
        selectedLanguage.textContent = selectedOption.text;
        const selectedLang = selectedOption.value === "hi-IN" ? "hi" : "en";
        changeLanguage(selectedLang);
    });
    function moveBackground() {
        if (!isPaused) {
            position -= 0.3;
            bannerSection.style.backgroundPosition = `${position}px 0`;
            animationFrame = requestAnimationFrame(moveBackground);
        }
    }
    function updateButtonIcon() {
        playPauseButton.classList.toggle("paused", isPaused);
        playPauseButton.classList.toggle("playing", !isPaused);
    }
    playPauseButton.addEventListener("click", function () {
        isPaused = !isPaused;
        if (isPaused) cancelAnimationFrame(animationFrame);
        else moveBackground();
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
});
