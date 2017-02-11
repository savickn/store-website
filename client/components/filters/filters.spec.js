'use strict';

describe("Filter: ProductFilter", function() {
  beforeEach(module('passportApp'))

  var productFilter;
  var product1 = {
    name: 'Admin',
    gpu: 'GTX 1060',
    onSale: false
  };
  var product2 = {
    name: 'User',
    gpu: 'GTX 1050',
    onSale: true
  };
  var products = [product1, product2];

  beforeEach(inject(function(_$filter_) {
    productFilter = _$filter_('productFilter');
  }));

  it('should exist', function() {
    expect(productFilter).toBeDefined();
  });

  it('should return all products if filterExpr is empty', function() {
    var filterExpr = {};
    var filtered = productFilter(products, filterExpr);
    expect(filtered.length).toEqual(2);
  });

  it('should exclusively return string criteria', function() {
    var filterExpr = {
      name: 'Admin'
    };
    var filtered = productFilter(products, filterExpr);
    expect(filtered.length).toEqual(1);
    expect(filtered[0].name).toMatch('Admin');
  });

  it('should inclusively return array criteria', function() {
    var filterExpr = {
      gpu: ['GTX 1050', 'GTX 1060']
    };
    var filtered = productFilter(products, filterExpr);
    expect(filtered.length).toEqual(2);
  });

  it('should exclusively return boolean criteria', function() {
    var filterExpr = {
      gpu: ['GTX 1050', 'GTX 1060'],
      onSale: true
    };
    var filtered = productFilter(products, filterExpr);
    expect(filtered.length).toEqual(1);
    expect(filtered[0].name).toMatch('User')
  });
});

describe("Filter: PriceFilter", function() {
  beforeEach(module('passportApp'))

  var priceFilter;
  var product1 = {
    name: 'Admin',
    price: 1000
  };
  var product2 = {
    name: 'User',
    price: 200
  };
  var products = [product1, product2];

  beforeEach(inject(function(_$filter_) {
    priceFilter = _$filter_('priceFilter');
  }))

  it('should exist', function() {
    expect(priceFilter).toBeDefined();
  });

  it('should return all products if priceExpr is not defined', function() {
    var priceExpr = {};
    var filtered = priceFilter(products, priceExpr);
    expect(filtered.length).toEqual(2);
  })

  it('should return only the products that fit within the price range', function() {
    var priceExpr = {
      minPrice: 100,
      maxPrice: 300
    };
    var filtered = priceFilter(products, priceExpr);
    expect(filtered.length).toEqual(1);
    expect(filtered[0].name).toMatch('User');
  });
});
