const questions = [
    {
        question: "Where did we first meet?",
        options: ["School", "College", "Online", "Party"],
        answer: 0
    },
    {
        question: "When did I find out you liked me?",
        options: ["14th Feb", "10th Feb", "11th Feb", "12th Feb"],
        answer: 2
    },
    {
        question: "When was our first kiss?",
        options: ["10th March", "23rd Feb", "6th March", "26th Feb"],
        answer: 1
    },
    {
        question: `When did we go to evening market for the first time as "friends"?`,
        options: ["23rd Jan", "25th Jan", "27th Jan", "30th Jan"],
        answer: 0
    },
    {
        question: "What did i bring for you on our first monthsary?",
        options: ["Noodles", "Wanton Soup", "Soup", "Nothing"],
        answer: 1
    },
    {
        question: "What is our song?",
        options: ["Tenerife Sea", "I won't give up", "Perfect", "Love on the weekend"],
        answer: 0
    },
    {
        question: "What was the name of the playlist you made for me?",
        options: ["Us", "Reminds me of you", "For Emsame", "For my John Mayer"],
        answer: 3
    },
    {
        question: "When did I give you Gerberas?",
        options: ["On our second monthsary", "The day I asked you to be my Girlfriend", "Evening Market", "When we confessed"],
        answer: 2
    },
    {
        question: "Where do I keep the letter you gave me for our second Monthsary?",
        options: ["In a collection of the stuff you have given me", "At home", "The box that you gave me", "My wallet"],
        answer: 3
    },
    {
        question: "Choose the odd one out",
        options: ["Human Punching bag", "Delulu", "Favourite Betrayer", "My love❤️"],
        answer: 3
    }
];

let currentQ = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion(){
    const q = questions[currentQ];
    answered = false;

    questionEl.innerText = q.question;

    optionBtns.forEach((btn, index)=>{
        btn.innerText = q.options[index];
        btn.classList.remove("correct", "wrong");

        btn.onclick = () => checkAnswer(index);
    });
}

function checkAnswer(selected){
    if(answered) return;   // prevent multiple clicks

    answered = true;

    const correct = questions[currentQ].answer;

    optionBtns.forEach((btn, index)=>{
        if(index === correct){
            btn.classList.add("correct");
        } 
        if(index === selected && selected !== correct){
            btn.classList.add("wrong");
        }
    });

    if(selected === correct){
        score++;   // ✅ increase score
    }
}

nextBtn.onclick = () => {
    currentQ++;

    if(currentQ < questions.length){
        loadQuestion();
    } else {
        showScore();
    }
};

function showScore(){
    questionEl.innerHTML = `🎉 You scored ${score} / ${questions.length}`;

    document.querySelector(".options").style.display = "none";
    nextBtn.style.display = "none";
}

loadQuestion();