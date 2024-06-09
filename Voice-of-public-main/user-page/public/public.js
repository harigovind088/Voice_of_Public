// Firebase Db initilization
const db=firebase.database()

// Getting user id from localstorage
let id=localStorage.getItem('publicId')

// variable decleration and initialization
let option=document.querySelectorAll(".option")
let problem
let problemDefinition=document.querySelector('[data-text-input]')
let sendBtn=document.querySelector('[data-send-btn]')
let addData=document.querySelector('[data-add]')
let parentDiv=document.querySelector('[data-parent-div]')
let nameText=document.querySelector('[data-name-text]')
let templateParent=document.querySelector('[data-parent-data-box]')
let template=document.querySelector('[data-template]')
let dropClick=document.querySelector('[data-drop-click]')
let dropParent=document.querySelector('[data-drop-parent]')
let problemText=document.querySelector('[data-problem-text]')
let mailText=document.querySelector('[data-email]')
let phoneText=document.querySelector('[data-phone]')
let panchatText=document.querySelector('[data-panchayat]')
let aadharText=document.querySelector('[data-aadhar]')
let logOutBtn=document.querySelector('[data-logout]')
let circleParent=document.querySelector('[data-circle-parent]')

// Switiching b/w add section and view section
addData.addEventListener('click',addClass) 

// function for adding active class
function addClass(){
    parentDiv.classList.add('active')
}

dropClick.addEventListener('click',()=>{
    dropParent.classList.toggle('active')
})



let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
let dateObj =new Date()
let monthName=months[dateObj.getMonth()]
let currentDate=`${monthName} ${dateObj.getDate()} ${dateObj.getFullYear()}`
let currentTime=dateObj.getTime()

// fetcing data from db when loading the page
retrievDataFromDb(id)  

// function for retriwving data from db
function retrievDataFromDb(id){
    
    db.ref(`users/public/${id}`).on('value',(snap)=>{
        
    nameText.innerText=snap.val().name
    mailText.innerText=snap.val().email
    phoneText.innerText=snap.val().phoneNumber
    aadharText.innerText=snap.val().aadharNumber
    panchatText.innerText=snap.val().area

    let arraySnap=Object.values(snap.val().problem)
    arraySnap.forEach(arrayData=>{

        let templateData=template.content.cloneNode(true)
        let problemName=templateData.querySelector('[data-problem-name]')
        let problemDefintionText=templateData.querySelector('[data-problem-definition-text]')
        let reqDateText=templateData.querySelector('[data-date-text]')
        let statusText=templateData.querySelector('[data-status-text]')

        problemName.innerText=arrayData.problemName
        problemDefintionText.innerText=arrayData.definition
        reqDateText.innerText=arrayData.date
        statusText.innerText=arrayData.status

        templateParent.appendChild(templateData)
    })
    parentDiv.classList.add('animation')
  })
  
}

option.forEach((data)=>{
    data.addEventListener('click',()=>{
        problem=data.innerText
        problemText.innerText=data.innerText
        dropParent.classList.remove('active')
    })
})

sendBtn.addEventListener('click',addProblemToDb)

function  setProblemStructure(){

    let problemObj
    let data
    let arrayData

    db.ref(`users/public/${id}`).on('value',(snap)=>{
       data=snap.val().problem
    })

    if(data){
        problemObj={
            id:currentTime,
            problemName:problem,
            definition:problemDefinition.value,
            date:currentDate,
            status:"pending"
        }
        arrayData=Object.values(data)
        arrayData[arrayData.length]=problemObj
        return arrayData
    }else{
        problemObj=[{
            id:currentTime,
            problemName:problem,
            definition:problemDefinition.value,
            date:currentDate,
            status:"pending"
        }]
        return problemObj
    }

}

function addProblemToDb(){

    let problemDef=setProblemStructure()
    db.ref('/users/public/'+id).update({
        problem:problemDef
    })
    window.location.href ="./public.html"
}

logOutBtn.addEventListener('click',()=>{
    localStorage.clear()
    window.location.href="../../index.html"
})

