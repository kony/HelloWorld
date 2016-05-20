
	kony.decrement = function(num){
		if(typeof(num) === "number"){
			return num - 1;
		}else{
			return num;
		}
	};
	
	kony.increment = function(num){
		if(typeof(num) === "number"){
			return num + 1;
		}else{
			return num;
		}
	};

	kony.decrementIndices = function(arr){
		var tArr = [];
		for(var i=0; i < arr.length; i++) {
			tArr[i] = arr[i] - 1;		
		}
		return tArr;
	};
	
	kony.incrementIndices = function(arr){
		var tArr = [];
		for(var i=0; i < arr.length; i++) {
			tArr[i] = arr[i] + 1;		
		}
		return tArr;
	};	
/**The Math Library has APIs that you can use to perform mathematical operations.*/
kony.math = {
	/**@Deprecated. This API returns the value of pi. Note: math.pi is not a function, but a property in math namespace.*/
	pi: Math.PI,

	/**@Deprecated. This API generates pseudo-random numbers which are uniformly distributed. This API generates a real number between 0 and 1.*/
	random: function () {
		
		return (Math.random());
		/*var result = Math.random();
	
		if (0 === args.length) {
			return result;
		} else if (1 === args.length) {
			args[0] -= 0;
			if (isNaN(args[0])) {
				throw new Error("Invalid argument to math.random");
			}
	
			result = Math.floor(result * args[0]) + 1;
		} else if (2 === args.length) {
			args[0] -= 0; args[1] -= 0;
			if (isNaN(args[0]) || isNaN(args[1])) {
				throw new Error("Invalid argument(s) to math.random");
			}
	
			result = Math.floor(result * (args[1] - args[0] + 1)) + args[0];
		} else {
			throw new Error("Invalid number of arguments to math.random");
		}
	
		return result;*/
	},
	
	/*
	randomseed: function (args) {
		return null;
	},
	*/
/**@Deprecated. This API sets the input parameter as the "seed" for the pseudo-random generator.
Note: Equal seeds produce equal sequences of numbers.*/
	randomSeed: function (num) {
		pseudoRandomArray = [];
	
		if (isNaN(num))
			throw new Error("Invalid argument to math.randomseed");
		
		if(!pseudoRandomArray[num])
		{
			pseudoRandomArray[num] = Math.random();
		}
		return pseudoRandomArray[num];
	},
/**@Deprecated. This API converts the float value to an integer. The converted integer value is always the integer part of the specified float number (number before the decimal).*/
	toInteger: function (num) {
		num -= 0;
		if (isNaN(num)) {
			throw new Error("Invalid argument to math.tointeger");
		}
	
		return Math.floor(num);
	},
	
	/**@Deprecated. This API raises the first parameter to the power of the second parameter and returns the result.*/
	pow: function (num1, num2) {
		
		num1 -= 0;
		num2 -= 0;
		
		if (isNaN(num1) || isNaN(num2)) {
			throw new Error("Invalid argument(s) to math.pow");
		}
	
		return Math.pow(num1, num2);
	},

		findExtreme: function(extreme, args) {
		if (args.length < 2) {
			throw new Error((extreme ? "math.max" : "math.min") + " needs atleast two arguments");
		}
	
		var result = args[0] - 0;
		if (isNaN(result)) {
			throw new Error("Invalid argument to " + (extreme ? "math.max" : "math.min"));
		}
	
		for (var i = 1; i < args.length; i++) {
			args[i] -= 0;
			if (isNaN(args[i])) {
				throw new Error("Invalid argument to " + (extreme ? "math.max" : "math.min"));
			}
	
			if (extreme) {
				if (result < args[i]) {
					result = args[i];
				}
			} else {
				if (result > args[i]) {
					result = args[i];
				}
			}
		}
	
		return result;
	},

	/**@Deprecated. This API returns the minimum value among the arguments.*/
	min: function () {
		return kony.math.findExtreme(false, arguments);
	},

	/**@Deprecated. This API returns the maximum value among the arguments.*/
	max: function () {
		return kony.math.findExtreme(true, arguments);
	},

	/**@Deprecated. This API returns the square root of the given number.*/
	sqrt: function (num) {
		
		num -= 0;
		if (isNaN(num)) {
			throw new Error("Invalid argument to math.sqrt");
		}
		var result = Math.sqrt(num);
		return isNaN(result) ? "nan" : result;
	}
}

/**The string Library has APIs that you can use to manipulate strings. The kony.string name space provides static string APIs. These static APIs augment the APIs in the Global string object which is available by default. For more information refer, https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/string.*/
kony.string = {

/**@Deprecated This API finds the first occurrence of the search string in the source string. */
    find : function () {
		if (arguments.length < 2) {
			throw new Error("string.find needs atleast two arguments");
		}
	
		for (var i = 0; i < 2; i++) {
			if (typeof(arguments[i]) === "number") {
				arguments[i] = arguments[i].toString();
			} else if (typeof(arguments[i]) !== "string") {
				throw new Error("Invalid argument(s) to string.find");
			}
		}
	
		var beginIndex = 0;
		if (arguments.length > 2) {
			beginIndex = arguments[2] - 0;
			if (!isNaN(beginIndex)) {
				if (beginIndex < 0) {
					beginIndex += arguments[0].length;
					if (beginIndex < 0) beginIndex = 0;
				}
			} else {
				beginIndex = 0;
			}
		}
	
		var result = arguments[0].indexOf(arguments[1], beginIndex - 1);
		if (-1 === result) {
			return null;
		} else {
			////result++;
			//return result, result + arguments[1].length - 1;
			return result;
		}
	},
	
	/**@Deprecated This API returns the length of the source string. */
	len: function (s) {
		if (0 === arguments.length) {
			throw new Error("string.len needs atleast one argument");
		}
		
		if (typeof(s) === "number") {
			s = s.toString();
		} else if (typeof(s) !== "string") {
			throw new Error("Invalid argument to string.len");
		}

		return arguments[0].length;
    },

	/**@Deprecated This API compares the contents of two strings numerically. For example, "Adam" is smaller than "adam" as per the ASCII table because A(65) is smaller than a(97). */
    compare: function (s1, s2) {
		if (arguments.length < 2) {
			throw new Error("string.compare needs atleast two arguemnts");
		}
			
		if (typeof(s1) == "string" && typeof(s2) == "string") {
			if (s1 < s2) {
				return -1;
			} else if (s1 == s2) {
				return 0;
			} else {
				return 1;
			}
		} else {
			throw new Error("Invalid argument(s) to string.compare");
		}
    },

    /**@Deprecated This API returns a string which contains a single character from the source string at the specified index. */
	charat: function (s1, index) {
		if (arguments.length < 2) {
			throw new Error("string.charat needs atleast two arguments");
		}
	
		if (typeof(s1) === "number") {
			s1 = s1.toString();
		} else if (typeof(s1) !== "string") {
			throw new Error("Invalid argument to string.charat");
		}
	
		index -= 0;
		if (isNaN(index)) {
			throw new Error("Invalid argument to string.charat");
		}
	
		////index--;
		if (index < 0 || index >= s1.length) {
			return null;
		}
	
		return s1.charAt(index);
    },

    flipCase: function(args, flag) {
	    if (0 === args.length) {
	            throw new Error(flag ? "string.upper" : "string.lower" + " needs atleast one argument");
	    }
	
	    if (typeof(args[0]) !== "string") {
	            throw new Error("Invalid argment to " + flag ? "string.upper" : "string.lower");
	    }
	
	    if (flag) {
	            return args[0].toUpperCase();
	    } else {
	            return args[0].toLowerCase();
	    }
    },
	/**@Deprecated This API changes the upper case characters of the source string to lower case characters. */
	lower: function () {
		return kony.string.flipCase(arguments, false);
	},
/**@Deprecated This API changes the lower case characters of the source string to upper case characters.*/
	upper: function () {
		return kony.string.flipCase(arguments, true);
	},

	/**This API generates a string which is equivalent to "n copies of the source string concatenated together".*/
	rep: function (s,n) {
		if (arguments.length < 2) {
			throw new Error("Insufficient arguments to string.rep");
		}
	
		if (typeof(s) === "number") {
			s = s.toString();
		} else if (typeof(s) !== "string") {
			throw new Error("Invalid argument to string.rep");
		}
	
		n -= 0;
		if (isNaN(n)) {
			throw new Error("Invalid argument to string.rep");
		}
	
		var resultStr = "";
		for (var i = 0; i < n; i++) {
			resultStr += s;
		}
	
		return resultStr;
	},
	
	/**This API reverses the characters in the source string.*/
	reverse: function (s) {
		if (0 === arguments.length) {
			throw new Error("string.reverse needs atleast one argument");
		}
	
		if (typeof(s) === "number") {
			s = s.toString();
		} else if (typeof(s) !== "string") {
			throw new Error("Invalid argument to string.reverse");
		}
	
		var resultStr = "";
		for (var i = s.length - 1; i >= 0; i--) {
			resultStr += s.charAt(i);
		}
	
		return resultStr;
	},
	/**This API removes the leading and ending spaces from the source string.*/
	trim: function (s) {
        if (0 === arguments.length) {
              throw new Error("string.trim needs atleast one argument");
        }

        if(s === undefined) {
              return s;
        }    
        else if (typeof(s) !== "string") {
              return s.toString();
              //throw new Error("Invalid argument to string.trim");
        }
 
        return s.replace(/^\s*/, "").replace(/\s*$/, "");
  },
	/**Determines whether two strings contain the same data, ignoring the case of the letters in the String. */
	equalsIgnoreCase: function (s1, s2) {
		if (arguments.length < 2) {
			throw new Error("string.equalsIgnoreCase needs atleast two arguments");
		}
	
		if (typeof(s1) !== "string" || typeof(s2) !== "string") {
			throw new Error("Invalid argument(s) to string.equalsIgnoreCase");
		}
	
	    return (s1.toLowerCase() === s2.toLowerCase());
	},
	
	equals: function (s1, s2) {
		if (arguments.length < 2) {
			throw new Error("string.equals needs atleast two arguments");
		}
	
		if (typeof(s1) !== "string" || typeof(s2) !== "string") {
			throw new Error("Invalid argument(s) to string.equals");
		}
	
		return (s1 === s2);
	},
	
	matchEnds: function (args, end) {
		if (args.length < 2) {
			throw new Error(end ? "string.endsWith" : "string.startsWith" +
									" needs atleast two arguments");
		}
	
		if (typeof(args[0]) !== "string" || typeof(args[1]) !== "string") {
			throw new Error("Invalid argument(s) to " + end ? "string.endsWith" : "string.startsWith");
		}
	
		if (!(args.length > 2 && (args[2] === false || args[2] === null))) {
			args[0] = args[0].toLowerCase();
			args[1] = args[1].toLowerCase();
		}
	
	    if (end) {
	    	var ll = args[0].lastIndexOf(args[1]);
	    	if(ll < 0){
	    		return false;
	    	}else{
	        	return (args[0].lastIndexOf(args[1]) === args[0].length - args[1].length);
	        }
	    }
	    else {
	        return (args[0].indexOf(args[1]) === 0);
	    }
	},
	/**This API returns a boolean value indicating if the source string begins with the specified string. */
	startsWith: function (sourcestring, comparestring, ignorecase) {
		return kony.string.matchEnds(arguments, false);
	},
	/**This API returns a boolean value indicating if the source string ends with the specified string. */
	endsWith: function (sourcestring, comparestring, ignorecase) {
		return kony.string.matchEnds(arguments, true);
	},
	/**@Deprecated This API splits the source string based on the separator (default is comma) and returns a table containing the string. */
	split: function (s, sep) {
		if (0 === arguments.length) {
			throw new Error("string.split needs atleast one argument");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument to string.split");
		}
	
		var delim;
		if (arguments.length > 1) {
			if (typeof(sep) !== "string") {
				throw new Error("The optional delimitor for string.split must be a string");
			}
	
			delim = sep;
		} else {
			delim = ",";
		}
		
		var splitstr = new Array();
		
		if(delim == "") {
			splitstr[1] = s;
		} else {
			splitstr = s.split(delim);
			splitstr.unshift(null); //To match lua Array indexing.
		}
		return splitstr;
	},
	/**@Deprecated This API returns the substring of the source string. */
	sub: function () {
		function getIndex(i, len) {
			if (typeof(i) === "string") {
				i -= 0;
			} else if (typeof(i) !== "number") {
				throw new Error("Invalid argument to string.sub");
			}
	
			if (i < 0) {
				////return (i + len + 1);
				return( i + len - 1);
			} else if (i > len) {
				return len;
			}
	
			return i;
		}
	
		function adjustIndex(i) {
			if (i > 0) {
				return i - 1;
			} else {
				return 0;
			}
		}
	
		if (arguments.length < 2) {
			throw new Error("string.sub needs atleast two arguments");
		}
		
		var args = [];
		for(var i=0; i < arguments.length; i++) {
			args[i] = arguments[i];		
		}
	
		if (typeof(args[0]) === "number") {
			args[0] = args[0].toString();
		} else if (typeof(args[0]) !== "string") {
			throw new Error("Invalid argument to string.sub");
		}
	
		var startIndex = getIndex(args[1], args[0].length);
		var endIndex = args[0].length;
		if (args.length > 2) {
			endIndex = getIndex(args[2], args[0].length);
		}
	
		if (endIndex < startIndex || (0 === startIndex && endIndex === startIndex)) {
			return "";
		} else {
			////startIndex = adjustIndex(startIndex); endIndex = adjustIndex(endIndex);
			return args[0].slice(startIndex, endIndex + 1);
		}
	},
	/**@Deprecated This API finds and replaces the occurrences of a string in the source string with a string you specify. */
	replace: function (s, f, rep) {
		if (arguments.length < 3) {
			throw new Error("string.replace needs atleast three arguments");
		}
	
		if (typeof(s) !== "string" || typeof(f) !== "string" ||
			typeof(rep) !== "string") {
			throw new Error("Invalid argument(s) to string.replace");
		}
	
		//return [s.replace(f, rep)];
	
		// Replace all occurrences
	    //var exp1 = new RegExp(f, "g");
		var exp1 = new RegExp(kony.string.escapeRegExp(f), "g");
	    return (s != "" && f == "") ? s : s.replace(exp1, rep);
	},
	/*
	format: function (args) {
		if (0 === args.length) {
			throw new Error("string.format needs atleast one argument");
		}
	
		if (typeof(args[0]) === "number") {
			return args[0].toString();
		} else if (typeof(args[0]) === "string") {
			var toks = args[0].split(/(%[f,s,b])/);
	
			var flag = false;
			var result = "";
			for (var i = 0, j = 1; i < toks.length; i++) {
				if ("%f" === toks[i] || "%s" === toks[i] || "%b" === toks[i]) {
					if (j === args.length) {
						throw new Error("Insufficient number of arguments to string.format");
					}
	
					if ("%f" === toks[i]) {
						var num = args[j] - 0;
	
						if (isNaN(num)) {
							throw new Error("Invalid argument to string.format");
						}
	
						result += num;
					} else if ("%s" === toks[i]) {
						result += args[j].toString();
					} else if ("%b" === toks[i]) {
						if (args[j] === false || args[j] === null) {
							result += "false";
						} else {
							result += "true";
						}
					}
	
					j++;
				} else {
					result += toks[i];
				}
			}
	
			return result;
		} else {
			throw new Error("Invalid first argument to string.format");
		}
	}, */
	/** This API verifies if the input string contains only ASCII alphabet characters and returns a boolean value. */
	isAsciiAlpha: function (s) {
	
		if (arguments.length === 0) {
			throw new Error("string.isAsciiAlpha needs atleast 1 argument");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument(s) to string.isAsciiAlpha");
		}
	
		var regexp = new RegExp("[^a-zA-Z]","g");
	    return (s == "") ? false : !(regexp.test(s));	
	},
	/** This API verifies if the input string contains only ASCII alphabet characters and numbers, and returns a boolean value.*/
	isAsciiAlphaNumeric: function (str) {
	
		if (arguments.length === 0) {
			throw new Error("string.isAsciiAlphaNumeric needs atleast 1 argument");
		}
		var p1 = /[^a-zA-Z0-9]/i;	// Elimimate non alpha numeric chars //Added cap letters also 
		var p2 = /^[a-zA-Z0-9]*$/i; /* Wrong regex   /([a-z]+[0-9])|([0-9]+[a-z])/i; */
		var r1 = str.match(p1);
		var r2 = str.match(p2);	
		return (!r1 && r2 && str) ? true : false;	
	},
	
	/** This API verifies if the input string contains only numeric characters, and returns a boolean value.*/
	isNumeric: function (s) {
		if (arguments.length === 0) {
			throw new Error("string.isNumeric needs atleast 1 argument");
		}
	
		/*if (typeof(args[0]) !== "string") {
			throw new Error("Invalid argument(s) to string.isNumeric");
		}*/
	
	    return (s == "" || (typeof(s) == "string" && s.replace(/\s/g,'').length == 0)) ? false : !(isNaN(s));
	},
	/** This API verifies if any one of the specified set of characters is available in the given string and returns a boolean value.*/
	containsChars: function (s, a) {
		if (arguments.length === 0) {
			throw new Error("string.containsChars needs 2 arguments");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument(s) to string.containsChars");
		}
	
		if (a instanceof Array === false) {
			throw new Error("Invalid argument to table.containsChars");
		}
	
		var charset = [];
		var charstr = "";
		var chararray = a;
		var len = chararray.length;
		var result = false;
	
		for(var i=0; i<len; i++) {
			charset[i] = chararray[i];
			if(s == "" || charset[i] == "") return true;
		}
	
		charstr = charset.join("");
		charstr = "[" + kony.string.escapeRegExp(charstr) + "]";
	
		var regexp = new RegExp(charstr,"g");
		result = regexp.test(s);
	
		return result;
	},
	/** This API verifies if only (and only) the specified set of characters is available in the given string and returns a boolean value.*/
	containsOnlyGivenChars: function (s, a) {
		if (arguments.length === 0) {
			throw new Error("string.containsOnlyGivenChars needs atleast 1 argument");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument(s) to string.containsOnlyGivenChars");
		}
	
		var charset = [];
		var charstr = "";
		var chararray = a;
		var len = chararray.length;
		var result = false;
	
		for(var i=0; i<len; i++) {
			charset[i] = chararray[i];
		}
	
		charstr = charset.join("");
		//charstr = charstr.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		charstr = "[^" + kony.string.escapeRegExp(charstr) + "]";
	
		var regexp = new RegExp(charstr,"g");
		result = regexp.test(s);
	
		if(result === false) {
			return true;
		} else {
			return false;
		}	
	},
	/** This API verifies that the input string does not contain any of the specified characters and returns a boolean value.*/
	containsNoGivenChars: function (s, a) {
		if (arguments.length === 0) {
			throw new Error("string.containsNoGivenChars needs 2 arguments");
		}
	
		if (typeof(s) !== "string") {
			throw new Error("Invalid argument(s) to string.containsNoGivenChars");
		}
	
		if (a instanceof Array === false) {
			throw new Error("Invalid argument to table.containsNoGivenChars");
		}
	
		var charset = [];
		var charstr = "";
		var chararray = a;
		var len = chararray.length;
		var result = false;
	
		for(var i=0; i<len; i++) {
			charset[i] = chararray[i];
			if(charset[i] == "") return false;
		}
	
		charstr = charset.join("");
		charstr = "[" + kony.string.escapeRegExp(charstr) + "]";
	
		var regexp = new RegExp(charstr,"g");
		result = regexp.test(s);
	
		if(result === false) {
			return true;
		} else {
			return false;
		}	
	},
	/** This API verifies if the input string is a valid email address and returns a boolean value.*/
	isValidEmail: function (s) {
		if (arguments.length === 0)
			throw new Error("string.isValidEmail needs atleast 1 argument");
	
		var value = s;
		if (typeof(value) !== "string")
			return false;
		//(99.9% syntactic accuracy)
		var emailPattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
		if((value.length - value.lastIndexOf('.')) < 3){
			return false;
		}

		return emailPattern.test(value);
	},
	
	escapeRegExp: function (text)
	{
	    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
}

/**@Deprecated This library provides generic functions for table manipulation. It provides all its functions inside the table.

Most functions in the Table library assume that the table represents an array or a list. For these functions, when we talk about the "length" of a table we mean the result of the length operator.

Note: This library is also available in JavaScript under the namespace kony.table. This is only for maintaining the backward compatibility for the application converted from Lua to JavaScript.*/
kony.table = {
/**@Deprecated This API extracts all the elements of a table and concatenates the elements to form a string. A separator can be specified which can be placed between concatenated elements.*/
	concat: function(inputtable, separator, startposition, endposition) {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var result = null;
	    
	    if (!arguments[0] instanceof Object) 
	        isArgsError = true;
	    if (!isArgsError) {
	        var len = arguments[0].length;
	        var begin = 0, end = len, sep = "";//4901
	        var numArgs = arguments.length > 4 ? 4 : (arguments.length - 1);
	        switch (arguments.length) {
	            case 4:
	                arguments[3] -= 0;
	                if (isNaN(arguments[3])) {
	                    isArgsError = true;
	                }
	                end = arguments[3];
	            case 3:
	                arguments[2] -= 0;
	                if (isNaN(arguments[2]) || arguments[2] < 0) {
	                    isArgsError = true;
	                }
	                begin = arguments[2];
	            case 2:
	                sep = arguments[1];
	            default:
	                break;
	        }
	        
	        if (len == 0) 
	            return kony.table.returnResult("", isArgsError, isInternalError);
	        
	        if (isArgsError) 
	            return kony.table.returnResult(result, isArgsError, isInternalError);
	        
	        if (begin > end) {
	            //isArgsError = true; // return empty string -- lua std
				return kony.table.returnResult("", isArgsError, isInternalError);
	        }
	        else 
	            if (end > len) {
	                isArgsError = true;
	            }
	            else 
	                if (!isArgsError) {
	                    result = "";
	                    try {
	                        for (var i = begin; i < end; i++) {
								if(arguments[0][i] == null || arguments[0][i] instanceof Object) 
									return kony.table.returnResult(null, true, isInternalError);   
	                            result += arguments[0][i].toString() + sep;
	                        }
	                        result += arguments[0][i].toString();
     
	                    } 
	                    catch (e) {
	                        isInternalError = true;
	                    }
	                }
	    }
	    return kony.table.returnResult(result, isArgsError, isInternalError);
	},
	
	/*maxn: function(args) {
	    if (0 === arguments.length) {
	        throw new Error("table.maxn needs atleast one argument");
	    }
	    
	    if (args[0] instanceof LuaTable === false) {
	        throw new Error("Invalid argument to table.maxn");
	    }
	    
	    var maxIndex = args[0].arrayContainer.length - 1;
	    for (var obj in args[0].hashContainer) {
	        var key = args[0].hashContainer[obj].key;
	        if (args[0].hashContainer[obj].value !== null &&
	        typeof(key) === "number" &&
	        maxIndex < key) {
	            maxIndex = key;
	        }
	    }	    
	    return maxIndex;
	},*/
	/**@Deprecated This API inserts a specified value into the given table in the list part. If a position is specified, the value is inserted before the element currently at that position. If no position is specified, the value is appended to the end of the table. If the specified position is not within the range of the list part of the table, the new element is added to the hash part of the table.*/
	insert: function(inputtable, position, value) {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var result = null;	
	    
	    if (arguments.length < 2 || !(arguments[0] instanceof Object)) {
	        isArgsError = true;
	    }
	    
	    if (!isArgsError) {
	    
	        var pos, newItem;
	       // var arr = arguments[0];	
	        if (arguments.length > 2) {  
			    pos = arguments[1];      
	            if (typeof pos == "string" || isNaN(pos)) {                
	                return kony.table.returnResult(true, isInternalError);            
				}            
	            newItem = arguments[2];
	        }
	        else {
	            pos = arguments[0].length;
	            newItem = arguments[1];
				/*if(args[1] == null) // don't insert nil at the end of table -- lua std 
					return kony.table.returnResult(args[0], isArgsError, isInternalError);*/
	        }
	        
	        try {      
					if (typeof pos == "string" || pos >= arguments[0].length || pos <= 0) {
						if (pos == 0) {	
							//DEF 3809
							arguments[0].splice(pos,0,newItem);						
							//arguments[0][pos] = newItem;
						}
						else {
							arguments[0][pos] = newItem;
						}
	                }
	                else{
	                 /*   var pre = arguments[0].slice(0, pos);
	                    var post = arguments[0].slice(pos);
	                    pre.push(newItem);
	                    arguments[0] = pre.concat(post);*/
						arguments[0].splice(pos,0,newItem);
	                }		
					//arguments[0] = arr;		
	        } 
	        catch (e) {
	            isInternalError = true;
	        }
	    }
	    return kony.table.returnResult(isArgsError, isInternalError);
	},
		/**@Deprecated This API removes an element from the list part of the table. If a position is specified, the element at the position is removed. If no position is specified, the last element in the table is removed. The removed element is returned. This API operates only on the list part of the table.*/
	remove: function(inputtable, position) {
	
	    var isArgsError = false;
	    var result = null;
	    
	    if (0 === arguments.length || !(arguments[0] instanceof Array)) {
	        isArgsError = true;
	    }
	    
		if (!isArgsError) {
			var pos = arguments[0].length - 1 ;
			if (pos >= 0) {
				if (arguments.length > 1 && arguments[1] != null) {
					arguments[1] -= 0;
					if (isNaN(arguments[1]) || arguments[1] > pos || arguments[1] < 0) {
						isArgsError = true;
						return kony.table.returnResult(result, isArgsError, false);
					}
	
					if (arguments[1] < pos && arguments[1] >= 0) {
						pos = arguments[1]   //-1;//5.0 Decremented
					}
				}
				result = arguments[0].splice(pos, 1);
				result = result[0] ;
				/*for(var i=pos;i > 0;i--){
					result = args[0].arrayContainer.splice(i, 1);
					if(result[0] == null && i == args[0].length()+1)
						continue;
					else
						break;				
				}*/
			}
			else
	    		  return kony.table.returnResult(null, isArgsError, false);
		}
	    return kony.table.returnResult(result, isArgsError, false);
	},
	
/**@Deprecated This API sorts the elements of the input table and returns the modified table. This API sorts only the list part of the table and the hash part of the table is ignored.*/
	sort: function(inputtable, sortkey, comparisonfunction) {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var result = null;
	    var comparator = null;
		
	    
	   if (0 === arguments.length || !(arguments[0] instanceof Array)) {
	        isArgsError = true;
	    }
	    
	    if (typeof(arguments[1]) == "function") {
			comparator = arguments[1];
		}
		else 
			if (typeof(arguments[2]) == "function") {
				comparator = arguments[2];
			}
	    
	    if (!isArgsError) {
	    	var len = arguments[0].length;
			var pre = arguments[0];

			if(arguments[0].length < 2){
				//Can't do aything. Need more than one element to sort
				return kony.table.returnResult(inputtable,false,false);
			}
			
	        try {        
	            for (var i = 0; i < len; i++) { //5.0 Decremented i
	                var elemType = typeof(arguments[0][1]);
	                if (arguments[0][i] == null || typeof(arguments[0][i]) != elemType) {
	                	
	                    return kony.table.returnResult(true, isInternalError);
	                }                
	            }
	            
	           // pre = arguments[0].slice(1);
	            //var zeroth = arguments[0].shift();
				
				//This is to splice the array to the length to which it has to be sorted
				if(arguments[1] !== null && !isNaN(arguments[1]))						
					pre.splice(arguments[1],pre.slice(arguments[1],pre.length).length);
					
	            if (comparator) {
	                pre.sort(function(a, b){
	                    var retVals = comparator(a, b);
	                    
	                    return (retVals ? -1 : 1);
	                });
	            }
	            else 
	                if (typeof arguments[1] == "string") {
	                    comparator = arguments[1];
	                    pre.sort(function(a, b){
	                        if (a[comparator] != null && typeof a[comparator] == typeof b[comparator] && typeof a[comparator] == "string") {
	                                var nameA = a[comparator].toLowerCase(), nameB = b[comparator].toLowerCase()
	                                if (nameA < nameB) //sort string ascending
	                                    return -1
	                                if (nameA > nameB) 
	                                    return 1
	                                return 0 //default return value (no sorting)				
	                            }
	                            else {
	                                return a[comparator] - b[comparator];
	                            }
	                    });
	                }
	                else {	
	                    pre.sort(function(a, b){
	                        if (typeof a == "string") {
	                            var A = a.toLowerCase();
	                            var B = b.toLowerCase();
	                            if (A < B) {
	                                return -1;
	                            }
	                            else 
	                                if (A > B) {
	                                    return 1;
	                                }
	                                else {
	                                    return 0;
	                                }
	                        }
	                        else 
	                            return a - b;
	                        
	                    });
	                    
	                }
	           // pre.unshift(zeroth);
	           // pre = pre.concat(arguments[0]);
	        } 
	        catch (e) {
	            isInternalError = true;
				pre = null;
	        }
	    }
	    if (!isArgsError && !isInternalError)        
	   		 return kony.table.returnResult(pre, isArgsError, isInternalError);
		else 
			return kony.table.returnResult(true, isInternalError);
	},
/**@Deprecated This API filters the given table based on the provided criteria and returns a set of values that match the given criteria.*/
	filter: function(srctable, mapfunc) {
	
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var tgttable;
	    
	    if (arguments.length < 2 || !(srctable instanceof Object)  || !(typeof(mapfunc)  == "function")) {
	        isArgsError = true;
	    }
		
	    if (!isArgsError) {
	        
	        var key, value, retVals;
	        
	        if ((srctable instanceof Array)  && mapfunc) {
				try {
					tgttable = [];
					for (var i = 0; i < srctable.length; i++) {//5.0 Decremented i
						value = srctable[i];
						if (value instanceof Object) {
							/*var innerLen = value.length();
							 var innerValue;
							 var count = 0;
							 for (var k = 0; k < innerLen; k++) {
							 innerValue = value.arrayContainer[k + 1];
							 retVals = executeClosure(mapfunc, [k + 1, innerValue]);
							 if (retVals[0] == true)
							 count++;
							 }
							 if (count == innerLen)
							 tgttable.arrayContainer.push(value);*/
							return kony.table.returnResult(null, true, isInternalError);
						}
						else {
						
							if (value != null) 
								retVals = mapfunc(i, value);
							if (retVals === true) 
								tgttable.push(value);
							retVals = false;
						}
						
					}
				} 
				catch (e) {
					isArgsError = true;
				}
			}
			else 
				if (srctable && mapfunc) {
					tgttable = new Object();
					
					try {
						for (var j in srctable) {
							key = j
							value = srctable[j];
							if (value != null) 
								retVals = mapfunc(j, value);
							if (retVals === true) {
								tgttable[key] = value;
							}
							retVals = false;
						}
					} 
					catch (e) {
						isArgsError = true;
					}
				}
	    }
	    
	    if (isArgsError || isInternalError) 
	        tgttable = null;
	    
	    return kony.table.returnResult(tgttable, isArgsError, isInternalError);
	},
	/**@Deprecated This API performs the given action on the input table and returns the modified table.*/
	map : function(srctable, mapfunc) {
	
	    var isArgsError = false;
	    var isInternalError = false;
		
	    if (arguments.length < 2 || (srctable instanceof Object === false) || !(typeof(mapfunc) == "function")) {
	        isArgsError = true;
	    }
	    
	    if (!isArgsError) {
	    	
			try {
					
				var key, value, retVals;
					
				if (srctable instanceof Array && mapfunc) {
					var len = srctable.length;
					
					for (var i = 0; i < len; i++) {//5.0 Decremented i
						if (srctable[i] instanceof Array || srctable[i] == null) {
							return kony.table.returnResult(true, isInternalError);
						}
					}
					
					try {
						for (var i = 0; i < len; i++) {//5.0 Decremented i
							value = srctable[i];
							retVals = mapfunc(i, value);
							if (retVals !== false) {
								key = retVals[0];
								value = retVals[1];
								srctable[key] = value;
								retVals = false;
							}
							else 
								return kony.table.returnResult(true, isInternalError);
						}
					} 
					catch (e) {
						isArgsError = true;
					}
				} else	
					if (srctable && mapfunc) {
						
						try {
							for (var j in srctable) {
								key = j;
								value = srctable[key];
								retVals = mapfunc(key, value);
								
								if (retVals !== false) {
									key = retVals[0];
									value = retVals[1];
									srctable[key] =  value;
									retVals = false;
								}
								else 
									return kony.table.returnResult(true, isInternalError);
							}
						} 
						catch (e) {
							isArgsError = true;
						}
					}
			}
			catch(e){
				isInternalError = true;
			}
	    }
	    //srctable added for JSPFQA5653
	    return kony.table.returnResult(srctable, isArgsError, isInternalError);
	    
	},
	/**@Deprecated This API performs the given action on the input table and returns a new table.*/	
	mapNew: function(srctable, mapfunc){
	
	    var isArgsError = false;
	    var isInternalError = false;
	    
	    if (arguments.length < 2 || (srctable instanceof Object === false) || !(typeof(mapfunc) == "function")) {
	        isArgsError = true;
	    }
		
		if(srctable == null)
			return kony.table.returnResult(null, isArgsError, isInternalError);
	    
		try {
			
			var tgttable = null;   
			var key, value, retVals;
			
			if (!isArgsError) {
						
				if (srctable instanceof Array && mapfunc) {
					var len = srctable.length;
				
					for (var i = 0; i < len; i++) {//5.0 Decremented i
						if (srctable[i] instanceof Object || srctable[i] == null) {
							return kony.table.returnResult(null, true, isInternalError);
						}
					}
					
					try {
						
						tgttable = []; 
						for (var i = 0; i < len; i++) {//5.0 Decremented i
							value = srctable[i];
							retVals = mapfunc(i, value);
							key = retVals[0];
							value = retVals[1];
							tgttable[key] = value;
						}
					} 
					catch (e) {
						isArgsError = true;
					}
					
				} else
					if (srctable && mapfunc) {
				
						try {
							tgttable = new Object();
							for (var j in srctable) {
								key = j;
								value = srctable[key];
								retVals = mapfunc(key, value);
								
								if (retVals !== false) {
									key = retVals[0];
									value = retVals[1];
									tgttable[key] =  value;
									retVals = false;
								}
								else 
									return kony.table.returnResult(true, isInternalError);
							}
						} 
						catch (e) {
							isArgsError = true;
						}
					}
				}	
		}
	    catch (e) {
			isInternalError = true;
		}
					
	    if (isArgsError || isInternalError) 
	        tgttable = null;
	    return kony.table.returnResult(tgttable, isArgsError, isInternalError);
	    
	},
/**@Deprecated This API searches the given input table and returns the value at the specified key; if the key is a number, this API returns the value at the index.*/	
	get: function(srctable, key) {
	
	    var isArgsError = false;
	    var isInternalError = false;
		var invalidKey = false;
	    var result = null;
	    
		//TODO:Error Check
	    if (arguments.length < 2 || srctable instanceof Object === false || key == null) {
	        isArgsError = true;
	        return kony.table.returnResult(result, isArgsError, isInternalError);
	    }
	
	    try {
	        if (key in srctable) {
	            result = srctable[key];				
	        } else 
			  invalidKey = true;
	    } 
	    catch (e) {
	        isInternalError = true;
	    }
		
	    return kony.table.returnResult(result, isArgsError, isInternalError, invalidKey);
	},
/**@Deprecated Tests if the specified key is part of the table.*/	
	contains: function(srctable, key) {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    var result = false;
	    
	    if (arguments.length < 2 || srctable instanceof Object === false || key == null) {        
	        return kony.table.returnResult(result, true, isInternalError);
	    }
	    
	    try {
			 if (key in srctable) 
            	result = true;				        
	    } 
	    catch (e) {
	        isInternalError = true;
	    }
	    return kony.table.returnResult(result, isArgsError, isInternalError);
	},
/**@Deprecated This API appends the content of the source table to the target table and returns the modified target table.*/	
	append: function(tgttable, srctable) {
	
	    var isArgsError = false;
	    var isInternalError = false;
	    
	    if (arguments.length != 2 || !(tgttable instanceof Object) || !(srctable instanceof Object)) {
	        isArgsError = true;
	        return kony.table.returnResult(null, isArgsError, isInternalError);
	    }
	      
	    try {
	        if (tgttable.length && srctable.length) {
	          ////  var srcarray = srctable.slice(1);   //4906
				for (var i = 0; i < srctable.length; i++) {
					tgttable.push(srctable[i]);
				}
	        } else {
	                    
	            for (var j in srctable) {
	                tgttable[j] = srctable[j];
	            }
	        }
	    } 
	    catch (e) {
	        isInternalError = true;
	    }
	
	    return kony.table.returnResult(tgttable, isArgsError, isInternalError);
	},
	/**@Deprecated This API removes data from the table represented by the table id.*/	
	removeAll: function(srctable) {
	
	    if (arguments.length < 1) {
	        throw new Error("table.removeAll needs atleast 1 argument");
	    }
	    
		//TODO:Proper error function to distinguish between table (object) & other types
	    if (typeof(srctable) != "object") {
	        throw new Error("Invalid  arguments to table.removeAll");
	    }
	    
		if(srctable.length)
	    	srctable.length = 0;
		else {
			for (var key in srctable) {
				delete srctable[key];
			}
		}
	    
	    return;
	},
	
	/**@Deprecated unpack

This API returns the elements from the given table. This function is equivalent to

return list[i], list[i+1], .... list[j].*/	
	unpack: function (t1) {
       
	    if (0 === arguments.length) {
                throw new Error("unpack needs atleast one argument");
        }

        if (t1 instanceof Object === false) {
                throw new Error("Invalid first argument to unpack");
        }

        var numArgs = arguments.length > 3 ? 3 : arguments.length;
        var maxIndex = arguments[0].length;
        var beginIndex = 0 /*5.0 Decremented beginIndex*/, endIndex = maxIndex;
        switch (numArgs) {
                case 3:
                        arguments[2] -= 0;
                        if (isNaN(arguments[2])) {
                                throw new Error("Invalid argument to unpack");
                        }
                        endIndex = arguments[2];
                case 2:
                        arguments[1] -= 0;
                        if (isNaN(arguments[1])) {
                                throw new Error("Invalid argument to unpack");
                        }
                        beginIndex = arguments[1];
                default:
                        break;
        }

        if (beginIndex > endIndex) {
                return [""];
        } else {
                var retVals = "";//[];		//4907		
                for (var i = beginIndex; i < endIndex; i++) {
                        //retVals.push(arguments[0][i]);
                        if(i == 0){
                        	retVals = arguments[0][i];
                        }else{
                        	retVals = retVals + " " + arguments[0][i];
                        }
                }
                return  retVals;
        }
	},

	// local myjson = '{ "name": "Shasank", "id": "417" }'
	// table.parsejson(myjson)
	/*parsejson: function(args){
	
	    if (arguments.length < 1) {
	        throw new Error("table.parsejson needs atleast 1 argument");
	    }
	    
	    var jsObj = args[0].evalJSON();
	    
	    try {
	        var tgttable = kony.utils.json2LuaTable(jsObj);
	    } 
	    catch (e) {
	        throw new Error("table.parsejson - SyntaxError: Badly formed JSON string");
	    }
	    
	    return tgttable;
	},*/

	/*keys: function(args){
	
	    if (arguments.length < 1) {
	        throw new Error("table.keys needs atleast 1 argument");
	    }
	    
	    if (args[0] instanceof LuaTable === false) {
	        throw new Error("Invalid  arguments to table.keys");
	    }
	    
	    var srctable = args[0];
	    
	    if (srctable.hashKeys.length) {
	    
	        var innerlen = srctable.hashKeys.length;
	        var key;
	        var keysarray = [];
	        for (var j = 0; j < innerlen; j++) {
	            key = srctable.hashKeys[j];
	            keysarray.push(key);
	        }
	        
	        return keysarray;
	    }
	},*/

	returnResult: function() {
	
	    var errorNo = null;
	    var errorMsg = null;
		var isArgsError = false;
		var isInternalError = false;
		
		if (arguments.length >= 3) {
			
			var retArray = arguments[0];
			isArgsError = arguments[1];
			isInternalError = arguments[2];
			var invalidKey = arguments[3];		
		}
		else{
			isArgsError = arguments[0];
			isInternalError = arguments[1];
		}
	    if(isArgsError) {
	        errorNo = 100;
	        errorMsg = "INVALID ARGUMENTS";
	    }
	    else if(isInternalError){
	            errorNo = 101;
	            errorMsg = "INTERNAL ERROR";
	    }
	    else if(invalidKey){
	                errorNo = 0;
	                errorMsg = "INVALID KEY";
		}	
		if (arguments.length >= 3) 			
	    	//return ([retArray, errorNo, errorMsg]);
			return retArray;
		else if(arguments.length == 2 && (isArgsError || isInternalError))
			return ([errorNo, errorMsg]);
		else	
			return;	
	}
}

/**@Deprecated This API returns the current time as a string in hh:mm:ss format. The time is represented in 12 hour format.*/
	kony.os.time = function () {
		var timeStr = (new Date()).toTimeString();
	
		return timeStr.slice(0, timeStr.indexOf(" "));
	};
	/**@Deprecated This API returns the number of seconds between the first input parameter (t1) to the second input parameter (t2).*/
	kony.os.diffDateTime = function (time1, time2) {
		
		if (typeof(time1) !== "string" || typeof(time2) !== "string") {
			throw new Error("Invalid argument(s) to os.diffDateTime");
		}
	
		var t1 = time1.split(":");t1[2] = t1[2] - 0;
		var t2 = time2.split(":");t2[2] = t2[2] - 0;
		var one_day = 86400;  
		var t1sec = t1[0] * 3600 + t1[1] * 60 + t1[2];
		var t2sec = t2[0] * 3600 + t2[1] * 60 + t2[2];	
	
		return (t1sec > one_day || t2sec > one_day ) ? null : t1sec - t2sec;
	};
	/**@Deprecated This API formats the current date to the given format.*/
	kony.os.date = function () {
			
		var result;
		var currentDate = new Date();
		    
	    if (0 === arguments.length) {
	        var timeStr = currentDate.toTimeString();
	        result = kony.os.padZero(currentDate.getMonth() + 1) + "/" + kony.os.padZero(currentDate.getDate()) + "/" + kony.os.padZero(currentDate.getFullYear() % 100) + " " + timeStr.slice(0, timeStr.indexOf(" "));
	        return result;
	    }
	    else if (typeof(arguments[0]) == "string") {        
	        
	        if (arguments[0].toLowerCase().indexOf("dd") != -1) {        
			
	            return kony.os.formatdate(arguments[0], currentDate);            
	        }
	         else {
	                var utc = arguments[0].charAt(0) === '!';
	                var index = utc ? 1 : 0;
	                if ('*' === arguments[0].charAt(index) && 't' === arguments[0].charAt(index + 1)) {
	                    var day = utc ? currentDate.getUTCDate() : currentDate.getDate();
	                    var mon = (utc ? currentDate.getUTCMonth() : currentDate.getMonth()) + 1;
	                    var year = utc ? currentDate.getUTCFullYear() : currentDate.getFullYear();
	                    
	                    result = new Object();
	                    result["year"] =  year;
	                    result["month"] = mon;
	                    result["day"] = day;
	                    result["hour"]  = utc ? currentDate.getUTCHours() : currentDate.getHours();
	                    result["min"] = utc ? currentDate.getUTCMinutes() : currentDate.getMinutes();
	                    result["sec"] = utc ? currentDate.getUTCSeconds() : currentDate.getSeconds();
	                    result["wday"] = utc ? currentDate.getUTCDay() : currentDate.getDay() + 1;
	                    result["yday"] = kony.os.getDayOfYear(day, mon, year);
	                    result["isdst"] = utc ? false : kony.os.checkForDst();
	                    return result;
	           	}
	           else 
	                    return null;
	            }
	      } else 
	          return null;
	};
/**This API allows you to convert the given number to represent currency. At present, only USA currency is supported.*/
	kony.os.toCurrency = function (arg) {
		
		arg -= 0;
		if (isNaN(arg)) {
			throw new Error("Invalid argument to os.toCurrency");
		}
	
		if (arg < 0) arg *= -1;
		var str = arg.toFixed(3);
		str = str.substr(0,str.length-1); 
		var outStr = "";
		for (var i = 0; i < str.length - 4; i++) {
			outStr += str.charAt(i);
			if ((str.length - i - 1) % 3 === 0) outStr += ",";
		}
	
		for (; i < str.length; i++) {
			outStr += str.charAt(i);
		}
	
		return "$" + outStr;
	};
	/**This API converts the argument to a number. If the argument is already a number or a string convertible to a number, then the API returns this number; otherwise, it returns null for JavaScript and nil for Lua.*/
	kony.os.toNumber = function (arg) {
		
		if (arguments.length != 1) {
			throw new Error("Invalid argument to os.toNumber");
		}
		
		if (typeof(arg) === "number") {
			return arg;
		} else if (typeof(arg) === "string") {	
			
			var str = arg.replace(/^\s*/, '').replace(/\s*$/, '');
			if (str === '') {
				return null;
			} else {
				var num = str - 0;
				return (isNaN(num) ? null : num);
			}
		
		} else {
			return null;
		}
	};
	/**@Deprecated This API returns the difference in dates or compares two dates for equality.*/
	//os.compareDates(date1,date2,"format") - dd,mm,yyyy,yy 
	kony.os.compareDates = function (d1, d2, frmt){
		
		if(d1 == null || d2 == null || frmt == null || !kony.os.isvaliddate(d1,frmt) || !kony.os.isvaliddate(d2,frmt))
			return null 
			
		var date1 = kony.os.getDate(d1, frmt);
		var date2 = kony.os.getDate(d2, frmt);
		var oneday = 24*60*60*1000;
		
		return parseInt((date1.getTime() - date2.getTime())/oneday);	
	};
/**@Deprecated This API adds or subtracts units (days, hours, minutes, month, or years) to the given date.*/
	//os.addToDate(date1,format,units,count) - units : days,hours,minutes,month,years
	// Format"dd/mm/yyyy" or "mm/dd/yyyy" or mm/dd/yy
	kony.os.addToDate = function (d1, frmt, unt, cnt){
		
		if (d1 == null || frmt == null || unt == null || cnt == null) {
			return null;
		}
		var inputDate = d1;
		var fmt = frmt;
		var unit = unt;
		var count = cnt;   
		var dateParts = inputDate.split("/");
		
		if(!kony.os.isvaliddate(inputDate,fmt))
			return null;
		
		var dateObj = kony.os.getDate(inputDate, fmt);
			
		if (dateObj) {
	        switch (unit) {
	            case "years":
	                dateObj.setFullYear(dateObj.getFullYear() + count);
	                break;
	            case "months":
	                dateObj.setMonth(dateObj.getMonth() + count);
	                break;
	            case "days":
	                dateObj.setDate(dateObj.getDate() + count);
	                break;
	            case "hours":
	                dateObj.setHours(dateObj.getHours() + count);
	                break;
	            case "minutes":
	                dateObj.setMinutes(dateObj.getMinutes() + count);
	                break;
	            default:
	                break;
	        }
			if(kony.os.isLeapYear([d1,fmt]) && dateObj.getMonth() >= 1 && (unit == "years" || (unit == "months" && (count == -12 || count == 12))) )
					dateObj.setDate(dateObj.getDategetDate() - 1);
			
			return kony.os.formatdate(fmt,dateObj);
			
		}		
		return null;
	};
	/**@Deprecated This API checks if the input year is a leap year.*/
	//os.isLeapYear(yyyy) 
	kony.os.isLeapYear = function (d1, frmt) {
		var year;
		var date = new Date();  //Take the current year;
		year = date.getFullYear();
		    
	    if (typeof(d1) == "string" && typeof(frmt) == "string") {
			
			if(!kony.os.isvaliddate(d1, frmt))
				return false;
				        
	        var yearPart = d1.split("/")[2];
	        year = (yearPart.length == 2) ? parseInt(date.getFullYear().toString().substr(0, 2) + yearPart) : parseInt(yearPart);
	    }
		
		if ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))) {
	 		return true;  		
	 	} 
		else {
	  		return false;
	 	} 		 
	};
/**@Deprecated This API converts a given date string to the target format and returns the formatted date. Format will use the tokens dd,mm,yyyy to indicate day, month, and year respectively. The delimiter used between the tokens can be any character. For example, dd/mm/yyyy and (dd)(mm)(yyyy) are valid inputs.*/
	//os.formatdate(inputdate[string],sourceformat[string],targetformat[string])
	kony.os.formatDate = function (d1, sfrmt, tgtfrmt) {
		
		var year;
		if(d1 == null || sfrmt == null || tgtfrmt == null) {
			return null;
		}
		else if(typeof(d1) === "string" && typeof(sfrmt) === "string" && typeof(tgtfrmt) === "string") {
			
	        var inputDate = d1
	        var srcfmt = sfrmt;
	        var targetfmt = tgtfrmt;
	        
	        var datePos = srcfmt.indexOf("dd");
	        var monthPos = srcfmt.indexOf("mm");
	        var yearPos = (srcfmt.indexOf("yyyy") != -1) ? srcfmt.indexOf("yyyy") : srcfmt.indexOf("yy");
	        
	        if ((srcfmt == "dd/mm/yyyy" && !kony.os.isvaliddate(inputDate, srcfmt)) || datePos == -1 || monthPos == -1 || yearPos == -1 || srcfmt.indexOf("ddd") != -1 || srcfmt.indexOf("mmm") != -1) {
	            return null;
	        }
	        
	        var dateStrSep = srcfmt.charAt(datePos - 1);
	        var dateEndSep = srcfmt.charAt(datePos + 2);
	        dateEndSep = (dateEndSep == "(") ? "" : dateEndSep;
	        
	        var monthStrSep = srcfmt.charAt(monthPos - 1);
	        var monthEndSep = srcfmt.charAt(monthPos + 2);
	        
	        var yearStrSep = srcfmt.charAt(yearPos - 1);
	        var yearEndSep = srcfmt.charAt(yearPos + 4);
	        
	        var startDateIndex = (dateStrSep == "") ? inputDate.indexOf(dateStrSep, datePos - 1) : inputDate.indexOf(dateStrSep, datePos - 2) + 1;
	        var startMonthIndex = (monthStrSep == "") ? inputDate.indexOf(monthStrSep, monthPos - 1) : inputDate.indexOf(monthStrSep, monthPos - 2) + 1;
	        var startYearIndex = (yearStrSep == "") ? inputDate.indexOf(yearStrSep, yearPos - 1) : ((inputDate.indexOf(yearStrSep, yearPos - 2) != -1) ? inputDate.indexOf(yearStrSep, yearPos - 2) + 1 : inputDate.indexOf(yearStrSep, yearPos - 4) + 1);
	        
	        var endDateIndex = (dateEndSep != "") ? inputDate.indexOf(dateEndSep, datePos) : inputDate.indexOf(dateEndSep, datePos + 2);
	        var endMonthIndex = (monthEndSep != "") ? inputDate.indexOf(monthEndSep, monthPos) : inputDate.indexOf(monthEndSep, monthPos + 2);
	        var endYearIndex = (yearEndSep != "") ? inputDate.indexOf(yearEndSep, yearPos) : inputDate.indexOf(yearEndSep, yearPos + 4);
	        
	        var dateVal = inputDate.substring(startDateIndex, endDateIndex);
	        var monthVal = inputDate.substring(startMonthIndex, endMonthIndex);
	        var yearVal = inputDate.substring(startYearIndex, endYearIndex);
	        
	        if ((yearVal.length == 2 && targetfmt.indexOf("yyyy") != -1)) 
	            var fullyr = new Date().getFullYear().toString().substr(0, 2) + yearVal;
	        
	        targetfmt = targetfmt.replace(/dd/, kony.os.padZero(parseInt(dateVal,10)));
	        targetfmt = targetfmt.replace(/mm/, kony.os.padZero(parseInt(monthVal,10)));
	        targetfmt = targetfmt.replace(/(yyyy|yy)/, fullyr ? fullyr : ((targetfmt.indexOf("yyyy") == -1 && yearVal.length == 4) ? yearVal.substr(2, 2) : yearVal));
	        
	        return targetfmt;	
		}	
		return null;
	};
/**@Deprecated This API returns the various date components of a specified date (in a specified format) or the current system date.*/
	//os.isvaliddate(date,format) 
	kony.os.isValidDate = function (date, frmt) {		
		return (arguments.length != 2 || date == null || frmt == null) ? false :kony.os.isvaliddate(date, frmt);		
	};
/**@Deprecated This API returns the various date components of a specified date (in a specified format) or the current system date.*/
	//os.dateComponents(date, format);
	//Formats supported:  (dd/mm/yyyy , mm/dd/yyyy, dd/mm/yy , mm/dd/yy) 
	kony.os.dateComponents = function (date,frmt){
		
	    var result;
		var dateObject;
		if (arguments.length == 0) {
			dateObject = new Date();
		}
		else if (date != null && frmt != null) {
				if(!kony.os.isvaliddate(date,frmt))
					return null;			 
				dateObject = kony.os.getDate(date, frmt);
				var yearfmt = frmt.split("/")[2];
			}
		if (dateObject) {	
			
			var day = dateObject.getDate();
			var mon = dateObject.getMonth() + 1;
			var year = (yearfmt && yearfmt.length == 2) ? parseInt(dateObject.getFullYear().toString().substr(2,2)) : dateObject.getFullYear();		
			
			result = new Object();		
			result["year"] = year;
			result["month"] = mon;
			result["day"] = day;
			result["hour"] = dateObject.getHours();
			result["min"] = dateObject.getMinutes();
			result["sec"] = dateObject.getSeconds();
			result["wday"] = dateObject.getDay() + 1;
			result["yday"] = kony.os.getDayOfYear(day, mon, year);
			result["isdst"] = kony.os.checkForDst();
			return result;
		} 
		else
			return null;
		
	};
	
	kony.os.padZero = function (num) {
	    return num < 10 ? ("0"+num) : num;
	};
/**@Deprecated This API converts a given date string to the target format and returns the formatted date. Format will use the tokens dd,mm,yyyy to indicate day, month, and year respectively. The delimiter used between the tokens can be any character. For example, dd/mm/yyyy and (dd)(mm)(yyyy) are valid inputs.*/	
	kony.os.formatdate = function (fmt, dateObj) {
		fmt = fmt.toLowerCase();
	    fmt = fmt.replace(/dd/, kony.os.padZero(dateObj.getDate()));
	    fmt = fmt.replace(/mm/, kony.os.padZero(dateObj.getMonth() + 1));
	    return fmt.replace(/(yyyy|yy)/, fmt.indexOf("yyyy") == -1 ? dateObj.getFullYear().toString().substr(2, 2) : dateObj.getFullYear());
	};
/**@Deprecated This API returns the various date components of a specified date (in a specified format) or the current system date.*/
	 //Valid formats mm/dd/yy and mm/dd/yyyy and dd/mm/yyyy		
    kony.os.isvaliddate = function(dtStr, format){
        var minYear = 1900;
        var maxYear = 2100;
        var dtCh = "/";
        var daysInMonth = kony.os.daysArray(12);

        var pos1 = dtStr.indexOf(dtCh)
        var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
        var dateFormat = format || "dd/mm/yyyy";
        
        if (dateFormat == "dd/mm/yyyy" || dateFormat == "dd/mm/yy") {
            var strDay = dtStr.substring(0, pos1)
            var strMonth = dtStr.substring(pos1 + 1, pos2)
        }
        else 
            if (dateFormat == "mm/dd/yy" || dateFormat == "mm/dd/yyyy") {
                var strDay = dtStr.substring(pos1 + 1, pos2);
                var strMonth = dtStr.substring(0, pos1);
            }
            else 
                return false;
        
        var strYear = dtStr.substring(pos2 + 1);
        /*if(strYear.length == 2 && dateFormat.indexOf("yyyy") != -1)				
         return false;*/
        var today = new Date();
        
        strYr = strYear
        if (strDay.charAt(0) == "0" && strDay.length > 1) 
            strDay = strDay.substring(1)
        if (strMonth.charAt(0) == "0" && strMonth.length > 1) 
            strMonth = strMonth.substring(1)
        if (strYr.length == 2) {
            strYr = (today.getFullYear() + "").substr(0, 2) + strYr;
        }
        for (var i = 1; i <= 3; i++) {
            if (strYr.charAt(0) == "0" && strYr.length > 1) 
                strYr = strYr.substring(1)
        }
        month = parseInt(strMonth)
        day = parseInt(strDay)
        year = parseInt(strYr)
        
        if (!kony.os.isInteger(strMonth) || !kony.os.isInteger(strDay) || !kony.os.isInteger(strYear) || strMonth.length < 1 || month < 1 || month > 12 || strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > kony.os.daysInFebruary(year)) || day > daysInMonth[month] || strYr.length != 4 || year == 0 || year < minYear || year > maxYear) {
            //alert("invalid date");
            return false
        }
        return true
    };
	
    kony.os.daysArray = function(n){
        for (var i = 1; i <= n; i++) {
            this[i] = 31
            if (i == 4 || i == 6 || i == 9 || i == 11) {
                this[i] = 30
            }
            if (i == 2) {
                this[i] = 29
            }
        }
        return this
    };
	
    kony.os.daysInFebruary = function(year){
        // February has 29 days in any year evenly divisible by four,
        // EXCEPT for centurial years which are not also divisible by 400.
        return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
    };
	
    kony.os.isInteger = function(s){
        var i;
        for (i = 0; i < s.length; i++) {
            // Check that current character is number.
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) 
                return false;
        }
        // All characters are numbers.
        return true;
    };
    
    kony.os.getDate = function(date, format){
        var dateObj;
        if (typeof date === "string" && typeof format === "string") {
            var dateParts = date.split("/");
            var yr = new Date().getFullYear().toString().substr(0, 2);
            if (format.indexOf("yyyy") == -1 || dateParts[2].length == 2) 
                dateParts[2] = yr + dateParts[2];
            
            if (format == "mm/dd/yyyy" || format == "mm/dd/yy") 
                dateObj = new Date(dateParts[0] + "/" + dateParts[1] + "/" + dateParts[2]);
            else 
                dateObj = new Date(dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2]);
            
            return dateObj;
        }
    };
    
    kony.os.getDayOfYear = function(day, month, year){
        var i, j;
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        if (0 === year % 4) {
            days[1]++;
        }
        
        for (i = 1, j = 0; i < month; j += days[i - 1], i++) 
            ;
        
        return j + day;
    };

    kony.os.checkForDst = function(){

        var rightNow = new Date();
        var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
        var temp = jan1.toGMTString();
        var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
        var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);

        var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
        temp = june1.toGMTString();
        var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
        var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
        var dst;
        if (std_time_offset == daylight_time_offset) {
            //dst = "0"; // daylight savings time is NOT observed
            return false;
        }
        else {
            //dst = "1"; // daylight savings time is observed
            return true;
        }
    };
	

	
	
