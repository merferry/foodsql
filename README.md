# foodsql

A new way to understand food through queries.


## Pipe

Pipe is a way to obtain food data from various reputed sources.

## Food

Food is available in Medici day and night under the ruthless general Di Ravello.
But every weird truth comes, with a bad buy one get one free truth. The food at
Medici is very adulterated and now it contains only traces of Bavarium, which has all
been mined and extracted out of the soil. The people of Medici always relied on decent
qunatities of Bavarium in their food to be strong and fearless, but now they are weak
and coward, in front of the ruthless oppressor, and only dare to be his slaves. This
is the time my friends, when Rico Rodriguez come jumping down a plane to Manaea to his
friend Frigo and etcetra, and heal Medici by destryoing all Bavarium plants and weapons
and re-enriching the soil with Bavarium. Viva Medici.

## Group

<code>Group</code> is used to create and maintain groups or classifications of
<code>food</code>. This can be used as a method of filtering and aggregating
<code>food</code>. A few examples of <code>group</code> would be like
<code>baking</code> (based on method of cooking), or like <code>salty</code> (basic
taste of <code>food</code>). A <code>group</code> has 4 columns, <code>id</code>
which gives the name of the <code>group</code> and is also the name of SQL view
which can be used in an SQL query, <code>key</code> is the name of the column
to which this <code>group</code> belongs, <code>tag</code> is the name of the
tag used to represent this <code>group</code> within the <code>key</code> column,
and last yet not the least, <code>value</code>, which is an SQL query which
returns all rows to which this <code>group</code> belongs. Once a new
<code>group</code> is inserted, two columns namely <code>&lt;key&gt;</code> and
<code>#&lt;key&gt;</code> are created (with index), and <code>tag</code> is added
all the rows in <code>&lt;key&gt;</code> and <code>#&lt;key&gt;</code> which are
selected by the SQL query in <code>value</code>. If any new rows are added
<code>food</code>, they can be refreshed later. A single row within the same
<code>&gt;key&lt;</code>can have the same tags (like <code>salty, sweet</code>),
and they are separated using a comma. Deleting a group deletes the associated
view, and the tags from all <code>food</code>.

## Term

<code>Term</code> describes alternative terms for columns in <code>food</code>.
Each column in <code>food</code> is case-sensitive, descriptive and long. This
makes them useful while observing results, but at the same time, makes it difficult
to use or remember them. Each <code>term</code> has an <code>id</code>, which is the
alternative term, and a <code>value</code>, which is the actual column name in
<code>food</code>. Examples would be like, <code>id = id</code>, <code>value = Id</code>,
or like, <code>id = carbs</code>, <code>value = Carbohydrate, by difference</code>.
These alternative terms can be used in an <code>query</code>, or in <code>food</code>
search. Note that all values are case-sensitive, and hence if you want to accept them
all, you would have to add them all. If you find anything here confusing, consider
messaging to <a href="mailto:wolfram77@gmail.com">wolfram77@gmail.com</a>.

## Type

<code>Type</code> is the definition of every column in <code>food</code>. Any change
made here alters the table, and may also result in loss of data. This has 2 columns
<code>id</code> which is the name of a (new) column, and <code>value</code> which is
the SQL datatype of that column. An example would be like <code>id = Vitamin A</code>,
and <code>value = REAL</code>. Once a <code>type</code> is added, a column is created
in <code>food</code>, along with an index. Deleting a <code>type</code> deletes the
column, and the associated index. In case of the sligtest doubt, send a message at
<a href="mailto:wolfram77@gmail.com">wplfram77@gmail.com</a>.

## Unit

<code>Unit</code> is used to remember unit conversion factors (to base unit).
These values are put to use when adding a new <code>food</code>, where a
quantity is written as <code>&lt;magnitude&gt; &lt;unit&gt;</code>, or even
<code>&lt;magnitude&gt;&lt;unit&gt;</code>. There are 2 columns, <code>id</code>
is the name of the unit, and <code>value</code> is its conversion factor to base
unit. Base unit is <code>Cal</code> for <code>Energy</code>, <code>IU</code> for
<code>Vitamin A</code>, <code>Vitamin C</code> and <code>Vitamin D</code>, and
<code>g</code> for the rest. Examples would be like <code>id = kg</code>,
<code>value = 0.001</code> or <code>id = tsp</code>, <code>value = 4</code>.
Please note that the <code>id</code> is case-sensitive, and so if you want to
recognize <code>KG</code> as kilogram, it must also be added like so <code>id = KG</code>,
<code>value = 0.001</code>. Scientific notation is supported for the <code>value</code>
field like <code>1e-3</code>. For special base units like <code>IU</code>, it is possible
to mention a different conversion factor for each column by using the name of the column
as <code>id</code>, and the column specific conversion factor as <code>value</code>.
An example would be <code>id = Vitamin A</code>, <code>value = 1.66e+6</code> (assuming
beta-carotene). Now, if <code>Vitamin A</code> is written in <code>mcg</code> then it
will first be converted to <code>g</code>, and finally to <code>IU</code>. Thanks
for making it this far. If still in doubt post your question to
<a href="mailto:wolfram77@gmail.com">wolfram77@gmail.com</a>.
