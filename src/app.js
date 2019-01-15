let data = {};

let onImgClick = (event) => {
    // console.log(event);

    let target = event.target;

    let title = target.title;

    let i = parseInt(title);

    i -= 1;

    if (i < 0) {
        i = 12;
    }

    target.title = i;
    target.src = "img/" + i + ".png";

    updateData();

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
            i.width = 35;
            i.height = 35;
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


    funDownload(JSON.stringify(data), "data.json");


};


let updateData = () => {
    let levelData = [];

    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            let num = col * 10 + row;
            let i = document.getElementById(num);
            let title = i.title;

            levelData[col * 10 + row] = title;
        }
    }

    let level = getLevel();
    data[level] = levelData;

};


let initBlocks = () => {

    let blocks = document.getElementById("blocks");
    let blocksStr = "";
    for (let i = 0; i < 13; i++) {
        blocksStr += "<img src='img/" + i + ".png' title='" + i + "' id='block-" + i + "' />";

    }

    blocks.innerHTML = blocksStr;


    for (let i = 0; i < 13; i++) {
        let img = document.getElementById("block-" + i);
        img.width = 20;
        img.height = 20;
    }
};


let showLevel = (level) => {
    let levelData = data[level];
    if (!levelData) {
        levelData = [];

        for (let col = 0; col < 10; col++) {
            for (let row = 0; row < 10; row++) {
                let num = col * 10 + row;
                levelData[num] = 0;
            }
        }

        data[level] = levelData;
    }

    console.log(levelData);

    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 10; row++) {
            let num = col * 10 + row;
            let d = levelData[num];
            let target = document.getElementById(num);

            target.title = d;
            target.src = "img/" + d + ".png";
        }
    }


};


let onShowClick = () => {
    let level = getLevel();
    showLevel(level);
};


let getLevel = () => {
    return document.getElementById('level').value;
};

let setLevel = (level) => {
    document.getElementById('level').value = level;
};


// let onLoadFileClick = ()=>{
//
// };


let onFileChange = () => {

    let selectFiles = document.getElementById("selectFiles").files;

    let selectFile = selectFiles[0];

    let reader = new FileReader();

    reader.onloadend = function () {
        console.log(this.result);
        data = JSON.parse(this.result);
        showLevel(getLevel());
    };


    reader.readAsText(selectFile);


};

window.onload = () => {
    setLevel(0);

    initBoard();
    showLevel(1);

    initBlocks();

    document.getElementById('saveFile').onclick = saveFile;
    document.getElementById('show').onclick = onShowClick;

    // document.getElementById('loadFile').onclick = onLoadFileClick;

    document.getElementById('selectFiles').onchange = onFileChange;


};