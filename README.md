# hashmap

This project features a hashmap and a hashset created using JavaScript.

## HashMap Methods

- `hash(key)` : takes a key and produces a hash code with it.
- `set(key, value)` : takes two arguments, the first is a key and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten or we can say that we update the key’s value 
- `has(key)` : takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
- `remove(key)` : takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
- `length()` : returns the number of stored keys in the hash map.
- `clear()` : removes all entries in the hash map.
- `keys()` : returns an array containing all the keys inside the hash map.
- `values()` : returns an array containing all the values.
- `entries()` : returns an array that contains each key, value pair.

## HashSet Methods

- `hash(key)` : takes a key and produces a hash code with it.
- `set(key)` : takes one argument, a key. If a key already exists, then the new key is discarded.
- `has(key)` : takes a key as an argument and returns true or false based on whether or not the key is in the hash set.
- `remove(key)` : takes a key as an argument. If the given key is in the hash set, it should remove the entry with that key and return true. If the key isn’t in the hash set, it should return false.
- `length()` : returns the number of stored keys in the hash set.
- `clear()` : removes all entries in the hash set.
- `keys()` : returns an array containing all the keys inside the hash set.
