const questions = [
    {
      "type": "boolean",
      "difficulty": "easy",
      "category": "Entertainment: Board Games",
      "question": "Snakes and Ladders was originally created in India?",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Entertainment: Video Games",
      "question": "In &quot;Overwatch&quot;, what is the name of Mercy&#039;s &quot;ultimate ability&quot;?",
      "correct_answer": "Valkyrie",
      "incorrect_answers": [
        "Earthshatter",
        "Rocket Barrage",
        "Molten Core"
      ]
    },
    {
      "type": "boolean",
      "difficulty": "medium",
      "category": "Geography",
      "question": "Is Tartu the capital of Estonia?",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    },
    {
      "type": "boolean",
      "difficulty": "medium",
      "category": "Geography",
      "question": "Norway has a larger land area than Sweden.",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Books",
      "question": "What is the name of the protagonist of J.D. Salinger&#039;s novel Catcher in the Rye?",
      "correct_answer": "Holden Caulfield",
      "incorrect_answers": [
        "Fletcher Christian",
        "Jay Gatsby",
        "Randall Flagg"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Entertainment: Video Games",
      "question": "What is the name of the creature that the main character befriends in &quot;The Last Guardian&quot;?",
      "correct_answer": "Trico",
      "incorrect_answers": [
        "Nico",
        "Wolf",
        "Andazi"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Geography",
      "question": "What is the capital city of New Zealand?",
      "correct_answer": "Wellington",
      "incorrect_answers": [
        "Auckland",
        "Christchurch",
        "Melbourne"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Video Games",
      "question": "In Divinity: Original Sin II, what is the name of the skeletal origin character?",
      "correct_answer": "Fane",
      "incorrect_answers": [
        "Lohse",
        "The Red Prince",
        "There are no skeletal origin characters"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Entertainment: Music",
      "question": "Which album by American rapper Kanye West contained songs such as &quot;Love Lockdown&quot;, &quot;Paranoid&quot; and &quot;Heartless&quot;?",
      "correct_answer": "808s &amp; Heartbreak",
      "incorrect_answers": [
        "Late Registration",
        "The Life of Pablo",
        "Graduation"
      ]
    },
    {
      "type": "multiple",
      "difficulty": "medium",
      "category": "Animals",
      "question": "What is the scientific name for the &quot;Polar Bear&quot;?",
      "correct_answer": "Ursus Maritimus",
      "incorrect_answers": [
        "Polar Bear",
        "Ursus Spelaeus",
        "Ursus Arctos"
      ]
    }
  ]

//Main Function for the Quiz
async function displayQuestions() {
    //Sets constants for what we will use
    const main_form = document.querySelector("form.questions-form");


    correctAnswers = questions.map(q => q.correct_answer);

    //Some UI Modifications
    document.querySelector(".main-container").remove();
    document.querySelector("#start").innerHTML = "GO!";
    document.querySelector("#start").style.backgroundColor = "#3030e8";

    let currentQuestionIndex = 0;
    let score = 0;  

    //Function to show the next question
    function showNextQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
            return;
        }

        //If there's already a question displayed, shrink it
        if (currentQuestionIndex > 0) {
            const previousQuestion = document.querySelector(`.question:nth-child(${currentQuestionIndex})`);
            if (previousQuestion) previousQuestion.classList.add('shrink'); 
        }

        //Some treatments for the current question
        const q = questions[currentQuestionIndex];
        const options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

        //Adds the current active question to the page
        main_form.innerHTML += `
            <fieldset class="question field active">
                <div class="question label">${currentQuestionIndex+1}. ${q.question}</div>
                <div class="timer-container">
                    <div class="timer-bar" id="timer-bar-${currentQuestionIndex}"></div>
                </div>
                <div class="question choices">
                    ${options.map((option, i) => `
                        <div>
                            <input type="radio" name="q${currentQuestionIndex}" id="op${currentQuestionIndex}${i}" value="${option}">
                            <label for="op${currentQuestionIndex}${i}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </fieldset>
        `;

        //Scrolls down to the next question
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

        //Starts the timer for the active questions
        startTimer(currentQuestionIndex);
        currentQuestionIndex++;
    }

    // Function to start the timer for each question
    function startTimer(index) {
        let time_left = 1; //in seconds
        const timer_bar = document.getElementById(`timer-bar-${index}`);

        function countdown() {
            if (time_left > 0) {
                time_left--;
                timer_bar.style.width = `${(time_left / 10) * 100}%`;
                setTimeout(countdown, 1000);
            } else {
                //Checks the answer
                const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
                if (selectedAnswer) {
                    const userAnswer = selectedAnswer.value;
                    if (userAnswer === correctAnswers[index]) {
                        score++; //Increases score if the answer is correct
                    }
                }

                //Moves on to the next question
                showNextQuestion();
            }
        }
        countdown();
    }

    //Function to handle the end of the quiz
    function endQuiz() {
        document.querySelector("#timer").innerHTML = `Final Score: ${score} / 10`;
        document.querySelector("#start").innerHTML = `<button id=\"start\" onclick=\"location.reload();\">Try Again</button>`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    //When done with the current question, we move on to the next one
    showNextQuestion();

}

