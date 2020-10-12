document.addEventListener("DOMContentLoaded", () => {
    console.log("true")
    fetchPups();
    eventHandler();
    submitHandler();
})
const pupsURL = "http://localhost:3000/pups/"

function eventHandler() {
    document.addEventListener("click", e => {
        e.preventDefault()
        let target = e.target
        if(target.matches("span")) {
            showPup(target)
        }
        // if(target.matches("#goodbad")) {
        //     let words = target.innerText
        //     let word = words.split(" ")[0]
        //     if(word == "Good") {
        //         let boolean = true
        //         let pup = target.parentElement
        //         changeMood(pup, boolean)
        //     } else {
        //         let boolean = false
        //         let pup = target.parentElement
        //         changeMood(pup, boolean)
        //     }
        // }
    })
}

function submitHandler() {
    document.addEventListener("click", e => {
        e.preventDefault()
        let target = e.target
        if(target.matches("span")) {
            console.log("WDF")
        } else {
            console.log(target)
            let words = target.innerText
            let word = words.split(" ")[0]
        if(word == "Good") {
                let boolean = true
                let pup = target.parentElement
                changeMood(pup, boolean, target)
        } else {
                let boolean = false
                let pup = target.parentElement
                changeMood(pup, boolean, target)
            }
        }
    })
}

function changeMood(pup, boolean, target) {
    const oldMood = pup.children[2].innerText
    let newMood = !boolean
    fetch(pupsURL + pup.id, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify( 
            {
                "isGoodDog": newMood
            })
        })
        .then(mood => mood.json())
        .then(mood => {
            if(target.innerText == "Good Dog!") {
                target.innerText = "Bad Dog!"
            } else {
                target.innerText = "Good Dog!"
            }
        })
}

function showPup(pup) {
    const dogInfo = document.getElementById(pup.dataset.id)
    if (dogInfo.style.display === "none") {
        dogInfo.style.display = "block";
    } else {
        dogInfo.style.display = "none";
        }
}

function goodBad(pup) {
    if(pup) {
        return false
    } else {
        return true
    }
}

function savePup(pup) {
    const dogInfo = document.querySelector("#dog-info")
    let pupDiv = document.createElement("div")
    pupDiv.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button id="goodbad">${pupTemper(pup)}</button>
    <br>
    <br>
    `
    pupDiv.id = pup.id
    pupDiv.style = "display:none";
    dogInfo.append(pupDiv)
}

function pupTemper(pup) {
    if(pup.isGoodDog) {
        return "Good Dog!"
    } else {
        return "Bad Dog!"
    }
}

function fetchPups() {
    fetch(pupsURL)
    .then(response => response.json())
    .then(pups => {
        for(pup in pups) {
            addPup(pups[pup])
        }
    })
}

function addPup(pup) {
    const dogBar = document.querySelector("div#dog-bar")
    let newSpan = document.createElement("span")
    newSpan.innerText = pup.name
    newSpan.dataset.id = pup.id
    dogBar.append(newSpan)
    savePup(pup)
}