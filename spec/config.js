requirejs.config({
    baseUrl: "../src/js/lib",
    paths: {
	"spec": "../../../spec",
	"jasmine": "../../../spec/lib/jasmine"
    },
    shim: {
	"jasmine/jasmine": {
	    exports: "jasmineRequire"
	},
	"jasmine/jasmine-html": {
	    deps: ["jasmine/jasmine"]
	}
    }
});
