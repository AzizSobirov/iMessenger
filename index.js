let as_nav_h2 = 'iMessenger'
let as_nav_h3 = ''
let as_nav_list = [
    {name:'Home',href:'#'},
    {name:'My Profile',href:'#'},
    {name:'About Us',href:'#'},
    {name:'Contact Us',href:'#'}
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

let user_name = document.getElementById('scrollToFooter')
function login(){
    let username = document.querySelector('.username')
    if(username.value == ''){
        alert("Please write your name")
    }else{
        user_name.innerHTML = username.value
        document.getElementById('login').style.display='none'
    }
}
 
 
let messages = document.getElementById("messages")
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