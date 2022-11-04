var menu = document.querySelector(".menu");
var hamburger = document.querySelector(".hamburgerContainer");
var displayed = false;

hamburger.addEventListener("click", function(){
    if (!displayed){
    menu.style.display = "flex";
    displayed = true;
    }
    else{
        menu.style.display = "none";
        displayed = false;
    }
})

var btn = document.querySelector("#go");

btn.addEventListener("click", function(){
    var textBox = document.querySelector("#textbox");
    var errorMsg = document.querySelector(".error");
    var link = document.querySelector("#textbox").value;

    var shortenedlink = document.querySelector(".shortenedLinks");

    console.log(link);


    fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.ok == false){
                textBox.style.border = "red 1px solid";
                errorMsg.innerHTML = "Please add a link"
            }
            else{
                textBox.style.border = "grey 1px solid";
                errorMsg.innerHTML = ""

                const linkscontainer = document.createElement("div");
                linkscontainer.classList.add("link");
    
                shortenedlink.appendChild(linkscontainer);
    
                const fullsharelink = document.createElement("div");
                fullsharelink.classList.add("fullsharelink");
                fullsharelink.innerText = data.result.full_share_link;
    
                linkscontainer.appendChild(fullsharelink);
    
                const hr = document.createElement("hr");
    
                linkscontainer.appendChild(hr);

                const copylinkcontainer = document.createElement("div");
                copylinkcontainer.classList.add("copyLink");

                linkscontainer.appendChild(copylinkcontainer);
    
                const fullshortlink = document.createElement("div");
                fullshortlink.classList.add("fullshortlink");
                fullshortlink.innerText = data.result.full_short_link;
    
                copylinkcontainer.appendChild(fullshortlink);
    
                const copyBtn = document.createElement("button");
                copyBtn.id = "go";
                copyBtn.classList.add("copy");
                copyBtn.innerText = "Copy";
    
                copylinkcontainer.appendChild(copyBtn);
    
                copyBtn.addEventListener("click", function(){
    
                    var btns = document.querySelectorAll(".copy");
                    btns.forEach(btn => {
                        btn.style.background = "hsl(180, 66%, 49%)"
                        btn.innerHTML = "Copy"
                    });
    
                    copyBtn.style.background = "hsl(257, 27%, 26%)"
                    copyBtn.innerHTML = "Copied!"
    
                    navigator.clipboard.writeText(fullsharelink.innerText);     
                })
            }
    });
})