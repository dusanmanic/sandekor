let login = document.getElementById('login')
let logOut = document.getElementById('logout')
let signin = document.getElementById('signin')
let panel = document.getElementById('panel')

btnCheck()

function btnCheck() {

    let logBtn = localStorage.getItem('btns')

    if(logBtn === "true") {
        login.classList.add("removeLi")
        signin.classList.add("removeLi")
        logOut.classList.remove("removeLi")
        panel.classList.remove("removeLi")
    } else {
        logOut.classList.add("removeLi")
        panel.classList.add("removeLi")
        login.classList.remove("removeLi")
        signin.classList.remove("removeLi") 

    }
}

function checker() {
    
    db.collection('login_info')
    .get()
    .then(snapshot => {
        if(!snapshot.empty) {
            let login_info = snapshot.docs
            login_info.forEach(user => {
                let userInfo = user.data()

                datum = new Date (),
                datumProvera = new Date ( datum );
                datumProvera.setMinutes ( new Date().getMinutes() + 30 );

                let trenutniUser = localStorage.getItem('curentUser')
                let trenutniToken = localStorage.getItem('curT')

                if(trenutniUser === userInfo.information.user && trenutniToken === userInfo.token) {
                    if(userInfo.log) {
                        document.body.style.display = "block"
                        console.log(`Korisnik je logovan`)
                    } else {
                        window.location.href = './login/login.html'
                    }
                } else if(trenutniUser == null)  {
                    window.location.href = './login/login.html'
                }
            })
        }
    })
    .catch(error => {
        console.log(`Došlo je do greške: ${error}`)
    });
}

function logout () {
    logOut.classList.add("removeLi")
    panel.classList.add("removeLi")
    login.classList.remove("removeLi")
    signin.classList.remove("removeLi") 

    db.collection('login_info')
    .get()
    .then(snapshot => {
        if(!snapshot.empty) {
            let login_info = snapshot.docs
            login_info.forEach(user => {
                let userInfo = user.data()
                
                datum = new Date ();
                // datumProvera = new Date ( datum );
                // datumProvera.setMinutes ( new Date().getMinutes() + 30 );
                console.log(localStorage.getItem('curentUser') === userInfo.information.user)
                console.log(userInfo.information.user)

                if(localStorage.getItem('curentUser') === userInfo.information.user) {
                    console.log('ulaziOvde')
                    let datum = new Date();
                    let update = {
                        logged_out: firebase.firestore.Timestamp.fromDate(datum),
                        log: false
                    }
                    db.collection('login_info').doc(`${userInfo.information.user}`).update(update)

                    localStorage.removeItem('curT')
                    localStorage.removeItem('curentUser')
                    localStorage.removeItem('btns')

                    checker()
                    
                }
            })
        }
    })

    .catch(error => {
        console.log(`Došlo je do greške: ${error}`)
    });
}

// window.addEventListener('resize', event => {
//     console.log(window.innerHeight)
//     console.log(window.innerWidth)
// })