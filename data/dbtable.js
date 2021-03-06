'use strict';
const stream = require('stream');
stream.is = require('is-stream');
stream.toString = require('stream-string');
const join = require('object-joinx');

function rename(obj, key) {
  // 1. rename object keys case insensitively
  const z = {};
  for(var k in obj)
    z[key[k]||key[k.toLowerCase()]||k] = obj[k];
  return z;
};

const $ = function DbTable(id, db, opt) {
  this._id = id;
  this._db = db;
  this._opt = opt||{};
  this._map = this._opt.map? new Map() : null;
};
module.exports = $;

const _ = $.prototype;

_.select = function(a, l) {
  a = rename(a, this._opt.rename||{});
  // 1. get where with like, limit
  const p = [], w = join(a, '"%k"::TEXT LIKE $%i::TEXT', ' AND ', 1, p);
  const q = (w? ' WHERE '+w : '')+(l!=null? ' LIMIT '+l : '');
  // 2. execute the query (if its still valid)
  return this._db.query(`SELECT * FROM "${this._id}"`+q, p).then((ans) => {
  // 3. get a map if its required (opt.map = true)
    if(!this._opt.map) return ans;
    const map = this._map;
    for(var i=0, I=ans.rowCount, R=ans.rows; i<I; i++)
      map.set(R[i].id, R[i]);
    return ans;
  });
};

_.insert = function(a) {
  a = rename(a, this._opt.rename||{});
  console.log('insert', a);
  // 1. get columns and values (to insert)
  const p = [], c = join(a, '"%k"', ',', 1, p), v = join(a, '$%i', ',', 1);
  // 2. execute an insert query (lets fight)
  return this._db.query(`INSERT INTO "${this._id}" (${c}) VALUES (${v})`, p);
};

_.delete = function(a) {
  a = rename(a, this._opt.rename||{});
  console.log('delete', a);
  // 1. get where with like
  const p = [], w = join(a, '"%k"::TEXT LIKE $%i::TEXT', ' AND ', 1, p);
  // 2. execute the query (ready for disaster?)
  return this._db.query(`DELETE FROM "${this._id}"`+(w? ' WHERE '+w : ''), p);
};

_.update = function(a, b) {
  a = rename(a, this._opt.rename||{});
  b = rename(b, this._opt.rename||{});
  console.log('update', a, b);
  // 1. prepare the update conditions (where, set)
  const p = [], w = join(a, '"%k"::TEXT LIKE $%i::TEXT', ' AND ', 1, p);
  const s = join(b, '"%k"=$%i', ' AND ', p.length+1, p);
  const q = (s? ' SET '+s : '')+(w? ' WHERE '+w : '');
  // 2. query to run (and possible do some valid update)
  return this._db.query(`UPDATE "${this._id}"`+q, p);
};

_.selectOne = function(a) {
  a = rename(a, this._opt.rename||{});
  // 1. if map we have, get from it using "id"
  if(this._map) return this._map.get(a.id);
  // 2. instead of direct code, lets call a function
  return this._db.query(`SELECT * FROM ${this._id}_selectone($1) t`, [a]);
};

_.insertOne = function(a) {
  a = rename(a, this._opt.rename||{});
  console.log('insertOne', a);
  // 1. insert new row into the table
  return this._db.query(`SELECT ${this._id}_insertone($1)`, [a]).then((ans) => {
  // 2. if map exists, then add it there too
    if(this._map) this._map.set(a.id, a);
    return ans;
  });
};

_.updateOne = function(a, b) {
  a = rename(a, this._opt.rename||{});
  b = rename(b, this._opt.rename||{});
  console.log('updateOne', this._id, a, b);
  // 1. insert or update row to table
  return this._db.query(`SELECT ${this._id}_updateone($1, $2)`, [a, b]).then((ans) => {
  // 2. if map exists, then add it there
    if(this._map) this._map.set(a.id, Object.assign(this._map.get(a.id), b));
    return ans;
  });
};

_.deleteOne = function(a) {
  a = rename(a, this._opt.rename||{});
  console.log('deleteOne', this._id, a);
  // 1. delete row from table
  return this._db.query(`SELECT ${this._id}_deleteone($1)`, [a]).then((ans) => {
  // 2. if map exists, then why still keep it there?
    if(this._map) this._map.delete(a.id);
    return ans;
  });
};

_.call = function(fn, args) {
  // 1. generate argument list
  const a = join(args||[], '$%i', ',', 1);
  // 2. make a function call with arguments (for those extra secretives)
  return this._db.query(`SELECT ${this._id}_${fn}(${a})`, args||[]);
};

_.setup = function() {
  // 1. get setup sql command (opt.setup = string/stream)
  return Promise.resolve(this._opt.setup||'').then((ans) => {
    return stream.is(ans)? stream.toString(ans) : ans;
  // 2. run the setup commands (just crash if its garbage $)
  }).then((ans) => {
    return this._db.query(ans);
  // NOTE: to fill up the map call select({})
  });
};
