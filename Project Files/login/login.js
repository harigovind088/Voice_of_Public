let email=document.querySelector('[data-email]')
let password=document.querySelector('[data-password]')
let logInBtn=document.querySelector('[data-login-btn]')
let signUpBtn=document.querySelector('[data-signup-link]')
let userId

const auth = firebase.auth()

const db = firebase.database()

function loginWithEmailAndPass(){

    const emailValue=email.value
    const passwordValue=password.value

    auth.signInWithEmailAndPassword(emailValue, passwordValue).then(response=>{
        userId = response.user.uid
        let flag=localStorage.getItem('userFlag')
        if(userId){
            alert("login successfully")
            
            if(flag==="true"){
                redirectToMainPage("../user-page/public/public.html")
                localStorage.setItem("publicId",userId)
            }else{
                redirectToMainPage("../user-page/officer/officer.html")
                localStorage.setItem("officerId",userId)
            }
        }
    }).catch(error=>{
        alert(error.message)
    })
}

function redirectToMainPage(path){
    window.location.href=path
}

logInBtn.addEventListener('click',loginWithEmailAndPass)



signUpBtn.addEventListener('click',()=>{

    let flag=localStorage.getItem('userFlag')

    if(flag==="true"){
        signUpBtn.href="../Sign-up/Public/public-sign-up.html"
    }
    else{
        signUpBtn.href="../Sign-up/Officer/officer-sign-up.html"
    }

})