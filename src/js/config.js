// cf. https://github.com/requirejs/example-multipage
requirejs.config({
    baseUrl: "../js/lib",
    paths: {
        kkb: "../kkb",
        knockout: [
            "//cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min",
            "knockout"
        ]
    }
});
