let publicBtn=document.querySelector('[data-public]')
let officerBtn=document.querySelector('[data-officer]')

const addingToLocalStorage = (flag) =>{
    localStorage.setItem('userFlag',flag)
    window.location.href = "./login/login.html";
}

publicBtn.addEventListener('click',()=>{
    addingToLocalStorage(true)
})

officerBtn.addEventListener('click',()=>{
    addingToLocalStorage(false)
})