
// Firebase db decleration
const db=firebase.database()

// getting id from localstorage
let id=localStorage.getItem('officerId')

let templateParent=document.querySelector('[data-template-parent]')
let templateComponent=document.querySelector('[data-template]')
let nameText=document.querySelector('[data-name]')
let mailText=document.querySelector('[data-email]')
let phoneText=document.querySelector('[data-phone]')
let panchayatText=document.querySelector('[data-panchayat]')
let idText=document.querySelector('[data-id]')
let aadharText=document.querySelector('[data-aadhar]')
let logOutBtn=document.querySelector('[data-logout]')
let animationParent=document.querySelector('[data-animation-parent]')

let officerArea

retrievDataFromDb(id)

function retrievDataFromDb(id){
    db.ref(`users/officer/${id}`).on('value',(snap)=>{
        officerArea=snap.val().area
        nameText.innerText=snap.val().name
        mailText.innerText=snap.val().email
        phoneText.innerText=snap.val().phoneNumber
        panchayatText.innerText=officerArea
        aadharText.innerText=snap.val().aadharNumber
        idText.innerText=snap.val().officerId
    })
    
    db.ref(`users/public`).on('value',(snap)=>{
        let data=Object.values(snap.val())
        if(officerArea){
            data.forEach((cred=>{
                if(cred.area===officerArea){
                    let transferData=Object.values(cred.problem)
                    let userId=cred.id
                    transferData.forEach((resData,i)=>{
                         blahblag(resData,userId,i) 
                    })
                }  
            }))
            
            animationParent.classList.add('animation')
        }
        
    })
}

function blahblag(data,userId,i){
    let template=templateComponent.content.cloneNode(true)
    template.querySelector('[data-problem-text]').innerText=data.problemName
    template.querySelector('[data-problem-def-text]').innerText=data.definition
    template.querySelector('[data-date-text]').innerText=data.date
    let option=template.querySelectorAll(".option")
    option.forEach(d=>{
        d.dataset.id=userId
        d.dataset.index=i
    })
    let statusText=template.querySelector('[data-status-text]')
    let dropBtn=template.querySelector('[data-drop-click]')
    let dropParent=template.querySelector('[data-drop-parent]')
    templateParent.appendChild(template)
    statusText.innerText=data.status
    option.forEach((element,i) => {
        element.addEventListener('click',()=>{
            statusText.innerText=element.innerText
            updateStatus(element.dataset.id,element.dataset.index,element.innerText)
            dropParent.classList.remove('active')
        })
    });

    dropBtn.addEventListener('click',()=>{
        dropParent.classList.toggle('active')
    })

}

logOutBtn.addEventListener('click',()=>{
    localStorage.clear()
    window.location.href="../../index.html"
})

function updateStatus(userId,index,statusT){
    let data
    db.ref(`users/public/${userId}`).on('value',(snap)=>{
        data=Object.values(snap.val().problem)
    })

    if(data){
        data[index].status=statusT
        db.ref('/users/public/'+userId).update({
            problem:data
        })
    }
    location.reload(true)
}


