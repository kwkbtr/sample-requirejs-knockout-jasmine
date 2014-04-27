define(["knockout"], function(ko) {
    "use strict";

    function async() {
        return this.extend({rateLimit: 0});
    };

    return {
        observable: function() {
            var o = ko.observable.apply(ko, arguments);
            o.async = async.bind(o);
            return o;
        },

        computed: function() {
            var c = ko.computed.apply(ko, arguments);
            c.async = async.bind(c);
            return c;
        },

        observableArray: function() {
            var a = ko.observableArray.apply(ko, arguments);
            a.async = async.bind(a);
            return a;
        }
    };
});
