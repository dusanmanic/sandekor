let headBtns = document.querySelector('.headBtns')
let nizBtns = ['POČETNA', 'O NAMA', 'GALERIJA', 'PRODAJA', 'VIDEO', 'SARADNICI', 'REFERENCE', 'KONTAKT']
let nizHref = ['index', 'onama', 'galerija', 'prodaja', 'video', 'saradnici', 'reference', 'kontakt']


for(let i=0; i<nizBtns.length; i++) {
    
    let btnLi = document.createElement('LI')

    btnLi.innerHTML = `<button class="headerBtns" onclick="location.href = '${nizHref[i]}.html';">${nizBtns[i]}</button>`

    headBtns.appendChild(btnLi)
    
}