import spriteMole1 from "./assets/sprite/mole1.png";
import spriteMole2 from "./assets/sprite/mole2.png";
import spriteMole3 from "./assets/sprite/mole3.png";

// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
// MIT License - Copyright 2019 Frank Force
// https://github.com/KilledByAPixel/ZzFX
'use strict'; let zzfx, zzfxV, zzfxX
// ZzFXMicro - Zuper Zmall Zound Zynth - v1.1.8 ~ 884 bytes minified
zzfxV = .3    // volume
zzfx =       // play sound
    (p = 1, k = .05, b = 220, e = 0, r = 0, t = .1, q = 0, D = 1, u = 0, y = 0, v = 0, z = 0, l = 0, E = 0, A = 0, F = 0, c = 0, w = 1, m = 0, B = 0) => {
        let
        M = Math, R = 44100, d = 2 * M.PI, G = u *= 500 * d / R / R, C = b *= (1 - k + 2 * k * M.random(k = [])) * d / R, g = 0, H = 0, a = 0, n = 1, I = 0
        , J = 0, f = 0, x, h; e = R * e + 9; m *= R; r *= R; t *= R; c *= R; y *= 500 * d / R ** 3; A *= d / R; v *= d / R; z *= R; l = R * l | 0; for (h = e + m +
            r + t + c | 0; a < h; k[a++] = f)++J % (100 * F | 0) || (f = q ? 1 < q ? 2 < q ? 3 < q ? M.sin((g % d) ** 3) : M.max(M.min(M.tan(g), 1)
                , -1) : 1 - (2 * g / d % 2 + 2) % 2 : 1 - 4 * M.abs(M.round(g / d) - g / d) : M.sin(g), f = (l ? 1 - B + B * M.sin(d * a / l) : 1) * (0 < f ? 1 :
                    -1) * M.abs(f) ** D * p * zzfxV * (a < e ? a / e : a < e + m ? 1 - (a - e) / m * (1 - w) : a < e + m + r ? w : a < h - c ? (h - a - c) / t * w : 0), f = c ? f /
                        2 + (c > a ? 0 : (a < h - c ? 1 : (h - a) / c) * k[a - c | 0] / 2) : f), x = (b += u += y) * M.cos(A * H++), g += x - x * E * (1 - 1E9 * (M.sin(a)
                            + 1) % 2), n && ++n > z && (b += v, C += v, n = 0), !l || ++I % l || (b = C, u = G, n = n || 1); p = zzfxX.createBuffer(1, h, R); p.
                                getChannelData(0).set(k); b = zzfxX.createBufferSource(); b.buffer = p; b.connect(zzfxX.destination
                                ); b.start(); return b
    }; zzfxX = new (window.AudioContext || webkitAudioContext) // audio context

export function gameLogic() {

    var ROWS = 4;
    var COLUMNS = 4;
    var SIZE = 128;
    var SCORE = 0;
    var GAME_STATE = "GAMEOVER"; //  START | GAMEOVER
    var BASE_TIME = 25; //default game time 
    var TIME_OVER = BASE_TIME;
    //        gia tri de nam giu mang 
    var monsterObjectArray = [];
    var monsterCanvasArray = [];
    var monsterGetContextArray = [];
    var gameState = document.querySelector("#gameState");
    var scoreField = document.querySelector("#gameInfo #score");
    var timeField = document.querySelector("#gameInfo #time");

    //base mole 
    var BASE_MOLE = {
        //frame
        image: spriteMole1,
        forward: true,
        column: 3,
        numberOfFrames: 5, // frame 0 -> 5, hiding = frame 0
        currentFrame: 0,
        hitFrame: 6,
        size: 128,
        sourceX: 0,
        sourceY: 0,

        //state 
        hit: 2,
        hiding: 0,
        jumping: 1,
        rate: 100,//show up rate 
        type: "plus", // plus | minus | health (+ time or + health )  

        state: this.hiding,
        timeToDisplayHit: 0,
        timeToRemoveHit: 10,

        getImageObject: function () {
            var img = new Image();
            img.src = this.image;
            return img;
        },
        // chua random Time :
        waitTime: undefined, //

        findWaitTime: function () {
            this.waitTime = Math.ceil(Math.random() * this.rate);
        },
        updateAnimation: function () {
            if (this.state !== this.hit) {
                if (this.waitTime > 0 || this.waitTime == undefined) {
                    this.state = this.hiding;
                } else {
                    this.state = this.jumping;
                }
            }

            switch (this.state) {

                case this.hiding:
                    this.currentFrame = 0;
                    this.waitTime--;
                    break;

                case this.jumping:
                    if (this.currentFrame === this.numberOfFrames) {
                        this.forward = false;
                    }
                    if (this.currentFrame === 0 && this.forward == false) {
                        this.forward = true;
                        this.findWaitTime();
                        break;
                    }
                    if (this.forward) {
                        this.currentFrame++;
                    } else {
                        this.currentFrame--;
                    }
            }//end switch 

            if (this.state == this.hit) {
                if( this.timeToDisplayHit == 0){
                    //trigger sound 
                    switch( this.type ){
                        case "minus":
                            zzfx(1.04,.05,421,.02,.02,.15,4,2.77,0,9,0,0,0,1.2,0,.1,0,.5,.04,.07); // Hit 107
                        break;

                        case "plus":
                            zzfx(1,.05,179,.02,.02,.07,1,1.43,3.6,0,0,0,0,0,0,0,0,.55,.08,.34); // Shoot 74
                        break;

                        case "health":
                            zzfx(1,.05,580,.01,.15,.34,1,1.02,-0.9,0,67,.07,.08,.1,0,.1,0,.94,.21,.37); // Powerup 17
                        break;
                    } 
                }
                this.timeToDisplayHit++;
                this.currentFrame = this.hitFrame;
                if (this.timeToDisplayHit == this.timeToRemoveHit) {
                    this.timeToDisplayHit = 0;
                    this.currentFrame = 0;
                    this.state = this.hiding;
                }
            }
            this.sourceX = Math.floor(this.currentFrame % this.column) * this.size;
            this.sourceY = Math.floor(this.currentFrame / this.column) * this.size;

        }

    }//end monster Object

    var monsterImage = new Image();
    monsterImage.src = BASE_MOLE.image;

    window.getScore = function () {
        return SCORE;
    }
    function updateAnimation() {
        window.setTimeout(updateAnimation, 100);
        for (i = 0; i < monsterObjectArray.length; i++) {
            monsterObjectArray[i].updateAnimation();
        }
        if (GAME_STATE == "START")
            render();
    }//end UpdateAnimation 

    var lastScore = 0;
    
    function render() {

        if (SCORE / 20 > 0 && Number.isInteger(SCORE / 20) && lastScore < SCORE) {
            lastScore = SCORE;
            for (i = 0; i < monsterObjectArray.length; i++) {
                //each 20 point, re-create monsters, make bg black 
                document.querySelector("html").style.backgroundColor = "black";
                window.setTimeout( function(){
                    document.querySelector("html").style.backgroundColor = "gray";
                }, ( Math.ceil( 4 + Math.random() * 10 ))*1000  );

                monsterObjectArray[i] = newMonster();
                console.log("render new monster ", monsterObjectArray[i].type);
                var monsterObject = monsterObjectArray[i];
                var getContext = monsterGetContextArray[i];
                getContext.clearRect(0, 0, monsterObject.size, monsterObject.size);
                getContext.drawImage(monsterObject.getImageObject(), monsterObject.sourceX, monsterObject.sourceY, monsterObject.size, monsterObject.size, 0, 0, monsterObject.size, monsterObject.size);
            }
        } else {
            for (i = 0; i < monsterObjectArray.length; i++) {
                var monsterObject = monsterObjectArray[i];
                var getContext = monsterGetContextArray[i];
                getContext.clearRect(0, 0, monsterObject.size, monsterObject.size);
                getContext.drawImage(monsterObject.getImageObject(), monsterObject.sourceX, monsterObject.sourceY, monsterObject.size, monsterObject.size, 0, 0, monsterObject.size, monsterObject.size);
            }
        }
    }//end render();

    function newMonster() {
        //create new monster
        var mole = Object.create(BASE_MOLE);
        var rnd = Math.round(Math.random() * 10);
        if (rnd > 2 && rnd <= 8) {
            //normal mole 
            mole.image = spriteMole1;
            mole.type = "plus";
            mole.rate = 10;
            console.log("normal mole : 1 ");
        } else if (rnd >= 0 && rnd <= 2) {
            //death mole 
            mole.image = spriteMole2;
            mole.type = "minus";
            mole.rate = 10;
            console.log("death mole : 1 ");
        } else {
            // health mole 
            mole.image = spriteMole3;
            mole.type = "health";
            console.log("health mole: 2 ");
        }

        return mole;
    }//newMonster 

    function buildMap() {
        for (var rows = 0; rows < ROWS; rows++) {
            for (var columns = 0; columns < COLUMNS; columns++) {
                //tao 1 monsterObject moi :
                var newMonsterObject = Object.create(newMonster());
                newMonsterObject.findWaitTime();
                monsterObjectArray.push(newMonsterObject);

                var canvas = document.createElement("canvas");

                canvas.style.width = SIZE + "px";
                canvas.style.height = SIZE + "px";

                gameState.appendChild(canvas);
                canvas.addEventListener("mousedown", mouseDownHandler, false);
                monsterCanvasArray.push(canvas); 

                var getContext = canvas.getContext("2d");
                monsterGetContextArray.push(getContext);

            }
        }
    }//end buildMap

    function handleStat(monsterObject) {
        console.log("hit: ", monsterObject.type);
        switch (monsterObject.type) {
            case "plus":
                SCORE++;
                showScoreEffect("+1 score");
                break;

            case "minus":
                SCORE -= 2;
                TIME_OVER -= 2;
                showScoreEffect("-2 score -2 sec");
                break;

            case "health":
                SCORE++;
                TIME_OVER += 2;
                showScoreEffect("+1 score +2 sec")
                break;

        }

        console.log(SCORE);
        // updateGameStat()
    }

    function showScoreEffect(text){
        let t = document.getElementById("scoreEffect");
        t.classList.add("showEffect");
        t.innerHTML = text;
        window.scoreEffect = window.setTimeout( ()=>{
            t.classList.remove("showEffect");
        } , 1000 );
    }

    function mouseDownHandler(event) {
        var canvasWasClicked = event.target;

        for (var i = 0; i < monsterObjectArray.length; i++) {
            if (monsterCanvasArray[i] === canvasWasClicked) {
                if (monsterObjectArray[i].state === monsterObjectArray[i].jumping) {
                    monsterObjectArray[i].state = monsterObjectArray[i].hit;
                    monsterObjectArray[i].findWaitTime();
                    handleStat(monsterObjectArray[i]);
                }
            }
        }
    }//end mouseDownHandler()
    monsterImage.addEventListener("load", loadImageHandler, false);

    function loadImageHandler() {
        buildMap();
        updateAnimation();
    } //end loadImageHandler()   

    function toggleDashboard() {
        var dashboard = document.getElementById("modal");
        var gameboard = document.getElementById("gameState");

        if (GAME_STATE == "GAMEOVER") {
            dashboard.style.display = "block";
            gameboard.style.filter = "blur(10px)"
            //load top scores from NEAR 
        } else {
            dashboard.style.display = "none";
            gameboard.style.filter = "blur(0px)";
        }
    }

    // counterTime();
    function updateGameStat() {
        if (GAME_STATE == "GAMEOVER") return;
        TIME_OVER--;
        timeField.innerHTML = "Time left: " + (TIME_OVER >= 0 ? TIME_OVER : 0) + " s";
        if (TIME_OVER <= 0) {
            console.log("game over , you got :" + SCORE + "points");
            GAME_STATE = "GAMEOVER";
            //save score to NEAR 
            if (SCORE >= 0) {
                zzfx(1.01,0,261.6256,0,.67,.2,3,.71,0,0,0,0,0,.2,0,0,0,.37,.01,0); // Music 180
                document.getElementById("playerScore").style.display ="block";
                document.getElementById("playerScore").innerHTML = "GAMEOVER, your score: " + SCORE;
                
                if (SCORE > 0 ){
                    window.setTimeout(async function () {
                        await window.saveScoreToNear();
                    }, 1000);
                }
            }
  
            toggleDashboard();
        }
        scoreField.innerHTML = "Score : " + SCORE;
    }

    //game start stop controls  
    document.getElementById("btn-start").addEventListener("click", function () {
        clearInterval(window.gameStateInterval);
        window.gameStateInterval = 0;

        GAME_STATE = "START";
        SCORE = 0;
        TIME_OVER = BASE_TIME;
        console.log("game start!");

        updateGameStat();
        window.gameStateInterval = setInterval(function () {
            clearInterval("gameStateInterval");
            updateGameStat();
        }, 1000)
        toggleDashboard();

    });


}
