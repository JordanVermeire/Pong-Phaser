const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

const SEP_RATIO = 8;


var player1, player2;
var cursors;
var ball;
var randomBallVelocity = 0;

var p1Score = 0;
var p2Score = 0;
var scoreText;

var config = {
    type: Phaser.AUTO,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload (){
    this.load.image('sky', './resc/img/cloudyskypong.png');
    this.load.image('paddle1', './resc/img/paddle1.png');
    this.load.image('paddle2', './resc/img/paddle2.png');
    this.load.image('star', './resc/img/star.png');
    this.load.image('ball', './resc/img/ball.png');

    cursors = this.input.keyboard.createCursorKeys();
}

function create(){
    this.add.image(WINDOW_WIDTH/2, WINDOW_HEIGHT/2, 'sky');

    player1 = this.physics.add.sprite(WINDOW_WIDTH/SEP_RATIO, WINDOW_HEIGHT/2, 'paddle1');
    player2 = this.physics.add.sprite((WINDOW_WIDTH/SEP_RATIO)*(SEP_RATIO-1), WINDOW_HEIGHT/2, 'paddle2');
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    this.physics.add.collider(player1, player2);

    ball = this.physics.add.sprite(WINDOW_WIDTH/2, WINDOW_HEIGHT/2, 'ball');
    ball.setCollideWorldBounds(true);
    ball.setBounce(1,1);
    this.physics.add.collider(player1, ball);
    this.physics.add.collider(player2, ball);

    ball.setVelocityX(Phaser.Math.Between(-200, 200));
    ball.setVelocityY(Phaser.Math.Between(-200,200));

    //UI
    scoreText = this.add.text(WINDOW_WIDTH/2-50, 16, p1Score + ' - ' + p2Score, {fontSize: '44px' , fill: '#fff'});

    const rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    rKey.on('down' , (key, event) =>
    {   
        event.stopPropagation();
        ball.setPosition(WINDOW_WIDTH/2, WINDOW_HEIGHT/2);
        ball.setVelocityX(Phaser.Math.Between(-200, 200));
        ball.setVelocityY(Phaser.MAth.Between(-200,200));
    });

    const wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    wKey.on('down', (key, event) =>
    {
        event.stopPropagation();
        player1.setVelocityY(-360);
    });

    const sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    sKey.on('down', (key, event) =>
    {
        event.stopPropagation();
        player1.setVelocityY(360);
    });

    const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    upKey.on('down', (key, event) =>
    {
        event.stopPropagation();
        player2.setVelocityY(-360);
    });

    const downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    downKey.on('down', (key, event) =>
    {
        event.stopPropagation();
        player2.setVelocityY(360);
    });
}

function update (){

}