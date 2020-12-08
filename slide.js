let containerSlide = document.getElementById('containerSlide')
let slideImages = document.querySelector('.slideImages')
let uploadInput = document.querySelector('.uploadInput')
let inputForm = document.createElement('FORM')

fileUpload.addEventListener('change', event => {
    // console.log(event.target.files)
    // console.log(event.target.files[0])
    // console.log(event.target.files[0].name)
    // console.log(event.target.files.length)

    // let slika = event.target.files[0]
    // let slikaIme = event.target.files[0].name
    // let slika = event.target.files
    // let slikaIme = new Date()

    // toStorage = storage.ref(`slideImages/${slikaIme}`)
    // let uploadTask = toStorage.put(slika)
    
    // spanProgres.innerHTML = ""

    // uploadTask.on("state_changed", function (snapshot) {
    //     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
    //     uploadInput.appendChild(spanProgres)
    //     spanProgres.innerHTML = `${Math.round(progress)}%`
        
    //     console.log(spanProgres)
    // }) 
    let slika = event.target.files

    if(slika.length >= 0) {

        for(let i=0; i<slika.length; i++) {

            let spanName = document.createElement('SPAN')
            let spanProgress = document.createElement('SPAN')
            let slikaIme = event.target.files[i].name
            let datum = new Date();
            let datumUbacivanja = new Date ( datum );
            datumUbacivanja.setMinutes ( new Date().getMinutes() - i );            

            console.log(datum)
            console.log(datumUbacivanja)

            toStorage = storage.ref(`slideImages/${slikaIme}`)
            let uploadTask = toStorage.put(slika[i])

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploadInput.appendChild(spanName)              
            spanName.innerHTML = `${slika[i].name} `
            uploadInput.appendChild(spanProgress)
            spanProgress.innerHTML = `${Math.round(progress)}%<br>`
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
            }, function(error) {
            // Handle unsuccessful uploads
            }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);

                // let storageRef = storage.ref()
                let dodaj = {
                    name: slikaIme,
                    downLink: downloadURL,
                    datum: datumUbacivanja
                }

                db.collection('imgSlide').doc(`${slikaIme}`).set(dodaj)
                
                let imgHolder = document.createElement('DIV')
                let downImg = document.createElement('IMG')

                downImg.setAttribute('src', downloadURL)
                downImg.setAttribute('width', '100px')

                slideImages.appendChild(imgHolder)
                imgHolder.appendChild(downImg)

                })
            
            });
        }
    }
})

function loadSlideImages() {
    slideImages.innerHTML = ""

    let storageRef = storage.ref()

    db.collection('imgSlide')
    .orderBy('datum', 'desc')
    .get()
    .then(snapshot => {
        if(!snapshot.empty) {
            let imgSlide = snapshot.docs
            imgSlide.forEach((imgs, y) => {
                
                let links = imgs.data()
                tmpimg = new Image()
                tmpimg.src = links.downLink
                
                let btnDel = document.createElement('button')
                let imgHolder = document.createElement('DIV')
                let downImg = document.createElement('IMG')
                let inputNumb = document.createElement('INPUT')
                let br = document.createElement('BR')

                inputNumb.setAttribute('type', 'number')
                inputNumb.style.width = '40px'

                downImg.setAttribute('src', tmpimg.src)
                downImg.setAttribute('width', '100px')

                slideImages.appendChild(imgHolder)
                imgHolder.appendChild(downImg)
                imgHolder.appendChild(br)
                imgHolder.appendChild(inputNumb)


                btnDel.innerHTML = "Obrisi"
                btnDel.id = links.name
                imgHolder.appendChild(btnDel)

                btnDel.addEventListener('click', event => {
                    console.log(event.target.id)
                    let imeSlike = links.name
                    let deleteRef = storageRef.child(`slideImages/${imeSlike}`)
                    db.collection('imgSlide').doc(`${imeSlike}`).delete()
                    deleteRef.delete()
                    imgHolder.remove()
                    btnDel.remove()
                    inputNumb.remove()
                })
            })
        }
    })
    .catch(error => {
        console.log(`Došlo je do greške: ${error}`)
    })

}

/*
function loadSlideImages() {
    slideImages.innerHTML = ""

    let storageRef = storage.ref() 
    // let listRef = storageRef.child('images')
    let listRef = storageRef.child(`slideImages`)

    // Find all the prefixes and items.
    listRef.listAll().then(function(res) {
    res.prefixes.forEach(function(folderRef) {
    // All the prefixes under listRef.
    // You may call listAll() recursively on them.
    console.log(`uslo ovde`)
    folderRef.listAll().then(test => {
        let items = test.items
        console.log(items)
        items.forEach(item => {
            item.getDownloadURL().then(item => {
                console.log(item)
            })
        })
    })

    });
    res.items.forEach(function(itemRef) {
    // All the items under listRef.

    console.log(`uslo ovde 2`)
    itemRef.getDownloadURL().then(item => {

        console.log(itemRef.name)
        let btnDel = document.createElement('button')
        let imgHolder = document.createElement('DIV')
        let downImg = document.createElement('IMG')
        let inputNumb = document.createElement('INPUT')
        let br = document.createElement('BR')

        inputNumb.setAttribute('type', 'number')
        inputNumb.style.width = '40px'

        downImg.setAttribute('src', item)
        downImg.setAttribute('width', '100px')

        slideImages.appendChild(imgHolder)
        imgHolder.appendChild(downImg)
        imgHolder.appendChild(br)
        imgHolder.appendChild(inputNumb)
        console.log(item)


        btnDel.innerHTML = "Obrisi"
        btnDel.id = itemRef.name
        imgHolder.appendChild(btnDel)

        btnDel.addEventListener('click', event => {
            console.log(event.target.id)
            let imeSlike = event.target.id
            let deleteRef = storageRef.child(`slideImages/${imeSlike}`)
            db.collection('imgSlide').doc(`${imeSlike}`).delete()
            deleteRef.delete()
            imgHolder.remove()
            btnDel.remove()
            inputNumb.remove()
          })

        })
    });
    }).catch(function(error) {
    // Uh-oh, an error occurred!
    });

}
*/



// uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//     let downImg = document.createElement('IMG')

//     downImg.setAttribute('src', downloadURL)
//     downImg.setAttribute('width', '100px')

//     slideImages.appendChild(downImg)
//     console.log('File available at', downloadURL);
// });




/*
    if(slika.length >= 0) {

        for(let i=0; i<slika.length; i++) {

            console.log(slika)
            brojacOne++
            let secondSide = slika.length

            let spanName = document.createElement('SPAN')
            let spanProgress = document.createElement('SPAN')
            let slikaIme = event.target.files[i].name

            
            console.log(brojacOne)
            console.log(secondSide)

            if(brojacOne == secondSide ) {
                setTimeout(() => {
                    loadSlideImages()
                }, 2000)               
            }

            toStorage = storage.ref(`slideImages/${slikaIme}`)
            let uploadTask = toStorage.put(slika[i])

            // uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  
            //     console.log('File available at', downloadURL);
            // });

            // let datum = new Date();
            // let setName = {
            //     imgName: 
            // }

            // db.collection('imgSlide').doc(`${firebase.firestore.Timestamp.fromDate(datum)}`).set(setName)

            console.log(slika[i])
            console.log(slika[i].name)
            console.log(slikaIme)

            // spanProgres.innerHTML = ""

            uploadTask.on("state_changed", function (snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                

                uploadInput.appendChild(spanName)              
                spanName.innerHTML = `${slika[i].name} `

                uploadInput.appendChild(spanProgress)
                spanProgress.innerHTML = `${Math.round(progress)}%<br>`

                console.log(snapshot.state)

            })
        }
    }
    */