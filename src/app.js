let onImgClick = (event) => {
    console.log(event);

    let target = event.target;

    let title = target.title;

    let i = parseInt(title);

    i -= 1;

    if (i < 0) {
        i = 12;
    }

    target.title = i;
    target.src = "img/" + i + ".png";


};


let initBoard = () => {
    let board = document.getElementById("board");

    let boardStr = "";
    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            let num = col * 10 + row;
            boardStr += "<img src='img/0.png' title='0' id='" + num + "' />";
        }
        boardStr += "<br/>";
    }


    board.innerHTML = boardStr;


    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            let num = col * 10 + row;
            let i = document.getElementById(num);
            i.onclick = onImgClick;
        }
    }


};

let funDownload = (content, filename) => {
    // 创建隐藏的可下载链接
    let eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    let blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
};


let saveFile = () => {

    let data = [];

    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            let num = col * 10 + row;
            let i = document.getElementById(num);
            let title = i.title;

            data[col * 10 + row] = title;
        }
    }


    funDownload('[' + data + ']', "data.json");


};


window.onload = () => {


    initBoard();


    document.getElementById('saveFile').onclick = saveFile;


};