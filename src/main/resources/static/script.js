let stompClient = null;

function connect(){
    let socket=new SockJS("/server1")
    stompClient=Stomp.over(socket)
    stompClient.connect({},function (frame){
        console.log("Connected :"+frame)
        $("#name-from").addClass('d-none')
        $("#chat-rum").removeClass('d-none')

        //subscribe
        stompClient.subscribe("/topic/return-to",function (response){
            showMessage(JSON.parse(response.body))
        })
    })

}
function showMessage(message)
{

        $("#message-container-table").prepend('<tr><td><b>${message.name} :</b> ${message.content}</td></tr>')

}
$(document).ready((e)=>{
    $("#login").click(()=>{

        let user=$("name-title").val()
        localStorage.setItem("name",name)
        $("#name-value").html("welcome,<b>${user}</b>")
        connect();
    })
    $("#send-btn").click(()=>{
        sendMessage()
    })
    $("#logout").click(()=>{
        localStorage.removeItem("name")
        if(stompClient!==null)
        {
            stompClient.disconnect()
            $("#name-from").removeClass('d-none')
            $("#chat-rum").addClass('d-none')
            console.log(stompClient)
        }
    })
    function sendMessage(){

        let jsonOb={
            name:localStorage.getItem("name"),
            content:$("#message-val").val()
        }
        stompClient.send("/app/message",{},JSON.stringify(jsonOb));

    }

})