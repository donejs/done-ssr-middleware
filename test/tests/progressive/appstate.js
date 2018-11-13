var loader = require("@loader");
var DefineMap = require("can-define/map/map");

module.exports = DefineMap.extend({
	statusMessage: "string",
	request: "any",
	loader: {
		serialize: false,
		default: () => loader
	},
	throwError: function() {
		throw Error('Something went wrong');
	}
});
