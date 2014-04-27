requirejs.config({
    baseUrl: "../src/js/lib",
    paths: {
        "spec": "../../../spec",
        "jasmine": "../../../spec/lib/jasmine",
        "kkb": "../kkb",
        "knockout": [
            "//cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min",
            "knockout"
        ]
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
