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

function ValidateFileUpload() {
  var fuData = document.getElementById('review-file');
  var FileUploadPath = fuData.value;

  //To check if user upload any file
  if (FileUploadPath == '') {
    alert("Please upload an image");

  } else {
    var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();

    //The file uploaded is an image

    if (Extension == "gif" || Extension == "png" || Extension == "jpeg" || Extension == "jpg") {

      if (fuData.files && fuData.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#file-preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(fuData.files[0]);
      }
    }else{
      alert("Photo only allows file types of GIF, PNG, JPG, JPEG. ");
    }
  }
}

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

  $("#open-review-form").on('click', function(){
    $("#send-review-popup").css("display", "block");
  });

  $(".subphone").on('click', function(){
    $("#call-me").css("display", "block");
  });

  $("#open-file").on('click', function(){
    $("#review-file").click();
  });
  
  var phonemask = "+7 (999) 999-99-99"
  $("#phone_footer").mask(phonemask);
  $("#phone1").mask(phonemask);
  $("#phone_video").mask(phonemask);
  $("#phone-special-offer").mask(phonemask);
  $("#phone-call").mask(phonemask);
  $("#phone-review").mask(phonemask);

  $(".fancybox").fancybox();
  
  function send_data(name, email, phone, form){
    if ($(name).val().length==0) { alert("Пожалуйста, введите своё имя"); return;}
    if ($(phone).val().length==0) { alert("Пожалуйста, введите свой номер телефона"); return;}
    if ($(email).length>0 && $(email).val().length==0) { alert("Пожалуйста, введите свой адрес электронной почты"); return;}
    if ($(email).length>0 && !validateEmail($(email).val())) { alert("Пожалуйста, введите корректный адрес электронной почты"); return;}
    
    var data = {}

    if (form == "Новый отзыв") {
      if ($("#org-name").val().length==0) { alert("Пожалуйста, введите название организации"); return;}
      if ($("#review-text").val().length==0) { alert("Пожалуйста, введите текст отзыва"); return;}

      data = { 
        name: $(name).val(),
        email: $(email).val(),
        phone: $(phone).val(),
        form: form,
        org_name: $("#org-name").val(),
        when: $("#when-worked").val(),
        review_text: $("#review-text").val(),
        photo: $('#file-preview').attr('src')
      }
    }else{
      data = { 
        name: $(name).val(),
        email: $(email).val(),
        phone: $(phone).val(),
        form: form
      }
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
    $(".popup").css("display", "none");
    if (form == "Новый отзыв") {
      $("#review-thanks").css("display", "block");
    }else{
      $("#thanks").css("display", "block");
    }
  }

  $("#submit_button_footer").on('click', function(){send_data('#name_footer', '#24534esfd', '#phone_footer', "Заявка - есть вопросы")});
  $("#submit_button1").on('click', function(){send_data('#name1', '#24534esfd', '#phone1', "Запрос стоимости")});
  $("#video-access-button").on('click', function(e){e.preventDefault(); send_data('#name_video', '#email_video', '#phone_video', "Запрос доступа к видеонаблюдению")});
  $("#special-offer-button").on('click', function(){send_data('#name-special-offer', '#3232423df', '#phone-special-offer', "Спецпредложение до 15 апреля")});
  $("#submit-button-call").on('click', function(){send_data('#name-call', '#3232423df', '#phone-call', "Заказ обратного звонка")});
  $("#button-review").on('click', function(){send_data('#name-review', '#3232423df', '#phone-review', "Новый отзыв")});
});