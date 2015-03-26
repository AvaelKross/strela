function validateEmail(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
var params = [];
var query = location.search.substr(1); 
var A = query.split("&");
var qwe;
for (var j=0; j<A.length; j++){ qwe = A[j].split("="); params[qwe[0]] = qwe[1]; }
var key;
key = params['key'];
if (key==undefined) {key="Прямой заход";}
var group = params['group']
var mail = params['mail']

$(document).ready(function() {

  var videoLink = "http://player.vimeo.com/video/118600750?autoplay=1&color=b4d700&title=0&byline=0&portrait=0";

  $('#video-image').click(function(){
    var embed = $(this).parent().find('.embed');
    $(this).fadeOut('fast');
    embed.html($(this).data('embed')).show();
    yaCounter29229995.reachGoal('video');
    return false;
  })

  $(".closer").on('click', function(){
    $(".popup").css("display", "none");
  });

  $(".openPolitics").on('click', function(e){
    $("#showPolitics").css("display", "block");
    e.preventDefault();
  });
  
  $(".play-button").on('click', function(){
    $('#video-popup iframe').attr('src', videoLink)
    $("#video-popup").css("display", "block");
  });

  $("#video-popup .closer").on('click', function(){
    $('#video-popup iframe').attr('src',''); 
  })
  
  var phonemask = "+7 (999) 999-99-99"
  $("#phone").mask(phonemask);
  $("#phone1").mask(phonemask);
  $("#phone2").mask(phonemask);
  $("#phone3").mask(phonemask);

  $(".fancybox").fancybox();
  
  function send_data(name, email, phone, form){
    if ($(name).val().length==0) { alert("Пожалуйста, введите своё имя"); return;}
    if ($(phone).val().length==0) { alert("Пожалуйста, введите свой номер телефона"); return;}
    if ($(email).length>0 && $(email).val().length==0) { alert("Пожалуйста, введите свой адрес электронной почты"); return;}
    if ($(email).length>0 && !validateEmail($(email).val())) { alert("Пожалуйста, введите корректный адрес электронной почты"); return;}
    
    var data = { 
      name: $(name).val(), 
      email: $(email).val(), 
      phone: $(phone).val(), 
      form: form
    }
    data['utm_content'] = params['utm_content'];
    data['utm_campaign'] = params['utm_campaign'];
    data['utm_source'] = params['utm_source'];
    data['utm_term'] = params['utm_term'];
    data['utm_medium'] = params['utm_medium'];

    $.ajax({
      type: "POST",
      dataType: 'json',
      url: "ajax-proxy",
      data: data
    })
      .done(function( msg ) {
      console.log(msg);
      });
    $("#thanks").css("display", "block"); 
  }

  $("#submit_button2").on('click', function(){send_data('#name2', '#email2', '#phone2', "Запрос подробностей")});
  $("#submit_button1").on('click', function(){send_data('#name1', '#email1', '#phone1', "Запрос подробностей")});
  $("#submit_button3").on('click', function(e){e.preventDefault(); send_data('#name3', '#email3', '#phone3', "Запрос подробностей")});
  $("#manager-button").on('click', function(){send_data('#name', '#email', '#phone', "консультация менеджера")});
});