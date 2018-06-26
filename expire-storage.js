/*** Local Storage ***/
var Storage = (function(){
	// reserved
	var expireKey = "_e";
	var valueKey = "_v";

	/**
	* @constructor
	*/
	function storage(key, options){
		this[keyStorageKeyName] = key;
		if(!options) options = {};

		this[keyType] = options["type"] == 1 ? 1 : 0;
		this[keyMaxSize] = options["maxSize"] ? options["maxSize"] : 900000;

		try {
			this[keyStorage] = JSON.parse( (this[keyType] == 1 ? sessionStorage : localStorage).getItem(this[keyStorageKeyName]) || "{}" ) ;
		} catch(e) {
			this[keyStorage] = {};
		}
	}

	storage.prototype["set"] = function(key, value, expireTime) {
		if(expireTime) {
			value = {
				expireKey: getTime() + (expireTime * 1000),
				valueKey: value,
			};
		}

		this[keyStorage][key] = value ;
		var string = JSON.stringify(this[keyStorage]) ;

		if( string.length > this[keyMaxSize] ) {	// max 900kb
			(this[keyType] == 1 ? sessionStorage : localStorage).removeItem( this[keyStorageKeyName] ) ;

		} else {
			(this[keyType] == 1 ? sessionStorage : localStorage).setItem( this[keyStorageKeyName], string ) ;

		}
	}

	storage.prototype["get"] = function(key) {
		var data = !key ? this[keyStorage] : this[keyStorage][key] ;

		if(data && key) {
			if( data[expireKey] ) {
				if( getTime() > data[expireKey] ) {
					data = null ;
					delete this[keyStorage][key];
				} else {
					data = data[valueKey] ;
				}
			}
		}

		return data ? data : null;
	}

	storage.prototype["remove"] = function(key) {
		(this[keyType] == 1 ? sessionStorage : localStorage).removeItem( this[keyStorageKeyName] ) ;
	}

	function getTime() {
		return (new Date).getTime();
	}

	var keyStorage = "s";	// storage
	var keyStorageKeyName = "n";	// storageKey
	var keyType = "t";
	var keyMaxSize = "m";

	return storage ;
}()) ;
