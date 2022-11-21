const chat = require('./chat.js');

describe("removeCommaTest", () => {
    test("it should remove the trailing comma and put the word in lowercase", () => {
        const input = "Word,";
        const output = "word";
        expect(chat.removeComma(input)).toEqual(output);
    });
});