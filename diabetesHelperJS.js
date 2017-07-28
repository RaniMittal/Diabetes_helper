// We are telling Angular, that when you are initializing, also use the module called 'ngRoute'
// This is why the function is called angular.module() - it helps us add a list of modules that our app is dependent on

// ngRoute module routes your application to different pages without reloading the entire application.

var foodieApp=angular.module('foodieApp',['ngRoute']);

foodieApp.config(function routeConfiguration($routeProvider){
	$routeProvider.when('/',{templateUrl:'pages/loginTemplate.html'});
	$routeProvider.when('/home',{templateUrl:'pages/mainTemplate.html'});
	$routeProvider.when('/restaurant/:id',{templateUrl:'pages/detailsTemplate.html',controller:'restaurantController'});

});

foodieApp.controller('loginController',function($scope,$location){
	$scope.goToHome = function(email,password) {
		if (email && password) {
			$location.url('home');
		} else {
			console.log('not validated');
		}		
	}
});

foodieApp.service('restaurantsService', function() {
	this.restaurants = [

						    {
								name: 'Akira Back',
								address: 'J W Marriott Hotel, Aerocity, Asset Area 4, Indira Gandhi International Airport, New Delhi, Delhi 110037',								
								vote: '4.6',	
								cuisines:'Japanese, Korean',
								cost:'4,500 for two people (approx.)',							
								hours: ' 6PM – 11:30 PM (Mon-Sat)',
								phone: '99706 48961',
								reservations: 'eazydiner.com, zomato.com',
								image: 'http://luxurylaunches.com/wp-content/uploads/2014/04/akira-back-6-690x460.jpg',
								bestDish:{
									        name:'Tuna Pizza',
									        image:'https://i.pinimg.com/736x/67/e6/89/67e689625879baa279bacc85506788d2--tuna-pizza-food-tasting.jpg'
									     }
							},

							{
								name: 'Artusi Ristorante e Bar',
								address: 'M-24, M-Block Market, Greater Kailash 2, New Delhi, Delhi 110048',								
								vote: '4.5',
								cuisines:'Italian',	
								cost:'3,000 for two people (approx.)',							
								hours: '11:30AM–1AM (Mon-Sun)',
								phone: '88002 09695',
								reservations: 'zomato.com',
								image: 'https://media-cdn.tripadvisor.com/media/photo-s/06/28/a2/13/artusi-intirior.jpg',
								bestDish:{
									        name:'Panna cotta',
									        image:'https://pull-revisfoodography.netdna-ssl.com/wp-content/uploads/2017/01/panna-cotta-2.jpg'
									     }
							},

							{
								name: 'Bukhara',
								address: '3, Comedy Centre, Opp Satyavati College, Ashok Vohar Phase 2, New Delhi, Delhi 110052',								
								vote: '4.4',
								cuisines:'Indian, Asian, Vegetarian Friendly, Vegan Options, Gluten Free Options',
								cost:'6,500 for two people (approx.)',								
								hours: '11:30AM–3:30PM, 7:30–11:30PM (Mon-Sun)',
								phone: '91 11 4621 5152',
								reservations:'eazydiner.com',
								image: 'http://media2.intoday.in/indiatoday/images/stories/bukhara_650_022714111945.jpg',
								bestDish:{
									        name:'kebabs',
									        image:'http://www.cookingclassy.com/wp-content/uploads/2015/07/hawaiian-chicken-kebabs11-srgb.1.jpg'
									     }
							},

							{
								name: 'Oh! Calcutta',
								address: 'Ground Floor, E Block, Opposite Satyam Cinema, Nehru Place, New Delhi',								
								vote: '4.4',
								cuisines:'Bengali, Seafood',
								cost:'1,700 for two people (approx.)',								
								hours: '12:30 PM to 3:30 PM, 7:30 PM to 11:30 PM (Mon-Sun)',
								phone:'011 33105080',
								reservations:' zomato.com, eazydiner.com',
								image: 'https://delhirestaurantblog.files.wordpress.com/2012/06/oh-calcutta.jpg',
								bestDish:{
									        name:'Luchi',
									        image:'http://www.happytrips.com/photo/msid-48787005,width-96,height-65.cms'
									     }
							},

							{
								name: 'Indian Accent',
								address: 'The Manor, 77, Friends Colony, New Delhi',								
								vote: '4.5 ',
								cuisines:'Modern Indian',	
								cost:'4,000 for two people (approx.)  ',							
								hours: '12 Noon - 2:30 PM , 7pm - 10:45 PM (Mon-Sun)',
								phone: '9871117968',
								reservations:'eazydiner.com',
								image: 'https://img-cdn.eveningflavors.com/EvfImages/Restaurant/Delhi/19091/2.JPG',
								bestDish:{
									        name:'Sangria',
									        image:'https://thumbs.dreamstime.com/z/fruit-sangria-punch-fruits-35890940.jpg'
									     }
							},

							{
								name: 'Varq',
								address: 'The Taj Mahal Hotel, 1, Mansingh Road, New Delhi',								
								vote: '4.4',
								cuisines:'Seafood, North Indian',	
								cost:'4,500 for two people (approx.)',								
								hours: '12:30PM–2:45PM, 7PM–11:30PM (Mon-Sun)',
								phone:'011 23026162',
								reservations:'zomato.com',
								image: 'https://b.zmtcdn.com/data/pictures/3/2693/9dd7280bdd888a6a8ab1a6adc8e1d4e3_featured_v2.jpg',
								bestDish:{
									        name:'Shahi Tukda',
									        image:'http://farm8.static.flickr.com/7217/7179186223_791bae1210_z.jpg'
									     }
							}

	]

});

foodieApp.controller('mainController',function($scope,restaurantsService){

	$scope.restaurants = restaurantsService.restaurants;
													
});


foodieApp.controller('restaurantController',function($scope,restaurantsService,$routeParams,$http){

	$scope.restaurantId = $routeParams.id;
	var restaurants = restaurantsService.restaurants;
	$scope.ingredients = [];
	$scope.getIngredients = false;
	$scope.restaurant = restaurants[$routeParams.id - 1];

	$scope.restaurant = restaurants[$routeParams.id];

	$scope.getIngredients = function(url) {

		var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}';
		$http({
			'method': 'POST',
			'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
			'headers': {
				'Authorization': 'Key b0da72a74c9743bcb90b9177240ac328',
				'Content-Type': 'application/json'
			},
			'data': data
		}).then(function success(response) {
		  var ingredients = response.data.outputs[0].data.concepts;
  			for (var i =0;i < ingredients.length;i++) {
  				$scope.ingredients.push(ingredients[i].name);  				
		    }
		 }) 
   }
});