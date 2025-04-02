document.addEventListener("DOMContentLoaded",function () {
    const languageDropdown=document.querySelector(".language-dropdown");
    const selectedLanguage=document.querySelector(".selected-language");
    const navbar=document.querySelector(".mainnetflixcontainer");
    const signInButton=document.querySelector("[data-lang='signIn']");
    function changeLanguage(lang)
    {
        document.querySelectorAll("[data-lang]").forEach((element) => {
            const translation=element.getAttribute(`data-${lang}`);
            if (translation)
                element.innerHTML=translation;
        });
        if (lang==="hi")
        {
            signInButton.style.width="90px";
            signInButton.style.fontWeight="bold";
        }
        else
        {
            signInButton.style.width="60px";
            signInButton.style.fontWeight="bold";
        }
    }
    languageDropdown.addEventListener("change",function ()
    {
        const selectedOption=languageDropdown.options[languageDropdown.selectedIndex];
        selectedLanguage.textContent=selectedOption.text;
        const selectedLang=selectedOption.value === "hi-IN" ? "hi" : "en";
        changeLanguage(selectedLang);
    });
    window.addEventListener("scroll",function ()
    {
        if (window.scrollY>50)
            navbar.style.background="rgba(0, 0, 0, 0.9)";
        else
            navbar.style.background="linear-gradient(to bottom, rgba(229, 9, 20, 0.9) 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 100%)";
    });
});
