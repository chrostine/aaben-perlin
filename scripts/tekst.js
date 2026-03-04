// tjekker efter ord skrevet i caps og gør dem bold
function drawIngredients(input, x, y, w) {
  let lines = input.split('\n'); // split på linjeskifte 
  let curY = y;

  for (let line of lines) {
    let curX = x;
    let words = line.split(/(\s+|,\s*)/);

    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let isUpper = /^[A-ZÆØÅÉÈÊËÀÂÄÙÛÜÎÏÔŒÇ\/\(\)][A-ZÆØÅÉÈÊËÀÂÄÙÛÜÎÏÔŒÇ\s\/\(\)]*$/.test(word.trim()) && word.trim().length > 0;

      textStyle(isUpper ? BOLD : NORMAL);

      let wordWidth = textWidth(word);

      // Tjek om næste element er et komma (ingen mellemrum foran)
      let nextWord = words[i + 1] || '';
      let nextIsComma = nextWord.startsWith(',');
      let commaWidth = nextIsComma ? textWidth(nextWord) : 0;

      // Medregn kommaet i bredden før linjeskift
      if (curX + wordWidth + commaWidth > x + w) {
        curX = x;
        curY += textLeading(); // enkstra linjeskifte efter hver /n
      }

      // opretter text
      text(word, curX, curY);
      curX += wordWidth;
    }

    curY += textLeading();
  }

  textStyle(NORMAL);
}