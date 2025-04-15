const canvas = document.getElementById('JogoCanvas');
    const ctx = canvas.getContext('2d');

    class entidade {
      constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
      }

    }