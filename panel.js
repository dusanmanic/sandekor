checker()
let container = document.getElementById('container')

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
                    } else {
                        window.location.href = '..login/login.html'
                    }
                } else if(trenutniUser == null)  {
                    window.location.href = '../login/login.html'
                }
            })
        }
    })
    .catch(error => {
        console.log(`Došlo je do greške: ${error}`)
    });
}
