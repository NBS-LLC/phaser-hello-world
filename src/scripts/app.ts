import {Game, Scene} from 'phaser';
import GameConfig = Phaser.Types.Core.GameConfig;
import Text = Phaser.GameObjects.Text;

const config: GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const game = new Game(config);
let fpsText: Text;

function preload(this: Scene) {
    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create(this: Scene) {
    this.add.image(400, 300, 'sky');

    const particles = this.add.particles('red');

    const emitter = particles.createEmitter({
        speed: 100,
        scale: {start: 1, end: 0},
        blendMode: 'ADD'
    });

    const logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);

    fpsText = this.add.text(16, 16, getFpsText(), {fontSize: '32px', fill: '#FFF'});
}

function update(this: Scene) {
    fpsText.setText(getFpsText());
}

function getFpsText(): string {
    return 'FPS: ' + game.loop.actualFps.toFixed(2);
}
