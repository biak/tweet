function demoCtrl($scope,$http){
	
	$scope.message = "TWITTER MEAN STACK DEMO";
	
	/*$scope.select = function(){
		$http.get("/tweets").success(function(response){
			$scope.tweet= response; //change textbox
		});
	};*/
	
	$scope.renderTweets = function(response){
			$scope.tweets = response;
	};
	$scope.all = function(res){
		$http.get("/tweets").success($scope.renderTweets);
	};
	$scope.all();
}