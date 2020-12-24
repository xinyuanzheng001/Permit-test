const btn = document.getElementById(15)

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


let select_1 = document.getElementById("select1");
select_1.addEventListener("click", runEvent);
let select_2 = document.getElementById("select2");
select_2.addEventListener("click", runEvent);
let select_3 = document.getElementById("select3");
select_3.addEventListener("click", runEvent);
let select_4 = document.getElementById("select4");
select_4.addEventListener("click", runEvent);
let count = 0;
let answer = "";
let c = "";
let correct_count = -1;
let r_set = new Set();
let totalTime = 1000 * 150;
let distance = 0;
let randonNumber = Math.ceil(Math.random() * 30);
document.querySelector("#start").addEventListener("click", first);

function first(e) {
    e.preventDefault();
    if(confirm("你有25分钟时间，确定开始吗？") == true) {
        totalTime = new Date().getTime() + totalTime;
        let x = setInterval(function() {
            let now = new Date().getTime();
            distance = totalTime - now;
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.querySelector("#time").innerHTML = `Time: ${minutes} : ${seconds}`;
            if (distance < 0){
                confirm("时间到");
                clearInterval(x);
                showResult(e);
            }
        })
        document.querySelector("#test").style.display = "";
        document.querySelector("#welcome").style.display = "none";
        next(e);
    }

}
function runEvent(e) {
    e.preventDefault();
    select_1.className = "";
    select_2.className = "";
    select_3.className = "";
    select_4.className = "";
    this.className = "selected";
    c = this.textContent;
}

let next_btn = document.querySelector(".next");
next_btn.addEventListener("click", next);
document.querySelector(".submit").addEventListener("click", next);
let t = true;
function next(e) {
    e.preventDefault();
    if (!document.querySelector(".selected") && count != 0) {
        t = confirm("确定要跳过吗？");
    } else {
        t = true;
    }
    if(c == answer) {
        correct_count++;
    }
    if (t) {
        count++;
        if(count == 25) {
            document.querySelector(".submit").style.display = "";
            document.querySelector(".next").style.display = "none";
        }
        if(count>25) {
            showResult(e);
        }
        document.querySelector("#test-question").innerHTML = "";
        randonNumber = Math.ceil(Math.random() * 30);
        while(r_set.has(randonNumber)) {
            randonNumber = Math.ceil(Math.random() * 30);
        }
        r_set.add(randonNumber);
        let new_question = document.getElementById(randonNumber);
        if (new_question.childElementCount == 3){
            let random_array = [3, 5];
            shuffleArray(random_array);
            let question = new_question.childNodes[1].textContent;
            answer = new_question.childNodes[3].textContent;
            let choice_1 = new_question.childNodes[random_array[0]].textContent;
            let choice_2 = new_question.childNodes[random_array[1]].textContent;
            document.querySelector("#test-question").innerHTML = count + " . " + question;
            select_1.innerHTML = choice_1;
            select_2.innerHTML = choice_2;
            select_3.style.display = "none";
            select_4.style.display = "none";
            // let c = document.querySelector(".selected").textContent;
            if (answer == c) {
                correct_count++;
            }
            select_1.className = "";
            select_2.className = "";
            select_3.className = "";
            select_4.className = "";
        } else {
            let random_array = [3, 5, 7, 9];
            shuffleArray(random_array);
            let question = new_question.childNodes[1].textContent;
            answer = new_question.childNodes[3].textContent;
            let choice_1 = new_question.childNodes[random_array[0]].textContent;
            let choice_2 = new_question.childNodes[random_array[1]].textContent;
            let choice_3 = new_question.childNodes[random_array[2]].textContent;
            let choice_4 = new_question.childNodes[random_array[3]].textContent;
            select_1.innerHTML = choice_1;
            select_2.innerHTML = choice_2;
            select_3.innerHTML = choice_3;
            select_4.innerHTML = choice_4;
            select_3.style.display = "";
            select_4.style.display = "";
            if(!question) {
                question = new_question.getElementsByTagName('img')[0].attributes[0].nodeValue;
                console.log(question);
                let new_tag = document.createElement("img");
                new_tag.setAttribute("src", question);
                new_tag.setAttribute("width", "120");
                new_tag.setAttribute("alt", "img");
                document.querySelector("#test-question").innerHTML = `${count}. 这个图标什么意思？<br>`;
                document.querySelector("#test-question").appendChild(new_tag);
            } else {
                document.querySelector("#test-question").innerHTML = count + " . " + question;
                // document.querySelector("#test-question").innerHTML = question;
            }
            // let c = document.querySelector(".selected").textContent;
            if(answer == c) {
                correct_count++;
            }
            select_1.className = "";
            select_2.className = "";
            select_3.className = "";
            select_4.className = "";
        }
    }
    console.log(`correct: ${correct_count}`);
}

function showResult(e) {
    e.preventDefault();
    document.querySelector("#result").style.display = "";
    document.querySelector("#test").style.display = "none";
    if(correct_count >= 18) {    
        document.querySelector(".result").innerHTML = `恭喜，你通过了测试，你总共答对了${correct_count}题!`;
    } else {
        document.querySelector(".result").innerHTML = `很遗憾，你没有通过测试, 你答对了${correct_count}题`;
    }
    
}