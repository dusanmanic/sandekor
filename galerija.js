let containerGalerija = document.getElementById('containerGalerija')



db.collection('galerijaKategorije')
.get()
.then(snapshot => {
    if(!snapshot.empty) {
        let allDocs = snapshot.docs
        allDocs.forEach(x => {
            let kategorije = x.data()
            
            let nameCategory = kategorije.name.charAt(0).toUpperCase() + kategorije.name.slice(1)

            let holderDiv = document.createElement('DIV')
            let dugme = document.createElement('BUTTON')

            holderDiv.setAttribute('id', kategorije.name)
            holderDiv.setAttribute('class', 'holderDiv')
            dugme.innerHTML = nameCategory
            dugme.classList.add('dugmeBtn')

            holderDiv.appendChild(dugme)
            containerGalerija.appendChild(holderDiv)


            console.log(nameCategory)


        })
    }
})
.then(function() {
    let galerijaBtns = document.querySelectorAll('.dugmeBtn')

    galerijaBtns.forEach(btn =>{
        
        btn.addEventListener('click', event => {
            console.log(event.path[1].id)
            containerGalerija.innerHTML = ""

            db.collection(`${event.path[1].id}`)
            .get()
            .then(snapshot => {
                if(!snapshot.empty) {
                    let allDocs = snapshot.docs
                    allDocs.forEach(x => {
                        let slike = x.data()

                        let slikaDiv = document.createElement('DIV')
                        let slikaImg = document.createElement('IMG')
                        slikaImg.setAttribute('src', `${slike.downLink}`)
                        slikaDiv.setAttribute('id', `${event.path[1].id}`)

                        slikaDiv.appendChild(slikaImg)
                        containerGalerija.appendChild(slikaDiv)

                        console.log(slike.downLink)

                    })
                }
            })



        })
    })
})
