define([
    "jasmine/boot",
    "kkb/util/observable"
], function(jasmine, _) {
    "use strict";

    var value1 = {aaaa: "bbbb"};
    var value2 = {cccc: "dddd"};

    describe("Observable", function() {
        it("synchronously notifies change of its value to subscribers", function() {
            var o = _.observable(value1);

            expect(o()).toBe(value1);

            var sub1 = jasmine.createSpy("subscriber 1");
            o.subscribe(sub1);
            var sub2 = jasmine.createSpy("subscriber 2");
            o.subscribe(sub2);

            o(value2);

            expect(o()).toBe(value2);
            expect(sub1).toHaveBeenCalledWith(value2);
            expect(sub2).toHaveBeenCalledWith(value2);
        });

        it("asynchronously notifies change when specified", function(done) {
            var o = _.observable(value1).async();

            var sub = jasmine.createSpy("subscriber");
            o.subscribe(function(value) {
                sub(value);
                expect(value).toBe(value2);
                done();
            });

            o(value2);

            expect(sub).not.toHaveBeenCalled();
        });
    });

    describe("Computed observable", function() {
        var o1, o2;

        beforeEach(function() {
            o1 = _.observable(value1);
            o2 = _.observable(value1);
        });

        it("is evaluated immediately after its definition", function() {
            var c = _.computed(function() {
                return {o1: o1(), o2: o2()};
            });

            expect(c()).toEqual({o1: value1, o2: value1});
        });

        it("synchronously notifies change", function() {
            var c = _.computed(function() {
                return {o1: o1(), o2: o2()};
            });

            var sub = jasmine.createSpy("subscriber");
            c.subscribe(sub);

            expect(sub).not.toHaveBeenCalled();

            o1(value2);
            expect(sub).toHaveBeenCalledWith({o1: value2, o2: value1});

            o2(value2);
            expect(sub).toHaveBeenCalledWith({o1: value2, o2: value2});
        });

        it("asynchronously notifies change when specified", function(done) {
            var c = _.computed(function() {
                return {o1: o1(), o2: o2()};
            }).async();

            var sub = jasmine.createSpy("subscriber");
            c.subscribe(function(value) {
                sub(value);
                expect(value).toEqual({o1: value2, o2: value2});
                done();
            });

            o1(value2);
            o2(value2);

            expect(sub).not.toHaveBeenCalled();
        });
    });

    describe("Observable array", function() {
        it("synchronously notifies change", function() {
            var a = _.observableArray(["aaa", "bbb"]);

            var sub = jasmine.createSpy("subscriber");
            a.subscribe(sub);

            expect(sub).not.toHaveBeenCalled();

            a.push("ccc");

            expect(sub).toHaveBeenCalledWith(["aaa", "bbb", "ccc"]);
        });

        it("asynchronously notifies change when specified", function(done) {
            var a = _.observableArray(["aaa", "bbb"]).async();

            var sub = jasmine.createSpy("subscriber");
            a.subscribe(function(value) {
                sub(value);
                expect(value).toEqual(["aaa", "bbb", "ccc"]);
                done();
            });

            a.push("ccc");

            expect(sub).not.toHaveBeenCalled();
        });

        it("notifies array change event", function() {
            var a = _.observableArray(["aaa", "bbb"]);

            var sub = jasmine.createSpy("subscriber");
            a.subscribe(sub, null, "arrayChange");

            expect(sub).not.toHaveBeenCalled();

            a.push("ccc");

            var pushChange = [{status: "added", value: "ccc", index: 2}];
            expect(sub.calls.mostRecent().args).toEqual([pushChange]);

            a.splice(1, 2);

            var spliceChange = [
                {status: "deleted", value: "bbb", index: 1},
                {status: "deleted", value: "ccc", index: 2}
            ];
            expect(sub.calls.mostRecent().args).toEqual([spliceChange]);
        });
    });
});
