var array = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
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

var move = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
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

function draw() {
  $('#game').find('tr').each(function(i, elemTr) { // trタグそれぞれに対する処理
      $(elemTr).children().each(function(j, elemTd) { // tdタグそれぞれに対する処理
          $(elemTd).removeClass(); // まずはクラスをすべてなしにする
          switch (array[i][j]) {
              case 1:
                  $(elemTd).addClass("stick"); // 1の時にはstickクラスを割り振る
                  break;
              default:
                  $(elemTd).addClass("default"); // それ以外の時にはdefaultクラスを割り振る
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
                  under[j] = 1;
              }
          }
      }
  }
}

draw(); // 読込が完了したらまず表示
setInterval(function() {
  fall();
  draw();
}, 500); // 0.5秒ごとに表示を更新していきます

function genBlock(blockNum) {
  switch (blockNum) {
      case 1:
          array[0][5] = blockNum;
          array[1][5] = blockNum;
          array[2][5] = blockNum;
          array[3][5] = blockNum;
          break;
  }
}

document.onkeydown = function(e) { // キーボードの処理はこのように書きます
  switch (e.code) {
      case "Space":
          genBlock(1);
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

function genBlock(blockNum) {
  switch (blockNum) {
      case 1:
          array[0][5] = blockNum;
          array[1][5] = blockNum;
          array[2][5] = blockNum;
          array[3][5] = blockNum;
          // moveも一緒に変更する
          move[0][5] = 1;
          move[1][5] = 1;
          move[2][5] = 1;
          move[3][5] = 1;
          break;
  }
}

document.onkeydown = function(e) {
  switch (e.code) {
      case "Space":
          genBlock(1);
          break;
      // ここから下を追加する
      case "ArrowRight":
          moveBlockRight();
          break;
      case "ArrowLeft":
          moveBlockLeft();
          break;
  }
  draw();
}
