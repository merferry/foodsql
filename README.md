# foodsql

A new way to understand food through queries.


## pipe

Pipe is a way to obtain food data from various reputed sources.


## food

Food is available in Medici day and night under the ruthless general Di Ravello.
But every weird truth comes, with a bad buy one get one free truth. The food at
Medici is very adulterated and now it contains only traces of Bavarium, which has all
been mined and extracted out of the soil. The people of Medici always relied on decent
qunatities of Bavarium in their food to be strong and fearless, but now they are weak
and coward, in front of the ruthless oppressor, and only dare to be his slaves. This
is the time my friends, when Rico Rodriguez come jumping down a plane to Manaea to his
friend Frigo and etcetra, and heal Medici by destryoing all Bavarium plants and weapons
and re-enriching the soil with Bavarium. Viva Medici.


## group

A *Table* that is used to store groups or classifications of **food**. This can
be used as a method of **filtering** and **aggregating** **food**. A few types
of **group** could be like:
- **baking**: based on method of cooking.
- **salty**: basic taste of **food**.

It has the following columns:
- **id**: name of the **group** and *SQL view*.
- **key**: name of the column to which this **group** belongs.
- **tag**: name of the tag used to represent this **group** within **key**.
- **value**: *SQL query* which returns all rows to which this **group** belongs.

Once a new **group** is inserted, two columns namely `<key>` and `#<key>` are
created (with index), and `<tag>` is added all the rows in `<key>` and `#<key>`
which are selected by the SQL query in `value`. If any new rows are added to
**food**, they can be refreshed later. A single row within the same `<key>` can
have multiple tags (like `salty, sweet`), and they are separated using a comma.
Deleting a **group** deletes the associated view, and the tags from all **food**.


## term

A *Table* that is used to store *alternative terms* for columns in **food**.
Each column in **food** is *case-sensitive*, *descriptive* and *long*. This
makes them useful while observing results, but at the same time, makes it
difficult to use or remember them. It has the following columns:
- **id**: alternative term.
- **value**: actual column name in **food**.

These alternative terms can be used in an *query*, or in *food search*. Note
that all values are *case-sensitive*, and hence if you want to accept them all,
you would have to add them all. Examples would be like:
- `id = id`, `value = Id`.
- `id = carbs`, `value = Carbohydrate, by difference`.


## type

A *Table* that is used to store the *definition* of **every column** in
**food**. Any change made here **alters** the table, and may also result in
**loss of data**. It has the following columns:
- **id**: name of a the column.
- **value**: *SQL datatype* of that column.

Once a **type** is added, a column is created in **food**, along with an
*index*. Deleting a **type** deletes the column, and the associated index.
An example would be like:
- `id = Vitamin A`, `value = REAL`.


## unit

A *Table* that is used to store *unit conversion factors* to **base unit**.
These values are put to use when adding a new **food**, where a quantity is
written as `<magnitude> <unit>`. It has the following columns:
- **id**: name of the unit.
- **value**: conversion factor to base unit.

The base unit for a column is:
- **Cal**: for `Energy`.
- **IU**: for `Vitamin A`, `Vitamin C` and `Vitamin D`.
- **g**: for the rest.

Please note that the **id** field is **case-sensitive**, and so if you want to
recognize `Kg` as kilogram, it must also be added. Scientific notation is
supported for the **value** field. Examples for **unit** would be like:
- `id = kg`, `value = 0.001`.
- `id = Kg`, `value = 0.001`
- `id = KG`, `value = 1e-3`
- `id = tsp`, `value = 4`.

For special base units like `IU`, it is possible to mention a different
conversion factor for each column by using the name of the column as **id**,
and the column specific conversion factor as **value**. Now, if `Vitamin A` is
written in `mcg` then it will first be converted to `g`, and finally to `IU`.
An example would be:
- `id = Vitamin A`, `value = 1.66e+6` (assuming beta-carotene).

Congratulations on making it this far.
