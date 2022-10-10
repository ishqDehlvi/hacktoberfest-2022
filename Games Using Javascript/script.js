//challenge 1 : your age in days

function ageInDays() {
    var birthyear=prompt('What is your year of birth?');
    var ageInDayss= (2021-birthyear)*365;

    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode('You are '+ageInDayss+' days old!');
    h1.setAttribute('id', 'ageInDayss');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDayss').remove();
}

//challenge 2 cat generator
function GenerateCat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src='cats.webp';
    div.appendChild(image);
}


//challenge 3 stone paper scissors 
function rpsGame(yourChoice) {
    console.log(yourChoice.id);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice=numberToChoice(randToRpsInt());
    results=decideWinner(humanChoice, botChoice);
    console.log(results);
 // message= finalMessage(results); //you won
   // rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random()* 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors':1, 'rock': 0.5, 'paper':0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors':0},
        'scissors': {'rock':0, 'paper':1, 'scissors':0.5}
    };

    var yourScore= rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];

    return (yourScore, computerScore); 
} 