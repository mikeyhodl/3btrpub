{
  var mtchs = 0;
  var hiScore = 0
  var secureScore = 0;
  var playerName = '';
  var hiScoreName = ''

  var checkName = '';
  function checkForOffensive() {
    if (playerName !== null && playerName !== '') {
      checkName = playerName.toLowerCase();
      if (checkName.includes('fuck') || checkName.includes('penis'/*ALPHagamedev - bruh boi*/) || checkName.includes('pussy') || checkName.includes('nigger') || checkName.includes('faggot') || checkName.includes('shit') || checkName.includes('bitch') || checkName.includes('cock') || checkName.includes('sex') || checkName.includes('dick')) {
        alert("choose another name and don't be offensive. ")
        playerName = window.prompt('Enter a nickname: hitting cancel will result as you showing up as anonymous')
        checkForOffensive();
      }
    }
  }


  var playingGame = false;
  function getHighScore() {
    getName();
    fetch('/getscore').then(function(response) {
      // Examine the text in the response
      response.json().then(function(data) {

        hiScore = data.res
        if (playingGame === false) {
          displayMainMenu();
        }
      })
    })
  }
  function getName() {
    fetch('/getName').then(function(response) {
      // Examine the text in the response
      response.json().then(function(data) {

        hiScoreName = data.res
        if (playingGame === false) {
          displayMainMenu();
        }
      })
    })
  }
  function updateName() {
    if (playerName == null || playerName === '') {
      fetch('/updateName?name="Anonymous"').then(function() { getName(); })
    }
    else {
      fetch('/updateName?name="' + playerName + '"').then(function() { getName(); })
    }
  }
  function setHighScore(score) {
    fetch('/updateScore?score=' + score).then(function(response) {for(index in gameWorld.scoreChangelog){
      if(gameWorld.scoreChangelog[index] === parseInt(response)){mtchs++;}
    }
    if(mtchs !== 1){
     alert('hacker!');
     score = 0;
     secureScore = 0;
     fetch('/revert'); 
    } 
    })
  }
  setInterval(getHighScore, 30000);

  getHighScore();
  getName();
  var canvas = document.getElementById("infRunnerCanvas");
  var ctx = canvas.getContext('2d');

  var jumpsRemaining = 2;
  var midairJumpLeft = true;
  var jumping = false;
  var postJump = false;
  var score = 0;
  var speed = 1;
  var floorWidth = 300;
  var music = new Audio('vgm.mp3');
  music.loop = true;
  function newfloor(x, y) {
    this.x = x;
    this.y = y;
    this.w = floorWidth;
    this.h = 1000;
  }
  var gameWorld = {
    platforms: [{ x: 0, y: 300, w: canvas.width, h: 1000 }],
    renderPlatforms: function() {
      ctx.fillStyle = 'goldenrod';
      ctx.fillRect(this.character.x, this.character.y, this.character.w, this.character.w);
      ctx.fillStyle = 'blue';
      for (var y = 0; y < this.platforms.length; y++) {
        this.platforms[y].x -= speed;
        ctx.fillRect(this.platforms[y].x, this.platforms[y].y, this.platforms[y].w, this.platforms[y].h)
        if (this.platforms[y].x + this.platforms[y].w < 0) {
          this.platforms.splice[y];
        }
      }
    },
    managePlatforms: function() {
      var x = this.platforms[this.platforms.length - 1].x + this.platforms[this.platforms.length - 1].w
      var y = this.platforms[this.platforms.length - 1].y + Math.floor(Math.random() * 150) - 75;
      while (y < 100 || y > canvas.height - 50 || y < this.platforms[this.platforms.length - 1].y && y + 30 > this.platforms[this.platforms.length - 1].y || y > this.platforms[this.platforms.length - 1].y && y - 30 < this.platforms[this.platforms.length - 1].y) {
        y = this.platforms[this.platforms.length - 1].y + Math.floor(Math.random() * 150) - 75;
      }
      if (x < canvas.width + 50) {
        var plat = new newfloor(x, y);
        this.platforms.push(plat)
      }
    },
    character: {
      x: 100,
      y: 270,
      w: 30
    },
    scoreChangeLog: [],
    managePlayer: function() {

      if (getDistanceToFloor() > 0) { if (jumping === false) { this.character.y += 1.5; } }
      if (getDistanceToFloor() < 1) {
        postJump = false;
        midairJumpLeft = true;
      }
      if (getDistanceToFloor() < -1
      ) {

        playingGame = false;
        music.currentTime = 0;
        music.pause();
        if (score > hiScore) {
          playerName = window.prompt('You got a high score! Enter a nickname to display, hitting cancel will result as you showing up as anonymous');
          checkForOffensive();
          setHighScore(score);
          getHighScore();
          updateName();

        }

        displayMainMenu();
      }

    },
    draw: function() {
this.scoreChangeLog.push(score);
      var remainder = score % 200;
      if (remainder == 0) {
        speed = speed + 0.05
      }
      var remainder = score % 500;
      if (remainder == 0) {
        floorWidth += 5;
      }
  
      score++;
      secureScore++;
      ctx.fillStyle = 'white'
      ctx.textAlign = 'start'
      ctx.fillText('Score: ' + score, 10, 30)
      ctx.fillStyle = 'black'
      if (playingGame === true) {
        ctx.fillRect(0, 0, 1000, 1000)
        ctx.fillStyle = 'white'
        ctx.textAlign = 'start'
        ctx.fillText('Score: ' + score + ', speed: ' + Math.round(speed), 10, 30)
        this.managePlatforms();
        this.renderPlatforms();
        this.managePlayer();
      }
    },
    cFSA: function(){
    for (index in this.scoreChangeLog){
      if(index > 1){
     if(this.scoreChangeLog[index] - 1 > this.scoreChangeLog[index - 1]) {
     alert('stop hacking');
     score = 0;
     secureScore = 0;
     fetch('/revert');
     }
    }}  
    }
  };
  function startGame() {
    floorWidth = 300;
    gameWorld.character.x = 100;
    music.loop = true;
    music.play();
    jumping = false;
    midairJumpLeft = true;
    postJump = false; gameWorld.character.y = 270;
    gameWorld.platforms = [{ x: 0, y: 300, w: canvas.width, h: 1000 }];
    score = 0;
    secureScore = 0;
    speed = 1;
    playingGame = true;
    jumping = false;
    midairJumpLeft = true;
    postJump = false;
    doDraw();
  }
  function doDraw() {
    if (playingGame === false) {
      return;
    }
    gameWorld.draw();
    setTimeout(doDraw, 2);
  }
  function jumpUp() {
    gameWorld.character.y -= 2;
    if (jumping === true) { setTimeout(jumpUp, 2) }
  }

  function displayMainMenu() {

    ctx.fillStyle = 'black'
    ctx.font = '35px Comic Sans Ms';
    ctx.textAlign = 'center'
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.fillStyle = 'red';
    ctx.fillText('3 button run!', 350, 200);
    ctx.font = '15px Comic Sans Ms';
    ctx.fillText("Don't run into a platform! arrow keys or WAD to move and jump. ", 350, 250)
    ctx.fillRect(275, 300, 150, 60)
    ctx.fillStyle = 'black';
    ctx.font = '25px Comic Sans Ms';
    ctx.fillText('PLAY', 350, 340);
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('Your score: ' + score, canvas.width / 2, 450)
    if (hiScore < 1) {
      ctx.fillText('High score loading...', canvas.width / 2, 400);
    }
    else {
      ctx.fillText('High score: ' + hiScore + ', by ' + hiScoreName, canvas.width / 2, 400);
    }
  }
  canvas.width = 700;
  canvas.height = 500;
  let mouse = {
    x: null,
    y: null,
  }
  displayMainMenu();
  function handleClicks() {

    if (playingGame === false && mouse.x > 275 && mouse.x < 425 && mouse.y > 300 && mouse.y < 360) {
      startGame();
    }
    else if (playingGame === true) {
      jump();
    }
  }
  function jump() {
    if (midairJumpLeft === true && postJump === true) {
      midairJumpLeft = false;
      jumping = true;
      jumpUp();
      setTimeout(function() { jumping = false }, 300)
    }
    else if (postJump === false) {

      jumping = true;
      postJump = true;
      jumpUp();
      setTimeout(function() { jumping = false }, 300)

    }
  }
  canvas.addEventListener('click', function(e) {
    mouse.x = e.x - canvas.getBoundingClientRect().x;
    mouse.y = e.y - canvas.getBoundingClientRect().y;
    handleClicks();
  })

  window.addEventListener('resize', function(e) {
    displayMainMenu();
  });
  window.addEventListener('keydown', function(e) {
    if (playingGame && e.code === 'KeyW' || playingGame && e.code === 'ArrowUp') {
      jump();
    }
  })

  window.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      if (playingGame === true && gameWorld.character.x > 0) {
        gameWorld.character.x -= 7;
      }
    }
  });
  window.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      if (playingGame === true && gameWorld.character.x + gameWorld.character.w < canvas.width) {
        gameWorld.character.x += 7;
      }
    }
  });
  function getDistanceToFloor() {
    for (index in gameWorld.platforms) {
      if (gameWorld.platforms[index].x < gameWorld.character.x + gameWorld.character.w && gameWorld.character.x < gameWorld.platforms[index].x + gameWorld.platforms[index].w) {
        // determine current platform
        return gameWorld.platforms[index].y - (gameWorld.character.y + 30);
        // then get distance to floor
      }
    }
  }

  function securityTick() {
    if (score < secureScore || secureScore < score) {
      alert('stop hacking.');
      score = 0;
      secureScore = 0;
      fetch("/revert");
    }
    setTimeout(securityTick, 1);
  }
  securityTick();

}