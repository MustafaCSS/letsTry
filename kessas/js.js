
const questions = [
    {
        question: "١- ازاي كان ترتيب الغرف اللي كانت بتجسّد شخصيات القصة؟",
        answers: ["خله ، هارون ، الدكتور ، هبة", "هارون ، الدكتور ، خله ، هبة", "خله ، الدكتور ، هبة ، هارون"],
        correctAnswer: 0,
        doorImage: "photo_1_2025-03-20_01-04-46.jpg"
    },
    {
        question: "٢- ايه كان اسم مرات الدكتور؟",
        answers: ["نسرين", "مها", "علياء"],
        correctAnswer: 1,
        doorImage: "photo_2_2025-03-20_01-04-46.jpg"
    },
    {
        question: "٣- ايه كانت مكونات الغرفة اللي حوايطها صفراء؟",
        answers: ["لوحة غريبة ، طفل ، تلفزيون متكسر", "تلفزيون قديم ، كرسي جلد ، طفل", "راديو ، كرسي ، طفل"],
        correctAnswer: 1,
        doorImage: "photo_3_2025-03-20_01-04-46.jpg"
    },
    {
        question: "٤- ايه كانت مكونات غرفة خله؟",
        answers: ["جهاز اركيد ، فديو جيمز ، كمبيوتر", "كيس ملاكمة ، جهاز اركيد ، بلياردو", "بلياردو ، جهاز محمول ، ثلاجة"],
        correctAnswer: 1,
        doorImage: "photo_4_2025-03-20_01-04-46.jpg"
    },
    {
        question: "٥- لما شافوا التلفزيون القديم بيعرض صورهم، إزاي كان شكل الشاشة والمحتوى اللي عليها؟",
        answers: ["أ) معتمة ومخيفة", "ج) ملونة ومبهجة", "ب) مشوشة ومظلمة"],
        correctAnswer: 2,
        doorImage: "photo_5_2025-03-20_01-04-46.jpg"
    },
    {
        question: "٦- لما دخلوا الحمام، إيه كان شكل شجر الصبار الموجود هناك؟",
        answers: ["د) متساقطة الأوراق.", "أ) صحي ونضر", "ب) مريض ومتعب"],
        correctAnswer: 2,
        doorImage: "photo_6_2025-03-20_01-04-46.jpg"
    },
    {
        question: "٧- كيف كان شكل الجدارية في الغرفة الكبيرة؟",
        answers: ["ج) تعكس لحظات سعيدة", "ب) مظلمة ومرعبة", "د) معبرة عن الألم والمعاناة"],
        correctAnswer: 2,
        doorImage: "photo_7_2025-03-20_01-04-46.jpg"
    },
    {
        question: "٨- كيف كان شكل الغابة اللي دخلوا فيها بعد فتح الباب؟",
        answers: ["أ) غابة مظلمة وموحشة", "د) غابة متشابكة وكثيفة بالخيوط", "ج) غابة مليئة بالشجيرات"],
        correctAnswer: 1,
        doorImage: "photo_8_2025-03-20_01-04-46.jpg"
    },
    {
        question: "٩- لما كانوا بيمروا بين الأشجار، إيه الأصوات اللي سمعوها؟",
        answers: ["د) ضحكات مرعبة", "أ) همسات خفيفة", "ب) صرخات عالية"],
        correctAnswer: 0,
        doorImage: "photo_9_2025-03-20_01-04-46.jpg"
    },
    {
        question: "١٠- في النهاية، إيه كان شكل الشاشة العملاقة اللي ظهرت في الأرض الفاضية؟",
        answers: ["ج) شاشة مضيئة بألوان زاهية", "ب) شاشة قديمة ومتهالكة", "د) شاشة مظلمة بدون أي تفاصيل"],
        correctAnswer: 2,
        doorImage: "photo_10_2025-03-20_01-04-46.jpg"
    }
];

let currentDoorIndex = 0;
let attempts = 3;
let timer;
let timeLeft = 180;

function startGame() {
    document.getElementById("start-page").style.display = "none";
    document.getElementById("room-container").style.display = "block";
    updateAttemptsCounter();
    currentDoorIndex = 0;
    attempts = 3;
    timeLeft = 180;
    document.getElementById("timer").innerText = "الوقت: " + timeLeft;
    startTimer();
    updateDoorImage();
}

function updateDoorImage() {
    const door = document.getElementById("door");
    door.src = questions[currentDoorIndex].doorImage || "photo_1_2025-03-20_01-04-46.jpg";
}

function showQuestion() {
    const doorSound = document.getElementById("door-sound");
    doorSound.play();
    setTimeout(() => {
        const questionBox = document.getElementById("question-box");
        questionBox.innerHTML = "";
        const questionText = document.createElement("h2");
        questionText.innerText = questions[currentDoorIndex].question;
        questionBox.appendChild(questionText);
        const answersList = document.createElement("ul");
        answersList.className = "answers";
        questions[currentDoorIndex].answers.forEach((answer, i) => {
            const li = document.createElement("li");
            li.innerText = answer;
            li.onclick = () => checkAnswer(i);
            answersList.appendChild(li);
        });
        questionBox.appendChild(answersList);
        questionBox.style.display = "block";
        document.getElementById("door").style.display = "none";
    }, 1000);
}

function checkAnswer(selectedIndex) {
    const correctAnswerIndex = questions[currentDoorIndex].correctAnswer;
    if (selectedIndex === correctAnswerIndex) {
        document.getElementById("correct-sound").play();
        showMessage("إجابة صح.. ادخل الباب إلل بعده.", "success");
        setTimeout(() => {
            document.getElementById("question-box").style.display = "none";
            currentDoorIndex++;
            if (currentDoorIndex >= questions.length) {
                showMessage("عاش يا صديقي! انت فزت !", "success");
                setTimeout(() => {
                    restartGame();
                }, 3000);
            } else {
                document.getElementById("door").style.display = "block";
                updateDoorImage();
            }
        }, 2000);
    } else {
        document.getElementById("wrong-sound").play();
        showErrorEffect();
        attempts--;
        updateAttemptsCounter();
        showMessage("إجابة غلط! فاضلك " + attempts + " محاولة تانية.", "fail");
        if (attempts <= 0) {
            endGame();
        }
    }
}

function updateAttemptsCounter() {
    document.getElementById("attempts-counter").innerText = "المحاولات المتبقية: " + attempts;
}

function showErrorEffect() {
    const errorEffect = document.getElementById("error-effect");
    errorEffect.style.display = "block";
    setTimeout(() => {
        errorEffect.style.display = "none";
    }, 1000);
}

function showMessage(message, type) {
    const messageBox = document.getElementById("message-box");
    messageBox.innerHTML = `<p>${message}</p>`;
    messageBox.className = `message-box ${type}`;
    messageBox.style.display = "block";
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 2000);
}

function endGame() {
    clearInterval(timer);
    showMessage("انت اتهزمت عدد المحاولات المتبقية: " + attempts, "fail");
    setTimeout(() => {
        restartGame();
    }, 3000);
}

function restartGame() {
    currentDoorIndex = 0;
    attempts = 3;
    updateAttemptsCounter();
    document.getElementById("start-page").style.display = "block";
    document.getElementById("room-container").style.display = "none";
    document.getElementById("question-box").style.display = "none";
    document.getElementById("message-box").style.display = "none";
    document.getElementById("error-effect").style.display = "none";
    timeLeft = 180;
    document.getElementById("timer").innerText = "الوقت: " + timeLeft;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "الوقت: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}
