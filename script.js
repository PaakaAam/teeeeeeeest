const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

let polls = [
    {
        question: "Your favorite drink 🍹?",
        answers: ["Coffee", "Tea", "Juice", "Soda"],
        pollcount: 100,
        answerweight: [36, 33, 20, 10],
        selectanswer: -1
    },
    {
        question: "Your favorite fast food 🍟?",
        answers: ["Burgers", "Pizza", "French Fries", "Nachos"],
        pollcount: 100,
        answerweight: [40, 29, 25, 5],
        selectanswer: -1
    },
    {
        question: "What do you prefer🤔?",
        answers: ["Pasta","Pizza"],
        pollcount: 100,
        answerweight: [53,46],
        selectanswer: -1
    },
    {
        question: "What do you prefer🤔?",
        answers: ["Burger","French Fries"],
        pollcount: 100,
        answerweight: [39,60],
        selectanswer: -1
    },
    {
        question: "What do you prefer🤔?",
        answers: ["Tea","Coffee"],
        pollcount: 100,
        answerweight: [46,53],
        selectanswer: -1
    },
  ];
  
  function renderPoll(poll, containerId) {
    const pollContainer = document.getElementById(containerId);
    pollContainer.innerHTML = 
    `
      <div class="question">${poll.question}</div>
      <div class="answers">
        ${poll.answers
          .map(
            (answer, i) => `
            <div class="answer" onclick="markAnswer('${containerId}', ${i})">
              ${answer}
              <span class="percentage_bar"></span>
              <span class="percentage_value"></span>
            </div>
          `
          )
          .join("")}
      </div>
    `;
  }
  
  function markAnswer(containerId, i) {
    const poll = polls[containerId === "poll1" ? 0 : 1];
    poll.selectanswer = i;
  
    const answers = document
      .getElementById(containerId)
      .querySelectorAll(".answer");
  
    answers.forEach(answer => answer.classList.remove("selected"));
    answers[i].classList.add("selected");
  
    showResults(poll, containerId);
  }
  
  function showResults(poll, containerId) {
    const answers = document.getElementById(containerId).querySelectorAll(".answer");

    for (let i = 0; i < answers.length; i++) {
        
        let percentage = 0;

        if (i===poll.selectanswer) 
        {
            percentage = Math.round
            (
                (poll.answerweight[i] + 1) * 100 / (poll.pollcount + 1)
            );
        }

        else
        {
            percentage = Math.round
            (
                (poll.answerweight[i]) * 100 / (poll.pollcount + 1)
            );
        }
        answers[i].querySelector(".percentage_bar").style.width = `${percentage}%`;
        answers[i].querySelector(".percentage_value").innerText = `${percentage}%`;
    }
}
  
  renderPoll(polls[0], "poll1");
  renderPoll(polls[1], "poll2");
  renderPoll(polls[2], "poll3");
  renderPoll(polls[3], "poll4");
  renderPoll(polls[4], "poll5");




