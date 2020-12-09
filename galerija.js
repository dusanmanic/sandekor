let containerGalerija = document.getElementById('containerGalerija')
let imageHolder = document.querySelector('.imageHolder')
let counterPopUpImg = 0

db.collection('galerijaKategorije')
.get()
.then(snapshot => {
    if(!snapshot.empty) {
        let allDocs = snapshot.docs
        allDocs.forEach(x => {
            let kategorije = x.data()
            
            nameCategory = kategorije.name.charAt(0).toUpperCase() + kategorije.name.slice(1)

            let tumbImg = document.createElement('IMG')
            let tumbSpan = document.createElement('SPAN')
            let tumbDiv = document.createElement('DIV')

            tumbDiv.setAttribute('class', 'tumbDiv')

            tumbSpan.innerHTML = nameCategory
            tumbImg.setAttribute('id', kategorije.id)
            tumbImg.setAttribute('class', 'holderImg')
            tumbImg.setAttribute('src', kategorije.tumbUrl)

            tumbDiv.appendChild(tumbImg)
            tumbDiv.appendChild(tumbSpan)
            imageHolder.appendChild(tumbDiv)
        })
    }
})
.then(function() {
    let galerijaBtns = document.querySelectorAll('.holderImg')

    galerijaBtns.forEach(btn =>{
        
        btn.addEventListener('click', event => {
            console.log(event)
            console.log(event.path[0].id)
            imageHolder.innerHTML = ""
            let path = event.path[0].id
            
            db.collection(`${event.path[0].id}`)
            .orderBy('datum', 'desc')
            .get()
            .then(snapshot => {
                if(!snapshot.empty) {
                    let allDocs = snapshot.docs
                    allDocs.forEach(x => {
                        let slike = x.data()
                        let frameDiv = document.createElement('DIV')
                        let slikaImg = document.createElement('IMG')
                        let delBtnImg = document.createElement('BUTTON')
                        frameDiv.setAttribute('class', 'frameDiv')
                        delBtnImg.textContent = "obriši"
                        delBtnImg.setAttribute('class', 'delBtnImg')
                        slikaImg.setAttribute('class', 'slikaImg')
                        slikaImg.setAttribute('src', slike.downLink)
                        frameDiv.appendChild(slikaImg)
                        frameDiv.appendChild(delBtnImg)                        
                        imageHolder.appendChild(frameDiv)

                        console.log(slike.downLink)

                        if(localStorage.getItem('curT') === null) {
                            delBtnImg.classList.add('removeLi')
                        } else {
                            delBtnImg.classList.remove('removeLi')
                        }

                        delBtnImg.addEventListener('click', event => {
                            db.collection(`${path}`).doc(`${slike.name}`).delete()

                            let deleteRef = storage.ref().child(`${path}/${slike.name}`)                            
                            deleteRef.delete()
                            frameDiv.remove()
                            console.log(slike.name)
                        })

                        slikaImg.addEventListener('click', event => {
                            counterPopUpImg++
                                console.log(event.target.currentSrc)

                                if(counterPopUpImg === 1) {
                                    console.log(counterPopUpImg)
                                    imageHolder.style.display = 'none'
                                    let klikSlika = document.createElement('img')
                                    let popUpDiv = document.createElement('DIV')
                                    popUpDiv.setAttribute('class', 'popUpDiv')
                                    containerGalerija.appendChild(popUpDiv)
                                    klikSlika.setAttribute('src', event.target.currentSrc)
                                    klikSlika.setAttribute('class', 'slikaVeca')
                                    popUpDiv.appendChild(klikSlika)
                  
                                    klikSlika.addEventListener('click', event => {
                                        counterPopUpImg++
                                        if(counterPopUpImg === 2) {
                                                popUpDiv.innerText = ""
                                            popUpDiv.style.display = 'none'
                                            imageHolder.style.display = ""
                                            counterPopUpImg = 0
                                        }   
                                    })
                                }
                            })
                        

                    })
                }
            })
        })
    })
})
