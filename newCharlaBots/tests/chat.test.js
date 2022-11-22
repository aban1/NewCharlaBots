const chat = require('../static/js/chat.js');

describe("removeCommaTest", () => {
    test("it should remove the trailing comma and put the word in lowercase", () => {
        const input = "Word,";
        const output = "word";
        expect(chat.removeComma(input)).toEqual(output);
    });
});

describe("blocksHelperTest", () => {
    test("it should remove non-empty elements and trim elements", () => {
        const input = ["a ", " ", "", "b"];
        const output = ["a", "b"];
        expect(chat.blocksHelper(input)).toEqual(output);
    });
});

describe("checkForKeywordTest", () => {
    test("it should return the keyword when between {}", () => {
        const input = "{keyword}";
        const output = "keyword";
        expect(chat.checkForKeyword(input)).toEqual(output);
    });

    test("it should return 'long response' when the keyword ends with a newline indicator", () => {
        const input = "{keyword}(new-line)";
        const output = "long response";
        expect(chat.checkForKeyword(input)).toEqual(output);
    });
    test("it should return false with incorrect input", () => {
        const input = "word";
        expect(chat.checkForKeyword(input)).toBeFalsy();
    });
});

describe("contains_allTest", () => {
    test("it should return true", () => {
        const inputWords = ["a", "a", "b", "c"];
        const listWords = ["a", "b"];
        expect(chat.contains_all(inputWords, listWords)).toBeTruthy();
    });
    test("it should return false", () => {
        const inputWords = ["a", "a", "b", "c"];
        const listWords = ["a", "b", "x"];
        expect(chat.contains_all(inputWords, listWords)).toBeFalsy();
    });
});

describe("createDictForPickRandom", () => {
    test("it should create dict for pickRandom", () => {
        const input = "{pickRandom} (nw-ln)ans 1 (nw-ln)Answer 2 (nw-ln)Answer 3 (nw-ln){endPick} (nw-ln)";
        const output = {
            "keyword" : "pickRandom",
            "words" : [],
            "keywordNOT": "",
            "wordsNOT": [],
            "response" : ["ans 1", "Answer 2", "Answer 3"]    
        };

        expect(chat.createDictForPickRandom(input)).toEqual(output);
    });
});