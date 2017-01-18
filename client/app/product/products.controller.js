'use strict';

angular.module('passportApp')
  .controller('ProductCollectionCtrl', function ($scope, $stateParams, $timeout, $location,
      Auth, Upload, ProductService, CartService, ngCart) {
    //check why $setValidity is not working sometime
    //work on page anchors

    $scope.isAdmin = Auth.isAdmin();

    $scope.errorMessages = "";
    $scope.validationErrors = {};

    $scope.availableProducts = [];

    $scope.brands = [];

    $scope.searchableCategories = [];

    /*$scope.searchableCategories = [{
        name: 'hello',
        list: ['aaa', 'bbb', 'ccc']
      }, {
        name: 'world',
        list: ['ddd', 'eee', 'fff']
      }
    ];*/

    ///////////////////////////////////////////////////////////////////////////
    
    //PAGINATION
    $scope.paginationOptions = [1, 10, 25, 50];
    $scope.currentPage = 1;
    $scope.totalProducts = 0;
    $scope.pageSize = 10;
    getResultsPage($scope.currentPage, $scope.pageSize);
    
    $scope.pageChanged = function(newPage) {
      getResultsPage(newPage, $scope.pageSize);
    }

    $scope.sizeChanged = function(newSize) {
      $scope.pageSize = newSize;
    }

    function getResultsPage(pageNumber, pageSize) {
      var options = {
        page: pageNumber,
        perPage: pageSize
      };
      ProductService.searchProducts(options).then(function(response) {
        $scope.availableProducts = response.data;   
        $scope.totalProducts = response.headers('total-Products');
        getProductInfo(response.data);
      });
    }

    /////////////////////////////////////////////////////////////////////////////

    //SEARCHING + SORTING
    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.filterExpr = {
      brand: []
    };

    $scope.priceExpr = {
      minPrice: 1,
      maxPrice: 10000
    };

    $scope.getSearch = function(filterExpr) {
      ProductService.searchProducts(filterExpr).then(function(products) {
        $scope.availableProducts = products;
        getInfo(products);
        getProductInfo(products);
      });
    };

    ///////////////////////////////////////////////////////////////////

    function getProductInfo(products) {
      products[0].searchableCategories.forEach(function(category) {
        $scope.filterExpr[category] = [];

        console.log(category);
        console.log($scope.filterExpr[category]);

        var obj = {};
        obj.name = category;
        obj.list = [];

        products.forEach(function(product) {
          obj.list.pushUnique(product[category]);
        });

        $scope.searchableCategories.pushUnique(obj);
      });
    };

    //populates page data
    function getInfo(products) {
      products.forEach(function(product) {
        $scope.brands.pushUnique(product.brand);
      });
    };


    ///////////////////////////////////////////////////////////////////////


    $scope.deleteProduct = function(product) {
      var idx = $scope.availableProducts.indexOf(product);
      
      ProductService.removeProduct(product._id).then(function() {
        $scope.availableProducts.splice(idx, 1);
      }).catch(function(err) {
        console.log('error. could not remove product')
      });
    };


  });



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