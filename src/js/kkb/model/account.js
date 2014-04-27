define([
    "kkb/util/observable"
], function(_) {
    "use strict";

    var Account = function(values) {
        this.id = _.observable();
        this.name = _.observable(values && values.name);
    };

    Account.prototype = {
        constructor: Account
    };

    return Account;
});
