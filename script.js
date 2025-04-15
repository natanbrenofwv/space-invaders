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

    class projetils extends entidade {
      constructor(x, y, speed) {
        super(x, y, 5, 10, 'white');
        this.speed = speed;
      }

      atualizar() {
        this.y += this.speed;
      }
    }

    class Alien extends entidade {
      constructor(x, y) {
        super(x, y, 30, 20, 'red');
      }
    }

    class Game {
      constructor() {
        this.nave = new nave(canvas.width / 2 - 20, canvas.height - 30);
        this.projetilss = [];
        this.aliens = [];
        this.alienDir = 1;
        this.keys = {};
        this.spawnAliens();

        document.addEventListener('keydown', (e) => this.keys[e.key] = true);
        document.addEventListener('keyup', (e) => this.keys[e.key] = false);
      }

      spawnAliens() {
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 10; x++) {
            this.aliens.push(new Alien(50 + x * 40, 30 + y * 30));
          }
        }
      }

      atualizar() {
        if (this.keys['ArrowLeft']) this.nave.mover(-1);
        if (this.keys['ArrowRight']) this.nave.mover(1);
        if (this.keys[' '] && this.projetilss.length < 5) {
          this.projetilss.push(new projetils(this.nave.x + this.nave.width / 2 - 2.5, this.nave.y, -7));
          this.keys[' '] = false; // evita tiros contínuos
        }

        this.projetilss.forEach((projetils, i) => {
          projetils.atualizar();
          if (projetils.y < 0) this.projetilss.splice(i, 1);
        });

        // Movimento dos alienígenas
        let hitEdge = false;
        this.aliens.forEach(alien => {
          alien.x += this.alienDir * 1;
          if (alien.x <= 0 || alien.x + alien.width >= canvas.width) {
            hitEdge = true;
          }
        });

        if (hitEdge) {
          this.alienDir *= -1;
          this.aliens.forEach(alien => alien.y += 10);
        }