$(function(){
$("#btn").on("click", function(){
 let input = $("#user").val();
 let msg = $("#msg").val();

   if (input != "" && msg != ""){
     let ap = $("<tr><td>"+input+"</td><td>"+msg+"</td></tr>");
     $("#schema").append(ap);
     $("#user").val('');
     $("#msg").val('');
     $("#user").focus();
   }else {
     alert("write down!!!");
   }
})
});
