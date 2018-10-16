/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== '');
    this.wordsObj = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "hat": [null]} */

  makeChains() {
    let wordsObj = {};
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i] in wordsObj) {
        wordsObj[this.words[i]].push(this.words[i + 1]);
      } else {
        wordsObj[this.words[i]] = [this.words[i + 1]];
      }
    }
    return wordsObj;
  }

  /** return random text from chains */

  makeText(numWords = 1000) {
    // TODO
    let story = '';
    let wordsObjLength = Object.keys(this.wordsObj).length;

    //starting word, becomes random
    let randomWord;
    for (let key in this.wordsObj) {
      if (firstCapital(this.wordsObj[key]) !== undefined) {
        randomWord = firstCapital(this.wordsObj[key]);
        break;
      }
    }
    console.log(randomWord);
    for (let i = 0; i < numWords; i++) {
      let randNum = Math.floor(
        Math.random() * this.wordsObj[randomWord].length
      );

      randomWord = this.wordsObj[randomWord][randNum];
      if (randomWord === undefined) {
        return story;
      }

      if (
        randomWord.substring(randomWord.length - 1) === '.' &&
        i > Math.floor(numWords * 0.75)
      ) {
        return (story += randomWord);
      }
      story += randomWord + ' ';
    }
    return story;
  }
}

module.exports = {
  MarkovMachine
};

function firstCapital(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== undefined && arr[i][0].toUpperCase() === arr[i][0]) {
      return arr[i];
    }
  }
}
