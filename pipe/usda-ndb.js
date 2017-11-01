'use strict';
const express = require('express');
const ndb = require('usda-ndb');
const body = (req) => Object.assign(req.body, req.query);

const convert = function(i, a) {
  // 1. get object key (id, name)
  const k = Object.keys(a)[0];
  if(!k) return a;
  // 2. convert object to row format
  const Id = parseInt(k.substring(0, k.indexOf(',')));
  const Name = k.substring(k.indexOf(',')+1).trim();
  return Object.assign({Id, Name}, a[k]);
};

module.exports = function(dst) {
  const x = express();
  // 1. setup get from usda-ndb
  x.get('/:id', (req, res, next) => ndb(req.params.id).then((ans) => {
    res.json(convert(req.params.id, ans));
  }, next));
  // 2. setup insert using usda-ndb
  x.post('/', (req, res, next) => ndb(body(req).id).then((ans) => {
    if(!Object.keys(ans).length) return next(new Error('not available'));
    dst.insertOne(convert(body(req).id, ans)).then((ans) => res.json(ans), next);
  }, next));
  return x;
};
