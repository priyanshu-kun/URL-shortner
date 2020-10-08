window.addEventListener("load", () => {
    
    const longString = document.querySelector(".longString");

    if(longString.textContent.length && longString.textContent.length > 30) {
        longString.textContent = longString.textContent.substr(0,30)+'...';
    }

})