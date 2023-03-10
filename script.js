const inputs = document.querySelectorAll("input")

const cookieForm = document.querySelector("form")
cookieForm.addEventListener("submit", handleForm)

function handleForm(e){
    e.preventDefault()

    const newCookie = {};

    inputs.forEach(input => {
        const nameAttribute = input.getAttribute("name")
        newCookie[nameAttribute] = input.value;
    })
    newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

    cookieForm.reset()
    createCookie(newCookie)
}

function createCookie(newCookie){

    if(doesCookieExist(newCookie.name)) {
        createToast({name: newCookie.name, state: "modifié", color: "orangered"})
    }
    else {
        createToast({name: newCookie.name, state: "créé", color: "green"})
    }

    document.cookie = `${encodeURIComponent(newCookie.name)}=${encodeURIComponent(newCookie.value)};expires=${newCookie.expires.toUTCString()}`

}

function doesCookieExist(name) {
    
    const cookies = document.cookie.replace(/\s/g, "").split(";");
    const onlyCookiesName = cookies.map(cookie => cookie.split("=")[0])
    
    const cookiePresence = onlyCookiesName.find(cookie => cookie === encodeURIComponent(name))
    return cookiePresence;
}

const toastsContainer = document.querySelector(".toasts-container")

function createToast({name, state, color}) {
    const toastInfo = document.createElement("p")
    toastInfo.className = "toast";

    toastInfo.textContent = `Cookie ${name} ${state}.`;
    toastInfo.style.backgroundColor = color;
    toastsContainer.appendChild(toastInfo)

    setTimeout(() =>{
        toastInfo.remove()
    }, 2500)

}
