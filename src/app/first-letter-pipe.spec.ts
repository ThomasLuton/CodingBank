import { FirstLetterPipe } from './first-letter-pipe'

describe('FirstLetterPipe', () => {
    const pipe = new FirstLetterPipe();

    it('should substring a string to get just the first letter', () => {
        expect(pipe.transform("toto", false)).toBe("t");
    })

    it('should transform the letter to uppercase if param is true', () => {
        expect(pipe.transform("toto", true)).toBe("T")
    })
});