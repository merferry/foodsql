'use strict';
const express = require('express');
const foodcalories = require('myfitnesspal-foodcalories');
const body = (req) => Object.assign(req.body, req.query);

const convert = function(i, a) {
  // 1. get object key (id, name)
  const k = Object.keys(a)[0];
  if(!k) return a;
  // 2. convert object to row format
  const Id = i, Name = k;
  return Object.assign({Id, Name}, a[k]);
};

module.exports = function(dst) {
  const x = express();
  // 1. setup get from myfitnesspal-foodcalories
  x.get('/:id', (req, res, next) => foodcalories(req.params.id).then((ans) => {
    res.json(convert(req.params.id, ans));
  }, next));
  // 2. setup insert using myfitnesspal-foodcalories
  x.post('/', (req, res, next) => foodcalories(body(req).id).then((ans) => {
    if(!Object.keys(ans).length) return next(new Error('not available'));
    dst.insertOne(convert(body(req).id, ans)).then((ans) => res.json(ans), next);
  }, next));
  return x;
};
