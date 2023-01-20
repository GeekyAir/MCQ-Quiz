import {Quiz} from "./quiz.js"
export class settings {
    constructor() {
        particlesJS.load('particles-js', 'js/particles.json', function() {
            console.log('callback - particles.js config loaded');
          })
        this.category = document.getElementById('category');
        this.difficulty = document.getElementsByName('difficulty');
        this.numberOfQuestions = document.getElementById('numberOfQuestions');
        document.getElementById('startBtn').addEventListener("click", this.startQuiz.bind(this));
        
    }
    async startQuiz() {
        let userCat = this.category.value;
        let userDiffculty = $("input[type='radio']:checked").val();
        let Noq = this.numberOfQuestions.value;
        let API = `https://opentdb.com/api.php?amount=${Noq}&category=${userCat}&difficulty=${userDiffculty}&type=multiple`;
        // this.getQuestions(API);
        let questions= await this.getQuestions(API);
        if (questions.length>0){
            let quiz = new  Quiz(questions);

        }
        this.validateCategory()
        if(this.validateNumberofQ() == true && this.validateCategory() == true) {
            $("#setting").hide();
            $("#quiz").show();

        }


    }
    async getQuestions(API) {
        let res = await fetch(API);
        let data = await res.json();
        return data.results;

    }
    validateCategory() {
        var userCat=document.getElementById('category').value
        if (userCat == "") {
            $("#catError").show()
        } else {
            $("#catError").hide()
            return true
        }
    }
    validateNumberofQ() {
        var NoQ = document.getElementById('numberOfQuestions').value;
        if ((NoQ > 0 && NoQ < 51)) {
            $("#numError").hide();
            return true
        } else {
            $("#numError").show();

        }
    }

}

