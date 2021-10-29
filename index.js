let as_nav_h2 = 'iMessenger'
let as_nav_h3 = ''
let as_nav_list = [
    {name:'Home',href:'#home'},
    {name:'My Profile',href:'#profile'}
]

const firebaseConfig = {
    apiKey: "AIzaSyDJRxPDEP3mTcuGI5Nh-wCvl9Y2ey2-Iso",
    authDomain: "vueapp-83a2e.firebaseapp.com",
    databaseURL: "https://vueapp-83a2e-default-rtdb.firebaseio.com",
    projectId: "vueapp-83a2e",
    storageBucket: "vueapp-83a2e.appspot.com",
    messagingSenderId: "646555508793",
    appId: "1:646555508793:web:a44b7cd85b921640d9ede8",
    measurementId: "G-81K3G6000R"
 };
 firebase.initializeApp(firebaseConfig);

 let allUsers = []
 console.log(allUsers);

let user_name = document.getElementById('username')
let user_email = document.getElementById('email')
let user_pass = document.getElementById('password')
function login(){
    let username = document.querySelector('.username')
    let email = document.querySelector('.email')
    let password = document.querySelector('.password')
    
    let lg_name = document.getElementById('lg_name')
    if(username.value !== ''){
        let text = ''
        for(let i=0;i<allUsers.length;i++){
            text += allUsers[i].name.toLowerCase()
            let name = username.value.toLowerCase()
            if(text.includes(name)){
                lg_name.textContent = 'username was taken'
            }else{
                lg_name.textContent = 'Complated'
            }
        }
    }
    
    let lg_mail = document.getElementById('lg_mail')
    if(email.value !== ''){
        lg_mail.textContent = 'Complated'   
    }else{
        lg_mail.textContent = 'Type your Email'
    }

    let lg_password = document.getElementById('lg_password')
    if(password.value !== '' && password.value.length >= 8){
        lg_password.textContent = 'Complated'
    }else{
        lg_password.textContent = 'Password is short'
    }

    if(lg_name.textContent == 'Complated' && lg_mail.textContent == 'Complated' && lg_password.textContent == 'Complated'){
        user_name.innerHTML = username.value
        user_email.innerHTML = email.value
        user_pass.innerHTML = password.value
        document.getElementById('login').style.display='none'
        scrollDown()
        alertia({
            "msg": "Succesfuly loged in",
            "type":"success",
            "style":"slit",
            "time":"3000"
        });

    }else{
        alertia({
            "msg": "Something went Wrong",
            "type":"normal",
            "style":"slit",
            "time":"3000"
        });
    }
}
 
 
let messages = document.getElementById("messages")
function scrollDown(){
    messages.scrollTo(0,messages.scrollHeight)
}
function sendMessage(){
    let d = new Date()
    let hour = d.getHours()
    let minute = d.getMinutes()
    if(hour < 10){hour = '0' + hour}
    if(minute < 10){minute = '0' + minute}
    let time = hour + ':' + minute
   
    let userMessage = document.querySelector('.user_message')
    let userName = user_name.innerHTML
    let userPassword = '121'

    if(userMessage.value == ''){
        alert("False")
        return false
    }else{
        firebase.database().ref("messages").push().set({
            "sender": userName,
            "password": userPassword,
            "message": userMessage.value,
            "time": time,
        });
        userMessage.value = ''
    }
}

firebase.database().ref("messages").on("child_added", function (data){
    allUsers.push({
        name:data.val().sender,
        password:data.val().password,
        time:data.val().time,
        message:data.val().message,
        key:data.key,
    })

    messages.innerHTML+=`
     <li id="message-${data.key}" class="messageList">
         <h3 class="fad fa-user"></h3>
         <div class="message_bx">
             <span>
                 <h5>${data.val().sender}</h5>
                 <h5>${data.val().time}</h5>    
             </span>
             <p data-id="${data.val().password}">${data.val().message}</p>
         </div>
         <h3 class="fad fa-trash" data-id="${data.key}" onclick="delMessage(this)"></h3>
     </li>`

     scrollDown()
     // let messageList = document.querySelectorAll('.messageList')
     // for(let i=0;i<messageList.length;i++){
     //     let btn = messageList.querySelector(".far.fa-trash")
     //     let mes = messageList.querySelector("p")
     //     let pas = mes.getAttribute('data-id')

     //     console.log(pas);
     //     if(pas == data.val().password){
     //         btn[i].style.display="flex"
     //     }
     // }
});

function delMessage(val){
 var messageId  = val.getAttribute("data-id");
 firebase.database().ref("messages").child(messageId).remove();

 firebase.database().ref("messages").on("child_removed", function(index){
     let mesList = document.getElementById("message-" + index.key)
     let mes = mesList.querySelector("p").innerHTML= 'Deleted'
 });
}