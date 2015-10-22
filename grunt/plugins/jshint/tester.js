/*function main(a, b) {
    a = b;
    return a == null;

}
*/
function abc() {
	/* jshint ignore: start */
    var me = "1024";
    var who = function() {
        return this.me;
    };
    /* jshint ignore:end */
}

var k = new abc();

console.log(k.who);
