$(document).ready(function(){
    
/*if ($(window).width() >= 768 )  {
    var vloggerHeight = $('#vloggers-section figure:first-child').height();
    $('#vloggers-last').css({
        "height": vloggerHeight,
    })
}    
    
    $( window ).resize(function() {
        if ($(window).width() == 768 )  {
        console.log('hello');
        var vloggerHeight = $('#vloggers-section figure:first-child').height();
        console.log(vloggerHeight);
        $('#vloggers-last').css({
            "height": vloggerHeight,
        });
        }
    })*/
    

  $("#vloggers-section figure, #vlogger-friends figure").mouseenter(function(){
    $(this).find("figcaption").css({
      "border-bottom": "5px solid #3aafb9",
    })
  })
  $("#vloggers-section figure, #vlogger-friends figure").mouseleave(function(){
    $(this).find("figcaption").css({
      "border-bottom": "5px solid #f6f6f6",
    })
  })
  
  

})
