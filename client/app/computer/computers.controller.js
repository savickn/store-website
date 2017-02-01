'use strict';

angular.module('passportApp')
  .controller('ComputerCollectionCtrl', function ($scope, $stateParams, $state, $timeout, $location,
      Auth, Upload, ComputerService, ProductService, ngCart) {
    //check why $setValidity is not working sometime
    //work on page anchors
    $scope.isAdmin = Auth.isAdmin();
    $scope.pageType = $state.params.type;
    $scope.filterExpr = {
      __t: $scope.pageType
    };

    $scope.availableProducts = [];
    $scope.searchableCategories = [];

    //////////////////////////// PAGINATION /////////////////////////////////////

    $scope.paginationOptions = [1, 10, 25, 50];
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalProducts = 0;
    getResultsPage($scope.currentPage, $scope.pageSize);

    $scope.pageChanged = function(newPage) {
      getResultsPage(newPage, $scope.pageSize);
    }

    $scope.sizeChanged = function(newSize) {
      $scope.pageSize = newSize;
    }

    ///////////////////////// Getting and Modifying Data ///////////////////////

    function getResultsPage(pageNumber, pageSize, filterExpr) {
      var options = {
        page: pageNumber,
        perPage: pageSize
      };

      ProductService.searchProducts($scope.filterExpr, options).then(function(response) {
        $scope.availableProducts = response.data;
        $scope.totalProducts = response.headers('total-Products');
        getProductInfo(response.data);
      });
    }

    function getProductInfo(products) {
      $scope.searchableCategories = [];
      products[0].searchableCategories.forEach(function(category) {
        category = category.toLowerCase();
        if(!$scope.filterExpr[category]) {
          $scope.filterExpr[category] = []; //used to dynamically add fields to the filterExpr
        }

        var obj = {};
        obj.name = category;
        obj.list = [];

        products.forEach(function(product) {
          obj.list.pushUnique(product[category]);
        });

        $scope.searchableCategories.pushUnique(obj);
      });
    };

    //used to update the search filter using the dynamic search navbar
    $scope.updateFilter = function(state, category, value) {
      console.log(state);
      console.log(category);
      console.log(value);
      if(state) {
        $scope.filterExpr[category].pushUnique(value);
      } else {
        $scope.filterExpr[category].remove(value);
      }
    }

    //////////////////////// SEARCHING + SORTING ////////////////////////////////

    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.priceExpr = {
      minPrice: 1,
      maxPrice: 10000
    };

    $scope.getSearch = function(filterExpr) {
      var search = _.merge(filterExpr, $scope.priceExpr);
      getResultsPage($scope.currentPage, $scope.pageSize, search);
    };

    ///////////////////// PRICE SLIDER ////////////////////////////////////

    $scope.slider = {
      options: {
        floor: 1,
        ceil: 1000,
        step: 1
      }
    };

    //call this if slider is hidden when page loads
    $scope.refreshSlider = function() {
      $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      });
    };

    ///////////////////// DELETE Computer /////////////////////////////////

    $scope.deleteProduct = function(product) {
      ProductService.removeProduct(product._id).then(function() {
        $scope.availableProducts.remove(product);
      });
    };
  });

  /*ComputerService.getComputers(options).then(function(response) {
    $scope.availableProducts = response.data;
    $scope.totalProducts = response.headers('total-Computers');
    getProductInfo(response.data);
  });*/

  /*$scope.getSearch = function(filterExpr) {
    ComputerService.searchComputers(filterExpr).then(function(computers) {
      $scope.availableComputers = computers;
      getProductInfo(computers);
    });
  };*/






    //this is what searchableCategories should look like
    /*$scope.searchableCategories = [{
        name: 'hello',
        list: ['aaa', 'bbb', 'ccc']
      }, {
        name: 'world',
        list: ['ddd', 'eee', 'fff']
      }
    ];*/

    /*function checkForCategory(category) {
      var state = false;
      $scope.searchableCategories.forEach(function(searchable) {
        if(searchable.name === category) {
          state = true;
        }
      })
      return state;
    }*/


/*
    $scope.refresh = function(computers) {
      getProductInfo(computers);
    }

    //GET COMPUTERS
    function getComputers() {
      ComputerService.getComputers().then(function(computers) {
        $scope.availableComputers = computers;
        //getComputerInfo(computers);
      });
    };
    */

    /*Upload.upload({
      url: '/api/pictures',
      method: 'POST',
      data: {file: picture, filename: picture.name, contentType: picture.type, size: picture.size, product: computer._id}
    }).then(function (response) {
      $timeout(function () {
        $scope.status = "success";
        $scope.newPictures.remove(response);

        if(newPictures.length === 0) {
          $scope.availableComputers.push(computer);
          $scope.newComputer = {};
          getComputerInfo();
        }
      });
    }, function (err) {
      if (err.status > 0)
        $scope.errorMsg = err.status + ': ' + err.data;
    }, function (evt) {
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });*/

/*
    $scope.newComputer = {};
    $scope.newPictures = [];
    $scope.newDisplayPicture = {};

    //ADD + REMOVE COMPUTERS
    $scope.addComputer = function() {
      !$scope.newComputer.gpu ? 'Not Specified' : $scope.newComputer.gpu;
      !$scope.newComputer.cpu ? 'Not Specified' : $scope.newComputer.cpu;
      !$scope.newComputer.motherboard ? 'Not Specified' : $scope.newComputer.motherboard;

      $scope.newComputer.publicFields = ['name', 'description', 'price', 'brand', 'onSale',
        'onlineOnly', 'featured', 'cpu', 'gpu', 'motherboard'];

      if($scope.computerform.$valid && Auth.isAdmin()) {
        ComputerService.addComputer($scope.newComputer).then(function(computer) {
          var newComputer = computer;
          var numberOfPictures = $scope.newPictures.length;

          $scope.newPictures.forEach(function(pic) {
            Upload.upload({
              url: '/api/pictures',
              method: 'POST',
              data: {file: pic, filename: pic.name, contentType: pic.type, size: pic.size,
                displayPicture: pic.displayPicture, productType: computer.__t, product: computer._id}
            }).then(function (response) {
              $timeout(function () {
                $scope.status = "success";

                if(response.displayPicture === true) {
                  newComputer.displayPicture = response.path;
                  //console.log(response._id);
                }

                newComputer.pictures.push({path: response.path});
                numberOfPictures -= 1;

                if(numberOfPictures === 0) {
                  //console.log('success');
                  $scope.availableComputers.push(newComputer);
                  $scope.newComputer = {};
                }
              });
            }, function (err) {
              if (err.status > 0)
                $scope.errorMsg = err.status + ': ' + err.data;
            }, function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
              pic.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
          })
        }, function(err) {
          var err = err.data;
          $scope.validationErrors = {};

          angular.forEach(err.errors, function(error, field) {
            //$scope.computerform[field].$setValidity('mongoose', false);
            $scope.validationErrors[field] = error.message;
          });
        });
      }
    };

    $scope.setAsDisplayPicture = function(filename) {
      $scope.newPictures.forEach(function(pic) {
        if(pic.name === filename) {
          pic.displayPicture = true;
        } else {
          pic.displayPicture = false;
        }
      })
    }*/

    /*function getComputerInfo(computers) {
      computers.forEach(function(computer) {
        $scope.computerBrands.pushUnique(computer.brand);
        //$scope.computerCPUs.pushUnique(computer.cpu);
        //$scope.computerGPUs.pushUnique(computer.gpu);
        //$scope.computerMotherboards.pushUnique(computer.motherboard);
      });
    };

    $scope.filterExpr = {
      //motherboard: [],
      //gpu: [],
      //cpu: [],
      brand: []
    };

    //populating dynamic filters
    $scope.computerBrands = [];
    $scope.computerCPUs = [];
    $scope.computerGPUs = [];
    $scope.computerMotherboards = [];
*/
