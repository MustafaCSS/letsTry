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
let score = 0;
let fastestAnswerTime = 0;
let totalTimeTaken = 0;

function hasPlayedBefore() {
    return localStorage.getItem("hasPlayedGame") === "true";
}

function markGameAsPlayed() {
    localStorage.setItem("hasPlayedGame", "true");
}

function startGame() {
    if (hasPlayedBefore()) {
        showMessage("أنت لعب قبل كده مينفعش تلعب تاني☹", "fail");
        return;
    }

    markGameAsPlayed();

    document.getElementById("background-sound").play();
    document.getElementById("start-page").style.display = "none";
    document.getElementById("room-container").style.display = "block";
    updateAttemptsCounter();
    currentDoorIndex = 0;
    attempts = 3;
    score = 0;
    timeLeft = 180;
    document.getElementById("timer").innerText = "الوقت: " + timeLeft;

    if (!document.getElementById("progress-bar")) {
        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progressBar.id = "progress-bar";
        const progress = document.createElement("div");
        progress.className = "progress";
        progress.id = "progress";
        progressBar.appendChild(progress);
        document.body.appendChild(progressBar);
    }
    updateProgress();

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
    
    const loading = document.createElement("div");
    loading.className = "loading";
    loading.innerText = "جاري التحميل...";
    document.body.appendChild(loading);
    
    setTimeout(() => {
        document.body.removeChild(loading);
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
    const questionStartTime = new Date().getTime();
    const correctAnswerIndex = questions[currentDoorIndex].correctAnswer;
    
    if (selectedIndex === correctAnswerIndex) {
        const answerTime = (new Date().getTime() - questionStartTime) / 1000;
        totalTimeTaken += answerTime;
        if (fastestAnswerTime === 0 || answerTime < fastestAnswerTime) {
            fastestAnswerTime = answerTime;
        }
        score += (10 - Math.min(9, Math.floor(answerTime))) * 10;
        
        document.getElementById("correct-sound").play();
        showMessage(`إجابة صح.. ادخل الباب إلل بعده. (+${Math.floor((10 - Math.min(9, Math.floor(answerTime))) * 10)} نقطة)`, "success");
        setTimeout(() => {
            document.getElementById("question-box").style.display = "none";
            currentDoorIndex++;
            updateProgress();
            if (currentDoorIndex >= questions.length) {
                const finalScore = score + Math.floor((180 - totalTimeTaken) * 0.5);
                showMessage(`عاش يا صديقي! انت فزت!<br>نتيجتك النهائية: ${finalScore} نقطة<br>أسرع إجابة: ${fastestAnswerTime.toFixed(1)} ثانية`, "success");
                setTimeout(() => {
                    restartGame();
                }, 6000);
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

function updateProgress() {
    const progress = document.getElementById("progress");
    if (progress) {
        progress.style.width = `${(currentDoorIndex / questions.length) * 100}%`;
    }
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
    // if (hasPlayedBefore()) {
    //     showMessage("أنت لعب قبل كده مينفعش تلعب تاني☹", "fail");
    //     return;
    // }

    currentDoorIndex = 0;
    attempts = 3;
    score = 0;
    fastestAnswerTime = 0;
    totalTimeTaken = 0;
    updateAttemptsCounter();
    document.getElementById("start-page").style.display = "block";
    document.getElementById("room-container").style.display = "none";
    document.getElementById("question-box").style.display = "none";
    document.getElementById("message-box").style.display = "none";
    document.getElementById("error-effect").style.display = "none";
    timeLeft = 180;
    document.getElementById("timer").innerText = "الوقت: " + timeLeft;

    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        document.body.removeChild(progressBar);
    }
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