let containerLandingPage = document.getElementById('containerLandingPage')
let slideHolder = document.createElement('DIV')
containerLandingPage.appendChild(slideHolder)
slideHolder.classList.add('slideHolder')
slideHolder.classList.add('containerResponse')
//slideHolder.style.width = `${containerLandingPage.offsetWidth}px`
//slideHolder.style.height = `${containerLandingPage.offsetHeight}px`
slideHolder.style.width = '100vw'

let pcmobView
let niz = []
let brojacNiz = 0

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('mobilni')
    pcmobView = 'imgSlideMob'
} else {
    console.log('desktop')
    pcmobView = 'imgSlide'
}


db.collection(`${pcmobView}`)
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
            slideHolder.style.backgroundImage = `url('${niz[i].src}')`
        },3300 * i)
    }
})
.catch(error => {
    console.log(`Došlo je do greške: ${error}`)
})

