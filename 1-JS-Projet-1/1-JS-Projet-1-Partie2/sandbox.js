//Function to fetch trivia questions from the API with some filters 
async function fetchQuestions(amount = 10, type = null, difficulty = null, category = null) {
    try {
        //Build the API URL
        let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;

        //For security purposes, we check the nature of the variables before appending them to the URL
        if (type)  apiUrl += `&type=${type}`;
        if (difficulty) apiUrl += `&difficulty=${difficulty}`;
        if (category) apiUrl += `&category=${category}`;

        //Fetches data from the API
        const response = await fetch(apiUrl);

        //Checks if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //Parses the JSON response
        const data = await response.json();

        //Checks the response code
        if (data.response_code !== 0) {
            throw new Error(`API Error: Response Code ${data.response_code}`);
        }

        // Returns the fetched questions
        return data.results;

    } 
    catch (error) {
        console.error("Error fetching trivia questions:", error);
        return null;
    }
}

//Main Function for the Quiz
async function displayQuestions() {
    //Sets constants for what we will use
    const main_form = document.querySelector("form.questions-form");
    var amount = document.querySelector("input#amount").value;
    const type = document.querySelector("select#type").value;
    const difficulty = document.querySelector("select#difficulty").value;
    const category = document.querySelector("select#category").value;

    //Checks the amount given by the user  
    if (isNaN(amount) && amount != "") {
        alert("Please enter an integer in the \"Number of Questions\" setting");
        return;
    }

    //Sets the amount of questions to 10 by default
    if (!amount) amount = 10;

    //Fetches the questions from the API
    const questions = await fetchQuestions(parseInt(amount), type, difficulty, category);
    if (questions) {
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
            let time_left = 10; //in seconds
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
            document.querySelector("#timer").innerHTML = `Final Score: ${score} / ${amount}`;
            document.querySelector("#start").innerHTML = `<button id=\"start\" onclick=\"location.reload();\">Try Again</button>`;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        //When done with the current question, we move on to the next one
        showNextQuestion();
    } 
    else {
        //Displays an error in case the API didn't provide a response
        main_form.innerHTML = "<p>Failed to fetch questions.</p>";
    }
}

