/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markovFile = require('./markov');
const axios = require('axios');
let markovClass = markovFile.MarkovMachine;
const stripHtml = require('string-strip-html');

async function produceMarkov(path) {
  if (process.argv[2] == 'file') {
    let text = fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let mm = new markovClass(data);
        console.log(mm.makeText());
      }
    });
  } else if (process.argv[2] == 'url') {
    try {
      let resp = await axios.get(path);
      let mm = new markovClass(stripHtml(resp.data));
      console.log(mm.makeText());
    } catch (e) {
      console.error(e);
    }
  }
}

produceMarkov(process.argv[3]);
