
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
// recognition.interimResults = true;
console.log(recognition);

recognition.lang = "ko-KR";
recognition.onresult = function(event) {
  var sentence = event.results[event.results.length-1][0].transcript.trim();
  var url = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/bf6165ab-4fb5-40b3-9248-e931a19720f3?subscription-key=f270af07554746759f8a664985c04a85&verbose=true&timezoneOffset=0&q=';
  $('.text').removeClass('fadeInUp');

  console.log(sentence);
  console.log(url+sentence);

  $.ajax({
    type: 'GET',
    url: url + encodeURIComponent(sentence),
    success: function(res) {
      console.log('succes');
      console.log(res);

      console.log(res.entities);
      console.log(res.query);


      switch (res.topScoringIntent.intent) {
        case "Special Location":
          $('.intent').text("한양대학교에 대한 문장입니다.");
          break;
        case "Subway Station":
          $('.intent').text("지하철역 검색에 대한 문장입니다.");
          break;
        case "About Prof":
          $('.intent').text("교수님 검색에 대한 문장입니다.");
          break;
        case "Location":
          $('.intent').text("장소 검색에 대한 문장입니다.");
          break;
        case "Search":
          $('.intent').text("일반 검색에 대한 문장입니다.");
          break;
      }
      $('.intent').append("<br/>"+"("+(res.topScoringIntent.score*100).toFixed(2)+"%)")
      if (res.entities.length === 0) {
        $('.text').addClass('fadeInUp');
        $('.text').text(sentence);
      }
      res.entities.forEach(function(item) {
        console.log(item);
        var txt = sentence;
        var highlight = $('<b/>').text(txt.slice(item.startIndex, item.endIndex+1));
        highlight.addClass('highlight');
        $('.text').addClass('fadeInUp');
        $('.text').html(highlight);
        $('.text').append(sentence.slice(item.endIndex+1));
      })
    }
  });
}
recognition.start();
