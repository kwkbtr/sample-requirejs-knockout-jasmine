define([
], function() {
    "use strict";

    var undefined;

    var Account = function(values) {
        this.id = undefined;
        this.name = values.name || "";
    };

    Account.prototype = {
        constructor: Account
    };

    return Account;
});
