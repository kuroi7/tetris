
var array = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// var move = l_shape;
var move = rod_shape;

function draw() {
  $('#game').find('tr').each(function(i, elemTr) { // trタグそれぞれに対する処理
      $(elemTr).children().each(function(j, elemTd) { // tdタグそれぞれに対する処理
          $(elemTd).removeClass(); // まずはクラスをすべてなしにする
          var blocknum = $('input').attr('id');

          // ↓↓ブロックナンバーを指定する
          switch (Number(blocknum)) {
            case 1:
              switch (array[i][j]) {
                case 1:
                  $(elemTd).addClass("rod"); // 1の時にはrodクラスを割り振る
                  console.log('rod');
                  break;
              }
              break;
            case 2:
              switch (array[i][j]) {
                case 1:
                  $(elemTd).addClass("square"); // 1の時にはrodクラスを割り振る
                  console.log("square");
                  break;
              }
              break;
            case 3:
              switch (array[i][j]) {
                case 1:
                  $(elemTd).addClass("convex"); // 1の時にはrodクラスを割り振る
                  console.log("convex");
                  break;
              }
              break;
            case 4:
              switch (array[i][j]) {
                case 1:
                  $(elemTd).addClass("l_shape"); // 1の時にはrodクラスを割り振る
                  console.log("l_shape");
                  break;
              }
              break;
            case 5:
              switch (array[i][j]) {
                case 1:
                  $(elemTd).addClass("inverted_l"); // 1の時にはrodクラスを割り振る
                  console.log("inverted_l");
                  break;
              }
              break;
            case 6:
              switch (array[i][j]) {
                case 1:
                  $(elemTd).addClass("z_shape"); // 1の時にはrodクラスを割り振る
                  console.log("z_shape");
                  break;
              }
              break;
            case 7:
              switch (array[i][j]) {
                case 1:
                  $(elemTd).addClass("inverted_z"); // 1の時にはrodクラスを割り振る
                  console.log("inverted_z");
                  break;
              }
              break;
            default:
              $(elemTd).addClass("default"); // それ以外の時にはdefaultクラスを割り振る
              break;
          }
      })
  });
}

function fall() {
  var under = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  for (var i = 19; i >= 0; i--) {
      for (var j = 0; j < 10; j++) {
          if (under[j] == 0) {
              if (array[i][j] == 0) {
                  // 下に何もなくブロックでもない
                  under[j] = 0;
              } else {
                  // 下に何もなくブロックであるとき
                  array[i + 1][j] = array[i][j];
                  array[i][j] = 0;
                  // moveも一緒に動かす
                  if (move[i][j] == 1) {
                      move[i][j] = 0;
                      move[i + 1][j] = 1;
                  }
                  under[j] = 0;
              }
          } else {
              if (array[i][j] == 0) {
                  // 下がブロックでブロックでないとき
                  under[j] = 0;
              } else {
                  // 下がブロックでブロックのとき
                  if (move[i][j] == 1) {
                    resetMove();
                  }
                  under[j] = 1;
                  // break; ←ブロックが下に着いた時点で止めたいけど違うみたい..
              }
          }
      }
  }
}

function checkDelete() {
  for (var i = 19; i >= 0; i--) {
      if (!array[i].includes(0)) {
          for (var j = 0; j < 10; j++) {
              array[i][j] = 0;
          }
      }
  }
}

draw(); // 読込が完了したらまず表示
setInterval(function() {
  checkDelete();
  fall();
  draw();
}, 500); // 0.5秒ごとに表示を更新していきます

var moveFlag = 0; // 動かす対象があるかどうか(0はない、1はあることを示す)


function genBlock(blockNum) {
  if (moveFlag == 0) {
    switch (blockNum) {
          case 1:
            // 棒
            array[0][5] = 1;
            array[1][5] = 1;
            array[2][5] = 1;
            array[3][5] = 1;
            move[0][5] = 1;
            move[1][5] = 1;
            move[2][5] = 1;
            move[3][5] = 1;

            console.log('blockNumが1');
            break;
          case 2:
            // 凸
            array[0][4] = 1;
            array[1][3] = 1;
            array[1][4] = 1;
            array[1][5] = 1;
            move[0][4] = 1;
            move[1][3] = 1;
            move[1][4] = 1;
            move[1][5] = 1;

            console.log('blockNumが2');
            break;  
          case 3:
            // 四角
            array[0][5] = 1;
            array[0][4] = 1;
            array[1][5] = 1;
            array[1][4] = 1;
            move[0][5] = 1;
            move[0][4] = 1;
            move[1][5] = 1;
            move[1][4] = 1;

            console.log('blockNumが3');
            break;
          case 4:
            // L
            array[0][5] = 1;
            array[1][5] = 1;
            array[2][5] = 1;
            array[2][6] = 1;
            move[0][5] = 1;
            move[1][5] = 1;
            move[2][5] = 1;
            move[2][6] = 1;

            console.log('blockNumが4');
            break;
          case 5:
            // 逆L
            array[0][5] = 1;
            array[1][5] = 1;
            array[2][5] = 1;
            array[2][4] = 1;
            move[0][5] = 1;
            move[1][5] = 1;
            move[2][5] = 1;
            move[2][4] = 1;

            break;
          case 6:
            // Z
            array[0][3] = 1;
            array[0][4] = 1;
            array[1][4] = 1;
            array[1][5] = 1;
            move[0][3] = 1;
            move[0][4] = 1;
            move[1][4] = 1;
            move[1][5] = 1;

            break;
          case 7:
            // 逆Z
            array[0][5] = 1;
            array[0][4] = 1;
            array[1][4] = 1;
            array[1][3] = 1;
            move[0][5] = 1;
            move[0][4] = 1;
            move[1][4] = 1;
            move[1][3] = 1;

            break;
      }
      moveFlag = 1;
  }
}

document.onkeydown = function(e) { // キーボードの処理はこのように書きます
  // ブロック数（1〜7）の中で乱数を生成
  var min = 1 ;
  var max = 7 ;
  var random = Math.floor( Math.random() * (max + 1 - min) ) + min ;

  switch (e.code) {
    case "Space":
        genBlock(random);
        // うまくいかない、、やりたいことは、classnameから要素？を取得して、取得した要素にidを付与したい
        // var element = document.getElementsByClassName('blocknum');
        // console.log(element);    
        // element.setAttribute('id', 1);
        break;
    // ここから下を追加する
    case "ArrowRight":
        moveBlockRight();
        break;
    case "ArrowLeft":
        moveBlockLeft();
        break;
    case "ArrowDown":
        moveBlockDown();
        // genBlock(random);
        break;
    }
draw();
}

function moveBlockRight() {
  for (var i = 19; i >= 0; i--) {
      var newMove = move[i].concat();
      for (var j = 8; j >= 0; j--) {
          if (move[i][j] == 1) {
              array[i][j + 1] = array[i][j];
              array[i][j] = 0;
              newMove[j + 1] = 1;
              newMove[j] = 0;
          }
      }
      move[i] = newMove;
  }
}

function moveBlockLeft() {
  for (var i = 19; i >= 0; i--) {
      var newMove = move[i].concat();
      for (var j = 1; j < 10; j++) {
          if (move[i][j] == 1) {
              array[i][j - 1] = array[i][j];
              array[i][j] = 0;
              newMove[j - 1] = 1;
              newMove[j] = 0;
          }
      }
      move[i] = newMove;
  }
}

function moveBlockDown() {
  for (var i = 19; i >= 0; i--) {
    var newMove = move[i].concat();
    for (var j = 1; j < 10; j++) {
        if (move[i][j] == 1) {
          // 今いる位置からの残りの高さの値を出して今いる位置に足す → 一番下に移動する
            array[i + (19 - i)][j] = array[i][j];
            array[i][j] = 0;
            newMove[i + (19 - i)] = 1;
            newMove[i] = 1;
        }
    }
    move[i] = newMove;

    // 動かす対象がないようにする
    moveFlag = 0;
  }
}

function resetMove() {
  moveFlag = 0;
  for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 10; j++) {
          move[i][j] = 0;
      }
  }
}
