# cacheStorage

Caché de datos en el navegador simulado con localStorage  
data cache in browser simulated with localStorage

## Dependencies
* Underscore.js: Used in removeItemFrom method only. you can delete it to remove underscore dependency.

## Usage
	<script src="path/to/cachestorage.js"></script>
	
	<script language="javascript">
		var unique_id = 1; // Any value that identifies the user session
		cache = cacheStorage(unique_id);
	</script>

### Methods
* Set  
	`cache.set("any_key", "any value", 10);` Expire in 10 seconds
* Get  
` cache.get("any_key");` Get value or null if it has expired or does not exist
* isSet   
`cache.isSet("any_key");` Get true if set or false if not
* expire  
`cache.expire("any_key", 30);` Set time to life to key
* isExpired   
`cache.isExpired("any_key");` Checks if a key has expired and deletes it
* removeItemFrom  
`cache.removeItemFrom("any_key", "item_key", "item_value");` Find an element in an array stored in a key and delete it
	

