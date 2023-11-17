let gameseq = [];
let userSeq = [];
let HighScore = 0;
let CurrentS = 0;

let btns = ["yellow", "red", "purple", "green"];

let Started = false;
let level = 0;
let h2 = document.querySelector("h2");
let hS = document.querySelector(".hs");
let cS = document.querySelector(".cs");

document.addEventListener("keypress", () => {
  if (!Started) {
    Started = true;
    console.log("game started");
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  hS.innerText = `High Score: ${HighScore}`;
  cS.innerText = `Score: ${CurrentS}`;
  HighScore += 10;
  CurrentS += 10;
  h2.innerText = `Level ${level}`;

  //Random button

  let rand = Math.floor(Math.random() * 4);
  let randColor = btns[rand];
  let randbtn = document.querySelector(`.${randColor}`);
  gameseq.push(randColor);
  console.log(gameseq);
  btnFlash(randbtn);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function gameFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function btnPress() {
  if (Started) {
    let btn = this;
    gameFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
  }
}

let allbtn = document.querySelectorAll(".btn");
for (btn of allbtn) {
  btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
  //console.log("current level:", level);
  if (userSeq[idx] === gameseq[idx]) {
    if (userSeq.length == gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over!<b>Your Score : ${CurrentS}</b><br> Press any key to Start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function reset() {
  Started = false;
  gameseq = [];
  userSeq = [];
  level = 0;
  CurrentS = 0;
  HighScore -= 10;
}