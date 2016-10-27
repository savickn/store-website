/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/addresses              ->  index
 */

'use strict';

// Gets a list of Addresss
export function index(req, res) {
  res.json([]);
}
