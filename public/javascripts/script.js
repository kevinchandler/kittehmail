   
  function subscribe() {
    var emailRe = /^([a-z][a-z0-9\*\-\.]*):\/\/(?:(?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\-\.]|%[0-9a-f]{2})+|(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\]))(?::[0-9]+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@!$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/
    
    var webhookUrl = emailRe.exec($('#webhookUrl').val());
    
    if (webhookUrl) {
      webhookUrl = webhookUrl[0].toLowerCase()

        $.ajax({
          url: '/api/subscribe',
          method: 'POST',
          data: {
            webhookUrl: webhookUrl
          }
        })
        .done(function( data ) {
          $('section#subscribe').hide();
          $('section#success').show();
      });
    }
    else {
      alert('invalid webhook url')
    }
  }

  $(document).ready(function() {
    var subscribeBtn = document.getElementById('subscribeBtn');
    subscribeBtn.addEventListener('click', function() {
      subscribe();
    })
  })

