window.addEventListener("load", () => {
    const form = document.querySelector("form");
    const button = document.querySelector("button");
    const container = document.querySelector(".givendata");
    const anchorTag = container.querySelector("a");

    const renderResponseData = (data) => {
        const compressUrl = data.urlCode;
        console.log(compressUrl)
        anchorTag.setAttribute("href",compressUrl)
        anchorTag.textContent = `http://localhost:5000/${compressUrl}`;
    }


    button.addEventListener("click", (e) => {
        e.preventDefault();

        let data = form.children[1].value;
        console.log(form.children[1].value)

        fetch("http://localhost:5000/api/url/shorten", {
            method: "POST",
            body:  JSON.stringify({
                longUrl: data
            }),
            headers: {
               "content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            return res.json()
        }).then(data => {
           renderResponseData(data);
        });
    })

})