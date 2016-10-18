
moduleNew.controller('newColumnOne', ['$scope', 'ResponseFactory', function($scope, ResponseFactory) {
    var pageNumber = 1, totalPage;
    var subjectName = "php";
    $scope.bookPromise = function(subject) {
              subjectName = subject;
              pageNumber = 1;
              $scope.selectedBooks();
      };
    $scope.selectedBooks = function(){
      var url = "http://it-ebooks-api.info/v1/search/" + subjectName + "/page/" + pageNumber;
      console.log(url);
              ResponseFactory.getReply(url)
                  .then(function(data) {
                      $scope.Books = data.Books;
                      totalPage = Math.ceil(parseInt(data.Total)/10);
                  }, function(error) {
                      console.log("Fail to load data");
                  });
          };
    $scope.previousPage = function() {
            if(pageNumber > 1) {
              pageNumber -= 1;
              $scope.selectedBooks();
            }
    };
    $scope.nextPage = function() {
          if(pageNumber < totalPage) {
            pageNumber += 1;
            $scope.selectedBooks();
          }
    };
    $scope.selectedBooks();
 }]);

 moduleNew.factory('ResponseFactory', function ($http, $q) {
       return {
           getReply: function(url) {
             var urlDynamic = url;
               return $http.get(urlDynamic)
                   .then(function(response) {
                       if (typeof response.data === 'object') {
                           return response.data;
                       } else {
                           return $q.reject(response.data);
                       }
                   }, function(response) {
                       return $q.reject(response.data);
                   });
           }
       };
   });
