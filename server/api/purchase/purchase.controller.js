/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/purchases              ->  index
 */

'use strict';

// Gets a list of Purchases
export function index(req, res) {
  res.json([]);
}
