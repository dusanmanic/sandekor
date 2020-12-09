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

            holderDiv.setAttribute('id', kategorije.name)
            holderDiv.setAttribute('class', 'holderDiv')
            holderDiv.style.backgroundImage = `url('${kategorije.tumbUrl}')`

            containerGalerija.appendChild(holderDiv)
        })
    }
})
.then(function() {
    let galerijaBtns = document.querySelectorAll('.holderDiv')

    galerijaBtns.forEach(btn =>{
        
        btn.addEventListener('click', event => {
            console.log(event.path[0].id)
            containerGalerija.innerHTML = ""

            db.collection(`${event.path[0].id}`)
            .get()
            .then(snapshot => {
                if(!snapshot.empty) {
                    let allDocs = snapshot.docs
                    allDocs.forEach(x => {
                        let slike = x.data()

                        let slikaDiv = document.createElement('DIV')
                        let slikaImg = document.createElement('IMG')
                        slikaImg.setAttribute('src', `${slike.downLink}`)
                        slikaDiv.setAttribute('class', 'slikaDiv')
                        slikaDiv.style.backgroundImage = `url('${slike.downLink}')`
                        containerGalerija.appendChild(slikaDiv)

                        console.log(slike.downLink)

                    })
                }
            })



        })
    })
})
