const questions=[

{
q:"What does ACM stand for?",
options:[
"Association for Computing Machinery",
"Advanced Computer Method",
"Artificial Code Machine",
"Applied Computer Model"
],
answer:0
},

{
q:"What is the main goal of ACM-W?",
options:[
"Supporting women in computing",
"Building computers",
"Making games",
"Creating websites only"
],
answer:0
},

{
q:"AI means?",
options:[
"Artificial Intelligence",
"Automatic Internet",
"Advanced Interface",
"Applied Information"
],
answer:0
},

{
q:"Machine Learning allows computers to:",
options:[
"Learn patterns from data",
"Replace hardware",
"Create electricity",
"Delete files"
],
answer:0
},

{
q:"Which language is widely used for AI?",
options:[
"Python",
"HTML",
"CSS",
"SQL only"
],
answer:0
},

{
q:"A dataset is:",
options:[
"A collection of data",
"A computer screen",
"A keyboard",
"A password"
],
answer:0
},

{
q:"NLP helps computers understand:",
options:[
"Human language",
"Battery power",
"Computer cables",
"Printers"
],
answer:0
},

{
q:"Neural networks are inspired by:",
options:[
"The human brain",
"The internet",
"The keyboard",
"The monitor"
],
answer:0
},

{
q:"Responsible AI focuses on:",
options:[
"Fairness and safety",
"More advertisements",
"Removing testing",
"Hiding information"
],
answer:0
},

{
q:"Why test an AI model?",
options:[
"To check performance",
"To change hardware",
"To increase screen size",
"To install software"
],
answer:0
}

];


let current=0;

let score=0;


function startQuiz(){

showQuestion();

}



function showQuestion(){

let card=document.getElementById("quizCard");


if(current>=questions.length){

card.innerHTML=`

<h2>🤖 AI ANALYSIS COMPLETE</h2>

<div class="result">
${score}/${questions.length}
</div>

<p>
Your AI Knowledge Score has been generated.
</p>

<button onclick="location.reload()">
Restart Mission
</button>

`;

return;

}


let q=questions[current];


card.innerHTML=`

<h3>
Question ${current+1}/${questions.length}
</h3>


<div class="progress">

<div class="progress-bar"
style="width:${(current/questions.length)*100}%">

</div>

</div>


<h2>
${q.q}
</h2>


${q.options.map(
(option,index)=>

<button class="option"
onclick="checkAnswer(${index})">

${option}

</button>

).join("")}

`;

}



function checkAnswer(answer){

if(answer===questions[current].answer){

score++;

}


current++;

showQuestion();

}
