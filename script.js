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

      desenhar() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }

    class nave extends entidade {
      constructor(x, y) {
        super(x, y, 40, 20, 'lime');
        this.speed = 5;
      }

      mover(dir) {
        this.x += dir * this.speed;
        this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
      }
    }

    