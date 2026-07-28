document.addEventListener('DOMContentLoaded', function () {
  var tracks = [
    {
      title: 'Smooth',
      artist: 'The Chainsmokers',
      uri: 'spotify:track:58QPfkhEGLkZeqXwZkcNv5',
      art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02c70da1e0d827ce2e26fbd563'
    },
    {
      title: 'Words',
      artist: 'Alesso & Zara Larsson',
      uri: 'spotify:track:1bgKMxPQU7JIZEhNsM1vFs',
      art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e028f9c368d8d0f5792ffc5d38e'
    },
    {
      title: 'Afterglow',
      artist: 'Taylor Swift',
      uri: 'spotify:track:1SymEzIT3H8UZfibCs3TYi',
      art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02e787cffec20aa2a396a61647'
    },
    {
      title: 'Center Point Road',
      artist: 'Thomas Rhett',
      uri: 'spotify:track:1ZBH3RN8bxxBJE9rFoZwDT',
      art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022957a42b4260a87f2734abbf'
    },
    {
      title: 'Blue',
      artist: 'Zach Bryan',
      uri: 'spotify:track:0FJqXBo7ZHrskhH4owaL9S',
      art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e025d2676e12a38ad50bc3ac85b'
    },
    {
      title: 'Tennessee Numbers',
      artist: 'Morgan Wallen',
      uri: 'spotify:track:4SHuhtbU7HPNC4rEBxqedt',
      art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c37a94d92b0a874ba2419ed7'
    },
    {
      title: 'Swag',
      artist: 'Justin Bieber & Cash Cobain',
      uri: 'spotify:track:0jdSaxZWbK1Uoxvr1A4lmx',
      art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02b2d278666b1150e827de324d'
    },
    {
      title: 'Spaces',
      artist: 'BUNT., The Chainsmokers & Izzy Bizu',
      uri: 'spotify:track:0T5kfKhXEN6EQlR6UKUkdx',
      art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0252830ff37aff9a3ffbb216d5'
    },
    {
      title: 'Everywhere, Everything',
      artist: 'Noah Kahan & Gracie Abrams',
      uri: 'spotify:track:4PRdeh2zIyM1pvY4x5luLe',
      art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e025d5f2c46eaebe1299a5645a6'
    },
    {
      title: 'The Love Club',
      artist: 'Lorde',
      uri: 'spotify:track:13oYERan8bugzhCazed1uA',
      art: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02244fb8bb9594476ab5cb39b9'
    },
    {
      title: 'Valerie',
      artist: 'Mark Ronson & Amy Winehouse',
      uri: 'spotify:track:27Cc4ANeVnrtvJ17SEamIJ',
      art: 'https://image-cdn-fa.spotifycdn.com/image/ab6742d3000052b72e19b72814c2988da531806a'
    },
    {
      title: 'Everybody Wants to Rule the World',
      artist: 'Tears For Fears',
      uri: 'spotify:track:3WzAUwTknLenOl3ak0ydlz',
      art: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e025e12c35cb4c848a927ef4b69'
    }
  ];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  var vinylRecord = document.getElementById('vinylRecord');
  var vinylLabel = document.getElementById('vinylLabel');
  var playerTrackLabel = document.getElementById('playerTrackLabel');
  var playBtn = document.getElementById('playBtn');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');

  var order = shuffle(tracks);
  var index = 0;
  var controller = null;

  function updateUI(track) {
    vinylLabel.style.backgroundImage = "url('" + track.art + "')";
    playerTrackLabel.textContent = track.title + ' — ' + track.artist;
  }

  function loadAndPlay(track) {
    updateUI(track);
    if (controller) {
      controller.loadUri(track.uri);
      controller.play();
    }
  }

  function goNext() {
    index++;
    if (index >= order.length) {
      order = shuffle(tracks);
      index = 0;
    }
    loadAndPlay(order[index]);
  }

  function goPrev() {
    index--;
    if (index < 0) index = order.length - 1;
    loadAndPlay(order[index]);
  }

  updateUI(order[index]);

  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    var element = document.getElementById('embed-iframe');
    var options = { uri: order[index].uri, width: '100%', height: '80' };
    IFrameAPI.createController(element, options, function (EmbedController) {
      controller = EmbedController;
      controller.addListener('playback_update', function (e) {
        playBtn.innerHTML = e.data.isPaused ? '&#9654;' : '&#10074;&#10074;';
      });
    });
  };

  vinylRecord.addEventListener('click', goNext);
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);
  playBtn.addEventListener('click', function () {
    if (controller) controller.togglePlay();
  });

  document.addEventListener('keydown', function (e) {
    if (e.code !== 'Space' && e.key !== ' ') return;
    var tag = document.activeElement && document.activeElement.tagName;
    if (/^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(tag)) return;
    e.preventDefault();
    goNext();
  });
});
