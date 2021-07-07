let tbody = document.getElementById("tbody");
let time = document.getElementById("time");
let array = [];
let tableImages = [];
let images = [];
let memory = [0, 0, 0];
let max_time;
let set;

Start();

function Start() {
    max_time = 30;
    time.innerHTML =  `The game ends after ${max_time} seconds`;
    Arr();
    tableCreate();
    setTimeout(Logo, 2000);
    set = setInterval(Time, 1000);
}

function Arr() {
    for (let i = 1; i < 9; i++) {
        array.push(i, i);
    }

    for (let i = 0; i < 4; i++) {
        tableImages[i] = [];
        images[i] = [];
        for (let j = 0; j < 4; j++) {
            let rand = Math.floor(Math.random() * array.length);
            tableImages[i][j] = array[rand];
            images[i][j] = array[rand];
            array.splice(rand, 1);
        }
    }
}

function tableCreate() {
    let tbl = ``;
    for (let i = 0; i < 4; i++) {
        tbl += `<tr>`;
        for (let j = 0; j < 4; j++) {
            tbl += `<td class="text-center align-middle" onclick="Click(${i},${j});">
            <img src="img/${tableImages[i][j]}.png" alt="Penalti.az" />
          </td>`;
        }
        tbl += `</tr>`;
    }
    tbody.innerHTML = tbl;
}

function Logo() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            tableImages[i][j] = "logo";
        }
    }
    tableCreate();
}

function Time() {
    max_time--;
    time.innerHTML =  `The game ends after ${max_time} seconds`;
    if (max_time == 0) {
        Finish("Time is over. You lost the game");
    }
}

function Click(i, j) {
    tableImages[i][j] = images[i][j];
    tableCreate();
    if (memory[2] == 0) {
        memory[0] = i;
        memory[1] = j;
        memory[2] = images[i][j];
    } else {
        if (memory[2] != images[i][j] || (memory[0] == i && memory[1] == j)) {
            tableImages[i][j] = "logo";
            tableImages[memory[0]][memory[1]] = "logo";
            setTimeout(tableCreate, 250);
        }
        memory[2] = 0;
    }
    Check();
}

function Check() {
    let count = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (tableImages[i][j] == images[i][j]) {
                count++;
            }
        }
    }
    if (count == 16) {
        Finish("Congratulations. You win");
    }

}

function Finish(par){
    setTimeout(() => {
        clearInterval(set);
        alert(par);
        Start();
    }, 500);
}

