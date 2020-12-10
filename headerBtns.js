let headBtns = document.querySelector('.headBtns')
let responseButton = document.querySelector('.responseButton')
let nizBtns = ['POČETNA', 'O NAMA', 'GALERIJA', 'PRODAJA', 'VIDEO', 'SARADNICI', 'REFERENCE', 'KONTAKT']
let nizHref = ['index', 'onama', 'galerija', 'prodaja', 'video', 'saradnici', 'reference', 'kontakt']
let counterShowHide = 0


for(let i=0; i<nizBtns.length; i++) {
    
    let btnLi = document.createElement('LI')

    btnLi.innerHTML = `<button class="headerBtns" onclick="location.href = '${nizHref[i]}.html';">${nizBtns[i]}</button>`

    headBtns.appendChild(btnLi)
    
}

let responseLi = document.createElement('LI')
responseLi.innerHTML = `<button class="menuBtn  responseBtn" id="menuBtn">MENU</button>`
responseButton.appendChild(responseLi)

document.body.addEventListener('click', event => {
    console.log(event.path[0].id)
    let btnId = event.path[0].id
    if(btnId.includes('menuBtn')) {
        counterShowHide++
        if(counterShowHide === 1) {
            counterShowHide = 0
            document.querySelector('.headBtns').style.display = "flex"
            document.querySelector('.responseBtn').style.display = "none"

        }           

    } else {
        document.querySelector('.headBtns').style.display = "none"
        document.querySelector('.responseBtn').style.display = "block"
    }
        
})