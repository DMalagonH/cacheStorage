/**
 * Caché de datos en el navegador simulado con localStorage
 *
 * @author Diego Malagon <diegomalagonh@gmail.com>
 */
cacheStorage = (function(unique_id){
    
    /**
     * Concatena el key pasado por parámetro a la id única
     * 
     * @param {String} key
     * @returns {String}
     */
    var keyGen = function(key){
        return key += ":" + unique_id;   
    };
    
    /**
     * Guarda un item
     * 
     * @param {String} key clave
     * @param {Object|Array} data valor
     * @param {Integer|undefined} expire_sec segundos de duración del key
     * @returns {undefined}
     */
    var set = function(key, data, expire_sec){
        localStorage.setItem(keyGen(key), JSON.stringify(data));
        
        if(expire_sec !== undefined){
            expire(key, expire_sec);
        }
    };
    
    /**
     * Retorna un item
     * 
     * @param {String} key clave
     * @returns {Array|Object}
     */
    var get = function(key){   
        if(!isExpired(key)){
            return JSON.parse(localStorage.getItem(keyGen(key)));
        }
        return null;
    };
    
    /**
     * Retorna true si existe la clave
     * 
     * @param {String} key clave
     * @returns {Boolean}
     */
    var isSet = function(key){
        if(!isExpired(key)){
            return (keyGen(key) in localStorage);            
        }
        return false;
    };
    
    /**
     * Función para asignar tiempo de vencimiento de un key en almacenamiento
     * 
     * @param {String} key clave
     * @param {Integer} seconds segundos
     * @returns {undefined}
     */
    var expire = function(key, seconds){
        var date = new Date;
        date.setSeconds(date.getSeconds() + seconds);
        localStorage.setItem(keyGen(key)+"_expire", date.getTime());
    };
    
    /**
     * Función para verificar si un key tiene fecha de caducidad
     * 
     * Si el key tiene fecha de caducidad y ha vencido elimina el key y la fecha de caducidad
     * @param {String} key clave
     * @returns {Boolean}
     */
    var isExpired = function(key){
        key = keyGen(key);
                
        if(key+"_expire" in localStorage){
            var expire = new Date(parseInt(localStorage.getItem(key+"_expire")));
            
            if(expire <= new Date){
                localStorage.removeItem(key);
                localStorage.removeItem(key+"_expire");                
                return true;
            }
        }
        
        return false;
    };
    
    /**
     * Función que elimina un item de un array almacenado en una key
     * 
     * @param {String} key clave
     * @param {String} item_key clave del item
     * @param {type} item_value valor de la clave del item
     * @returns {undefined}
     */
    var removeItemFrom = function(key, item_key, item_value){
        if(isSet(key)){
            var items = get(key);
            
            var where = {};
            where[item_key] = item_value;
            
            var updt = _.without(items, _.findWhere(items, where));
            
            set(key, updt);
        }
    };
    
    return {
        set:            set,
        get:            get,
        isSet:          isSet,
        expire:         expire,
        removeItemFrom: removeItemFrom
    };
});