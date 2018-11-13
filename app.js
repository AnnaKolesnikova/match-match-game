(() => {
  class Card {
    constructor({ image, pos, element }) {
      this.image = image;
      this.pos = pos;
      this.element = element;
      this.open = false;
    }

    setOpen(open) {
      this.open = open;
      if (open) {
        this.element.classList.add('open');
        count++;
      } else {
        this.element.classList.remove('open');
      }


      if (count == 1) {
        prevValue1 = this.image;
        prevCard1 = this;
      } else if (count == 2) {
        prevValue2 = this.image;
        prevCard2 = this;
      } else if (count == 3) {
        count = 0;
        prevCard1.element.classList.remove('open');
        prevCard2.element.classList.remove('open');
        if (prevValue1 == prevValue2) {
          prevCard1.element.classList.add('invisible');
          prevCard2.element.classList.add('invisible');
        }
      }
    }

    setElement(e) {
      this.element = e;
    }
  }


  const n = 3, m = 4;
  const images = [1, 2, 3, 4, 5, 6];
  var count = 0;
  var prevValue1;
  var prevValue2;
  var prevCard1;
  var prevCard2;

  const board = Array(n).fill(null);
  board.forEach((row, i) => board[i] = Array(m).fill(null));

  fillBoard(board, images);
  renderBoard(board);

  function randInt(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

  function fillBoard(board, images) {
    const positions = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        positions.push({ i, j });
      }
    }

    let imageIndex = 0;
    while (positions.length > 0) {
      for (let op = 0; op < 2; op++) {
        const i = randInt(0, positions.length);
        const pos = positions[i];
        board[pos.i][pos.j] = new Card({ pos, image: images[imageIndex] });
        positions.splice(i, 1);
      }
      imageIndex += 1;
    }
    return board;
  }

  function renderBoard(board) {
    const appContainer = document.getElementById('app');
    for (let i = 0; i < n; i++) {
      const rowElement = document.createElement('div');
      rowElement.className = 'row';
      for (let j = 0; j < m; j++) {
        const card = board[i][j];
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.addEventListener('click', createCardClickListener(card));
        const cardContentElement = document.createElement('div');
        cardContentElement.className = 'card-content';
        cardContentElement.appendChild(document.createTextNode(card.image));
        cardElement.appendChild(cardContentElement);
        card.setElement(cardElement);
        rowElement.appendChild(cardElement);
      }
      appContainer.appendChild(rowElement);
    }
  }

  function createCardClickListener(card) {
    return event => card.setOpen(!card.open);
  }
})();