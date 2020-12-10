let containerLandingPage = document.getElementById('containerLandingPage')
let slideHolder = document.createElement('DIV')
slideHolder.classList.add('slideHolder')
slideHolder.classList.add('containerResponse')

//containerLandingPage.appendChild(slideHolder)

let niz = []
let brojacNiz = 0


db.collection('imgSlide')
.orderBy('datum', 'desc')
.get()
.then(snapshot => {
    if(!snapshot.empty) {
        let imgSlide = snapshot.docs
        imgSlide.forEach((imgs, y) => {
            let tmpimg = new Image()
            let links = imgs.data()
            //console.log(links.downLink, y)          
            
            tmpimg.src = `${links.downLink}`

            niz.push(tmpimg)  
            
            console.log(niz)
        })
    }
}).then(function slider(){
    console.log(niz)

    for(let i=0; i<niz.length; i++) {

        setTimeout(() => {            
            containerLandingPage.style.backgroundImage = `url('${niz[i].src}')`
        },3300 * i)
    }
})
.catch(error => {
    console.log(`Došlo je do greške: ${error}`)
})

