let headBtns = document.querySelector('.headBtns')

let nizBtns = ['POČETNA', 'slide','galerija', 'prodaja', 'video', 'saradnici', 'reference']
let nizHref = ['index', 'slide', 'galerijaPanel', 'prodajaPanel', 'videoPanel', 'saradniciPanel', 'referencePanel']


for(let i=0; i<nizBtns.length; i++) {
    
    let btnLi = document.createElement('LI')

    btnLi.innerHTML = `<button class="headerBtns" onclick="location.href = '${nizHref[i]}.html';">${nizBtns[i]}</button>`

    headBtns.appendChild(btnLi)
}

let responseLi = document.createElement('LI')
responseLi.innerHTML = `<button class="menuBtn responseBtn" onclick="btnsShowHide()">MENU</button>`
responseButton.appendChild(responseLi)


function btnsShowHide() {
    counterShowHide++
    if(counterShowHide === 1) {
        counterShowHide = 0
        document.querySelector('.headBtns').style.display = "flex"
        document.querySelector('.responseBtn').style.display = "none"

    }
}