"use strict";
import { ESpriteNumberJustifyType, TSprite, TSpriteButton, TSpriteNumber } from "libSprite";
import { EGameStatus, resetGameWorld, soundMuted, startGame } from "./FlappyBird.mjs";
import { TSoundFile } from "libSound";

const fnCountDown = "./Media/countDown.mp3";
const fnRunning = "./Media/running.mp3";

export class TMenu{
  #spTitle;
  #spPlayBtn;
  #spInfoText;
  #spCountDown;
  #spGameScore;
  #spGameOverBoard;
  #spMedal;
  #spFinalScore;
  #spHighScore;
  #sfCountDown;
  #sfRunning;
  #highScores;

  constructor(aSpcvs, aSPI){
    this.#spTitle = new TSprite(aSpcvs, aSPI.flappyBird, 199, 90);
    this.#spPlayBtn = new TSpriteButton(aSpcvs, aSPI.buttonPlay, 236, 255);
    this.#spPlayBtn.addEventListener("click", this.spPlayBtnClick.bind(this));

    this.#spInfoText = new TSprite(aSpcvs, aSPI.infoText, 188, 120);
    this.#spInfoText.hidden = true;

    this.#spCountDown = new TSpriteNumber(aSpcvs, aSPI.numberBig, 288, 190, 0, 1, ESpriteNumberJustifyType.Center);
    this.#spCountDown.visible = false;
    this.#spGameScore = new TSpriteNumber(aSpcvs, aSPI.numberBig, 288, 35, 0, 0, ESpriteNumberJustifyType.Center);
    this.#spGameScore.visible = false;

    this.#spGameOverBoard = new TSprite(aSpcvs, aSPI.gameOver, 175, 120);
    this.#spGameOverBoard.hidden = true;
    this.#spMedal = new TSprite(aSpcvs, aSPI.medal, 205, 164);
    this.#spMedal.hidden = true;
    this.#spFinalScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 365, 168, 0, 0, ESpriteNumberJustifyType.Right);
    this.#spFinalScore.visible = false;
    this.#spHighScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 365, 210, 0, 0, ESpriteNumberJustifyType.Right);
    this.#spHighScore.visible = false;

    this.#sfCountDown = null;
    this.#sfRunning = null;
    this.#highScores = [];
  }

  incGameScore(aScore){
    this.#spGameScore.value += aScore;
  }

  resetGameScore(){
    this.#spGameScore.value = 0;
  }

  stopSound(){
    if (this.#sfRunning !== null) {
      this.#sfRunning.stop();
    }
  }

  setSoundMute(aIsMuted){
    if (aIsMuted) {
      if (this.#sfRunning !== null) {
        this.#sfRunning.pause();
      }
      return;
    }

    if (EGameStatus.state === EGameStatus.gaming) {
      if (this.#sfRunning === null) {
        this.#sfRunning = new TSoundFile(fnRunning);
      }
      this.#sfRunning.play();
    }
  }

  #hideGameOverSprites(){
    this.#spGameOverBoard.hidden = true;
    this.#spMedal.hidden = true;
    this.#spFinalScore.visible = false;
    this.#spHighScore.visible = false;
  }

  draw(){
    this.#spTitle.draw();
    this.#spInfoText.draw();
    this.#spCountDown.draw();
    this.#spGameScore.draw();
    this.#spGameOverBoard.draw();
    this.#spMedal.draw();
    this.#spFinalScore.draw();
    this.#spHighScore.draw();
    this.#spPlayBtn.draw();
  }

  countDown(){
    this.#spCountDown.value--;
    if(this.#spCountDown.value > 0){
      setTimeout(this.countDown.bind(this), 1000);  
    }else{
      if (this.#sfCountDown !== null) {
        this.#sfCountDown.stop();
      }
      this.#spCountDown.visible = false;
      this.#spInfoText.hidden = true;
      this.#spGameScore.visible = true;
      startGame();
      this.setSoundMute(soundMuted);
    }
  }

  showGameOver(){
    const currentScore = this.#spGameScore.value;
    this.stopSound();

    this.#spCountDown.visible = false;
    this.#spGameScore.visible = false;
    this.#spInfoText.index = 1;
    this.#spInfoText.hidden = false;
    this.#spPlayBtn.hidden = false;
    this.#spGameOverBoard.hidden = false;

    this.#highScores.push(currentScore);
    this.#highScores.sort((aScoreA, aScoreB) => aScoreB - aScoreA);
    const highScore = this.#highScores[0] ?? 0;

    this.#spFinalScore.value = currentScore;
    this.#spHighScore.value = highScore;
    this.#spFinalScore.visible = true;
    this.#spHighScore.visible = true;

    if (currentScore > 0) {
      this.#spMedal.index = Math.min(3, currentScore);
      this.#spMedal.hidden = false;
    } else {
      this.#spMedal.hidden = true;
    }
  }

  spPlayBtnClick(){
    console.log("Click!");
    if (EGameStatus.state === EGameStatus.gaming || EGameStatus.state === EGameStatus.heroIsDead || EGameStatus.state === EGameStatus.countDown) {
      return;
    }

    if (EGameStatus.state === EGameStatus.gameOver) {
      resetGameWorld();
      this.resetGameScore();
    }

    EGameStatus.state = EGameStatus.countDown;
    this.#hideGameOverSprites();
    this.#spTitle.hidden = true;
    this.#spPlayBtn.hidden = true;
    this.#spInfoText.index = 0;
    this.#spInfoText.hidden = false;
    this.#spCountDown.visible = true;
    this.#spCountDown.value = 3;
    this.#spGameScore.visible = false;

    if (this.#sfCountDown !== null) {
      this.#sfCountDown.stop();
    }
    if (!soundMuted) {
      this.#sfCountDown = new TSoundFile(fnCountDown);
      this.#sfCountDown.play();
    }
    setTimeout(this.countDown.bind(this), 1000);
  }

}
