define([
    "kkb/model/account"
], function(Account) {
    "use strict";

    describe("Account", function() {

	it("has empty default properties", function() {
	    var account = new Account();

	    expect(account.id()).toBeUndefined();
	    expect(account.name()).toBeUndefined();
	});

	it("can be constructed with properties except id", function() {
	    var properties = {
		id: "aaaa",
		name: "bbbb"
	    }
	    var account = new Account(properties);

	    expect(account.id()).toBeUndefined();
	    expect(account.name()).toBe(properties.name);
	});

    });
});
