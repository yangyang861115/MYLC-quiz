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
	}

})();