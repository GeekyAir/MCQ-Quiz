export class Quiz {
    constructor(questions){
        this.questions=questions;
        this.noq=questions.length;
        this.score=0
        this.currentIndex=0;
        document.getElementById('nextBtn').addEventListener('click',this.nextQuestion.bind(this));
       $("#tryAgain").click(()=>{
        $("#finish").fadeOut(500);
        $("#setting").fadeIn(500);
       })
        this.showQuestion();
        
    }
    showQuestion(){
          $("#question").html(this.questions[this.currentIndex].question);
          let correctAnswer=this.questions[this.currentIndex].correct_answer;
          let incorrectAnswer = this.questions[this.currentIndex].incorrect_answers;
          let answers=[correctAnswer, ...incorrectAnswer];
          document.getElementById("currentQuestion").innerHTML=this.currentIndex+1;
          document.getElementById("totalNumberOfQuestions").innerHTML=this.noq;
          this.shuffle(answers)
          let container=""
        for(let i=0;i<answers.length;i++){
            container += `
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" class="form-check-input mb-3 mx-3" name="answer" value="${answers[i]}" >
                ${answers[i]}
             </label>
            </div>`;


    } 

$("#answerBox").html(container)

    }
    checkCorrectAnswer(){
        let correctAnswer=this.questions[this.currentIndex].correct_answer;
        let userAnswer=$('input[name="answer"]:checked').val();
        if (correctAnswer==userAnswer){
            this.score++
            $("#Correct").fadeIn(500).fadeOut(500)
        }else{
            $("#inCorrect").fadeIn(500).fadeOut(500)
        }
    }
    nextQuestion(){
        let correctAnswer=this.questions[this.currentIndex].correct_answer;
        let userAnswer=$('input[name="answer"]:checked').val();
        this.checkCorrectAnswer();
        this.currentIndex++;
        if(this.noq>this.currentIndex){
            this.showQuestion()
        }else{
            $("#quiz").fadeOut(400);
            $("#finish").fadeIn(400);
            $("#score").html(this.score)
        }
       
    }
    shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
}