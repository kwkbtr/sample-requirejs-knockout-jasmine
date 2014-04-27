// cf. https://github.com/requirejs/example-multipage
{
    appDir: "../src/js",
    dir: "js",
    baseUrl: "lib",
    paths: {
        "config": "../config",
        "kkb": "../kkb"
    },
    modules: [
        {
            name: "../index",
            include: ["kkb/index-main"]
        }
    ]
}
