let headBtns = document.querySelector('.headBtns')
let responseButton = document.querySelector('.responseButton')
let nizBtns = ['POČETNA', 'slide','galerija', 'prodaja', 'video', 'saradnici', 'reference']
let nizHref = ['index', 'slide', 'galerijaPanel', 'prodajaPanel', 'videoPanel', 'saradniciPanel', 'referencePanel']
let counterShowHide = 0

for(let i=0; i<nizBtns.length; i++) {
    
    let btnLi = document.createElement('LI')

    btnLi.innerHTML = `<button class="headerBtns" onclick="location.href = '${nizHref[i]}.html';">${nizBtns[i]}</button>`

    headBtns.appendChild(btnLi)
}

let responseLi = document.createElement('LI')
responseLi.innerHTML = `<button class="menuBtn responseBtn" onclick="btnsShowHide()">MENU</button>`
responseButton.appendChild(responseLi)

// console.log(window.innerWidth)
// console.log(counterShowHide)

if(window.innerHeight > 455) {
    // console.log('jeste')
    // console.log(window.innerHeight > 455)
    document.body.addEventListener('click', event => {
        console.log(event.path[0].id)
        let btnId = event.path[0].id
        //console.log(window.innerHeight)
        //console.log(window.innerWidth)
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
}