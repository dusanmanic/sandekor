let kategorijeDiv = document.querySelector('.kategorijeDiv')
let kategorijaInput = document.getElementById('kategorijaInput')
let delCounter = 0

db.collection('galerijaKategorije')
.get()
.then(snapshot => {
    if(!snapshot.empty) {
        let allDocs = snapshot.docs
        allDocs.forEach(x => {
            let kategorije = x.data()
            
            let nameCategory = kategorije.name.charAt(0).toUpperCase() + kategorije.name.slice(1)
            let btnsDiv = document.createElement('DIV')
            let btnKategorija = document.createElement('BUTTON')
            let btnDel = document.createElement('BUTTON')

            btnDel.textContent = "del"
            btnDel.setAttribute('class', 'delDugmici removeLi')
            btnsDiv.setAttribute('id', kategorije.id)
            btnKategorija.setAttribute('class', 'katDugmici')
            btnKategorija.textContent = nameCategory

            btnsDiv.appendChild(btnDel)
            btnsDiv.appendChild(btnKategorija)
            kategorijeDiv.appendChild(btnsDiv)

        })
    }
})
.then(function(){
    let btns = document.querySelectorAll('.delDugmici')

    btns.forEach(btn => {
        btn.addEventListener('click', event => {
            let btnDiv = document.querySelector(`#${event.path[1].id}`)
            console.log(event.path[1].id)
            db.collection('galerijaKategorije').doc(`${event.path[1].id}`).delete()
            btnDiv.remove()            
        })
    })
})
.then(function(){
    let katBtns = document.querySelectorAll('.katDugmici')
    katBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            console.log('print')
            console.log(event.path[1].id)
        })
    })
})
.catch(error => {
    console.log(`Došlo je do greške: ${error}`)
});

function showHideDelBtn() {
    delCounter++

    if(delCounter == 1) {
        let btns = document.querySelectorAll('.delDugmici')
        btns.forEach(x => {
            x.classList.remove('removeLi')
        })
    } else {
        let btns = document.querySelectorAll('.delDugmici')
        btns.forEach(x => {
            x.classList.add('removeLi')
            delCounter = 0
        })
    }
}

function dodajGaleriju (){
    let imeKategorije 
    let id

    if(kategorijaInput.value[0] === kategorijaInput.value[0].toUpperCase() ) {
        imeKategorije = kategorijaInput.value.charAt(0).toLowerCase() + kategorijaInput.value.slice(1)
        id = imeKategorije
        console.log('ima veliko slovo')
        console.log('kategorija 1')

    } else {
        imeKategorije = kategorijaInput.value
    }
    
    if (imeKategorije.indexOf(' ') >= 0) {
        id = imeKategorije.replace(/\s/g, '')
        console.log('kategorija 3')
    } else {
        id = imeKategorije
        console.log('kategorija 4')
    } 

    let dodaj = {
        name: imeKategorije,
        id: id
    }
    db.collection('galerijaKategorije').doc(`${id}`).set(dodaj)

    setTimeout(() => {
        location.reload()
    },1500)

}