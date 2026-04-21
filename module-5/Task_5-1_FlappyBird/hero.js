"use strict";
import { TSprite } from "libSprite";
import { EGameStatus, menu, soundMuted } from "./FlappyBird.mjs";
import { TSineWave } from "lib2d";
import { TSoundFile } from "libSound";

const fnFood = "./Media/food.mp3";
const fnHeroIsDead = "./Media/heroIsDead.mp3";
const fnGameOver = "./Media/gameOver.mp3";

export class THero extends TSprite {
  #gravity;
  #speed;
  #startX;
  #startY;
  #wave;
  #sfFood;
  #sfHeroIsDead;
  #sfGameOver;
  constructor(aSpcvs, aSPI) {
    super(aSpcvs, aSPI, 100, 20);
    this.animationSpeed = 20;
    this.#gravity = 9.81 / 100;
    this.#speed = 0;
    this.#wave = new TSineWave(1, 1);
    this.y += this.#wave.value;
    this.#startX = this.x;
    this.#startY = this.y;
    this.#sfFood = null;
    this.#sfHeroIsDead = null;
    this.#sfGameOver = null;
  }

  eat() {
    if (soundMuted) return;
    if (this.#sfFood === null) {
      this.#sfFood = new TSoundFile(fnFood);
    } else {
      this.#sfFood.stop();
    }
    this.#sfFood.play();
  }

  animate() {
    const hasGravity = EGameStatus.state === EGameStatus.gaming || EGameStatus.state === EGameStatus.heroIsDead;

    if (hasGravity) {
      if (this.y < 400 - this.height) {
        this.#speed += this.#gravity; // increase speed due to gravity
        this.y += this.#speed; // update position based on speed
        if (this.rotation < 90) {
          // limit max rotation
          this.rotation = this.#speed * 25; // tilt down based on speed
        }
      } else {
        EGameStatus.state = EGameStatus.gameOver;
        menu.stopSound();
        this.animationSpeed = 0;
        if (!soundMuted) {
          this.#sfGameOver = new TSoundFile(fnGameOver);
          this.#sfGameOver.play();
        }
      }
    } else if (EGameStatus.state === EGameStatus.idle) {
      this.y += this.#wave.value;
    }
  } // End of animate

  dead(){
    if (soundMuted) return;
    this.#sfHeroIsDead = new TSoundFile(fnHeroIsDead);
    this.#sfHeroIsDead.play();
  }

  flap() {
    this.#speed = -3.5;
    this.rotation = 0;
  }

  restart(){
    this.x = this.#startX;
    this.y = this.#startY;
    this.index = 0;
    this.rotation = 0;
    this.animationSpeed = 20;
    this.#speed = 0;

    if (this.#sfFood !== null) {
      this.#sfFood.stop();
    }
    if (this.#sfHeroIsDead !== null) {
      this.#sfHeroIsDead.stop();
    }
    if (this.#sfGameOver !== null) {
      this.#sfGameOver.stop();
    }
  }
}
