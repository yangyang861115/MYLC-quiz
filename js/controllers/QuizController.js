(function() {
	angular
		.module("quizApp")
		.controller('QuizController', QuizController);

	function QuizController($http) {
		var vm = this;

		function init(){
			vm.result = {
				completed: false,
				answered: 0,
				correct: 0,
				incorrect: 0
			};

			$http.get('questions.json')
				.then(function (res) {
					vm.questions = res.data;
				});
		}
		init();

		vm.checkAnswer = function (idx, selectedAnswer) {
			vm.questions[idx].myAns = selectedAnswer;
			vm.questions[idx].locked = true;
			vm.result.answered++;
			if(vm.result.answered == vm.questions.length) {
				vm.result.completed = true;

				var rate = vm.result.correct/ vm.result.answered;
				if(rate <= 0.5) {
					vm.result.msg = "Some assistance may be needed.";
				} else if(rate <= 0.7) {
					vm.result.msg = "Your general knowledge is okay, some extra study would help.";
				} else if(rate <= 0.8) {
					vm.result.msg = "You are in line with the masses.";
				} else if(rate <= 0.9) {
					vm.result.msg = "You know the material well. Keep it up.";
				} else {
					vm.result.msg = "You are at the top of the class. Way to go.";
				}


			}
			console.log(idx + " "+ selectedAnswer);
			if (vm.questions[idx].answer == selectedAnswer) {
				console.log("you are correct!");
				vm.questions[idx].correct = true;
				vm.result.correct++;
			}
			else {
				console.log("you are wrong!");
				vm.questions[idx].correct = false;
				vm.result.incorrect++;
			}

		};

		vm.restart = function(){
			init();
		};
	}

})();