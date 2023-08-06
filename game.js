const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

const SEP_RATIO = 8;


let player1, player2;
let cursors;
let ball;
let randomBallVelocity = 0;

let p1Score = 0;
let p2Score = 0;
let winText;
let scoreText;

const config = {
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

function ResetBall() {
    ball.setPosition(WINDOW_WIDTH/2, WINDOW_HEIGHT/2);
    let randomNumForDirection = Phaser.Math.Between(1,100);
    if(randomNumForDirection > 50) {
        ball.setVelocityX(Phaser.Math.Between(200,250));
        ball.setVelocityY(Phaser.Math.Between(150,250));
    } else {
        ball.setVelocityX(Phaser.Math.Between(-250,-200));
        ball.setVelocityY(Phaser.Math.Between(-250,-150));
    }
}

function DeflectBall() {
    ball.setVelocityX(-ball.body.velocity.x);
}

const game = new Phaser.Game(config);

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

    player1 = this.physics.add.sprite(WINDOW_WIDTH/SEP_RATIO, WINDOW_HEIGHT/2, 'paddle1').setImmovable();
    player2 = this.physics.add.sprite((WINDOW_WIDTH/SEP_RATIO)*(SEP_RATIO-1), WINDOW_HEIGHT/2, 'paddle2').setImmovable();;
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);


    ball = this.physics.add.sprite(WINDOW_WIDTH/2, WINDOW_HEIGHT/2, 'ball');
    ball.setCollideWorldBounds(true);
    ball.setBounce(1,1);
    ball.setCircle(32, 0, 0);
    this.physics.add.collider(player1, ball);
    this.physics.add.collider(player2, ball);
    //this.physics.add.collider(player1, ball, DeflectBall);
    //this.physics.add.collider(player2, ball, DeflectBall);
    
    ResetBall();

    //UI
    scoreText = this.add.text(WINDOW_WIDTH/2-50, 16, p1Score + ' - ' + p2Score, {fontSize: '44px' , fill: '#fff'});

    const rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    rKey.on('down' , (key, event) =>
    {   
        event.stopPropagation();
        ResetBall();
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

function checkBallPositionForScore(position) {
    if (position.x < 10){
        p2Score++;
        ResetBall();
    } else if (position.x > WINDOW_WIDTH-70) {
        p1Score++;
        ResetBall();
    }
}

function ResetPlayerPositions() {
    player1.setPosition(WINDOW_WIDTH/SEP_RATIO, WINDOW_HEIGHT/2);
    player2.setPosition((WINDOW_WIDTH/SEP_RATIO)*(SEP_RATIO-1), WINDOW_HEIGHT/2);
}

function ResetGame() {
    p1Score = 0;
    p2Score = 0;
    winText.destroy();
    ResetPlayerPositions();
    ResetBall();
}

function update (){
    player1.setVelocityX(0);
    player2.setVelocityX(0);

    
    checkBallPositionForScore(ball.body.position);

    if(p1Score >= 5 || p2Score >= 5) {
        if (p1Score > p2Score) {
        this.add.text(150, WINDOW_HEIGHT/2-50, 'Player 1 Wins!' , { fontSize: '60px' , fill: '#fff'});
    } else {
        this.add.text(150, WINDOW_HEIGHT/2-50, 'Player 2 Wins!' , { fontSize: '60px' , fill: '#fff'});
    }
    this.input.keyboard.on('keydown' , (event) => {
        if (event.keyCode === 32) {
            ResetGame();
        }
    });
    }
    scoreText.setText(p1Score + ' - ' + p2Score);
}