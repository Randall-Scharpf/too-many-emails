"use strict";
exports.__esModule = true;
function repeatHello(message) {
    var content = message.content, times = message.times;
    for (var i = 0; i < times; i++)
        console.log(content);
}
repeatHello({
    content: "hello world",
    times: 5
});
