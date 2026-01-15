import React from "react";
import Sketch from "react-p5";

const FonsInteractiu = () => {
  let imatges = [];
  let puntsDeDesti = [];
  let particules = [];
  let indexActual = 0;
  let capaVisual;
  let imatgesCarregades = false;

  let velocitatViatge = 8;
  let midaPunt = 2.5;
  let densitatEscaneig = 4;
  let radiInteraccio = 20;

  let tempsViatge = 120;
  let tempsAparicio = 60;
  let tempsSolid = 150;
  let tempsDesaparicio = 60;
  let tempsTotal = tempsViatge + tempsAparicio + tempsSolid + tempsDesaparicio;
  let comptador = 0;

  const preload = (p5) => {
    const rutes = ['/referent1.png', '/referent2.png', '/referent3.png', '/referent4.png'];
    let carregades = 0;
    rutes.forEach((ruta, i) => {
      p5.loadImage(ruta, (img) => {
        imatges[i] = img;
        carregades++;
        if (carregades === rutes.length) imatgesCarregades = true;
      }, (err) => console.error("No s'ha trobat la imatge:", ruta));
    });
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    capaVisual = p5.createGraphics(p5.width, p5.height);
    p5.pixelDensity(1);
  };

  const calcularPunts = (p5, index) => {
    const img = imatges[index];
    if (!img || !img.pixels) return;

    puntsDeDesti = [];
    img.resize(p5.width, p5.height);
    img.loadPixels();

    for (let y = 0; y < p5.height; y += densitatEscaneig) {
      for (let x = 0; x < p5.width; x += densitatEscaneig) {
        let idx = (x + y * p5.width) * 4;
        if (img.pixels[idx] < 150) {
          puntsDeDesti.push(p5.createVector(x, y));
        }
      }
    }
    puntsDeDesti = p5.shuffle(puntsDeDesti);
    
    let diferencia = puntsDeDesti.length - particules.length;
    if (diferencia > 0) {
      for (let i = 0; i < diferencia; i++) particules.push(new Particula(p5));
    } else if (diferencia < 0) {
      particules.splice(puntsDeDesti.length);
    }
  };

  const draw = (p5) => {
    p5.background(245, 243, 235);
    if (!imatgesCarregades || imatges.length === 0) return;

    if (puntsDeDesti.length === 0) calcularPunts(p5, indexActual);

    let faseViatge = (comptador < tempsViatge) || (comptador > tempsTotal - tempsDesaparicio);

    for (let i = 0; i < puntsDeDesti.length; i++) {
      if (!particules[i]) break;
      particules[i].moure(p5, puntsDeDesti[i], faseViatge, radiInteraccio, velocitatViatge);
      particules[i].dibuixar(p5, midaPunt);
    }

    let opacitat = 0;
    if (comptador >= tempsViatge && comptador < tempsViatge + tempsAparicio) {
      opacitat = p5.map(comptador - tempsViatge, 0, tempsAparicio, 0, 255);
    } else if (comptador >= tempsViatge + tempsAparicio && comptador < tempsTotal - tempsDesaparicio) {
      opacitat = 255;
    } else if (comptador >= tempsTotal - tempsDesaparicio) {
      opacitat = p5.map(comptador - (tempsTotal - tempsDesaparicio), 0, tempsDesaparicio, 255, 0);
    }

    if (opacitat > 0 && imatges[indexActual] && capaVisual) {
      capaVisual.clear();
      capaVisual.tint(255, opacitat);
      capaVisual.image(imatges[indexActual], 0, 0, p5.width, p5.height);
      capaVisual.erase();
      capaVisual.ellipse(p5.mouseX, p5.mouseY, radiInteraccio * 2);
      capaVisual.noErase();
      p5.blendMode(p5.MULTIPLY);
      p5.image(capaVisual, 0, 0);
      p5.blendMode(p5.BLEND);
    }

    comptador++;
    if (comptador > tempsTotal) {
      comptador = 0;
      indexActual = (indexActual + 1) % imatges.length;
      calcularPunts(p5, indexActual);
    }
  };

  class Particula {
    constructor(p5) {
      this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
      this.vel = p5.createVector(0, 0);
      this.acc = p5.createVector(0, 0);
    }
    moure(p5, target, actiu, radi, velViatge) {
      let mouse = p5.createVector(p5.mouseX, p5.mouseY);
      let distMouse = this.pos.dist(mouse);
      
      // Ús de mètodes d'instància .sub() en lloc de p5.Vector.sub()
      let desitjat = target.copy().sub(this.pos);
      let distToTarget = desitjat.mag();

      if (!actiu && distMouse > radi && distToTarget < 1) {
        this.pos.set(target);
        this.vel.mult(0);
        return;
      }

      let speed = distToTarget < 100 ? p5.map(distToTarget, 0, 100, 0, velViatge) : velViatge;
      desitjat.setMag(speed);
      
      let steer = desitjat.sub(this.vel);
      steer.limit(0.8);
      this.acc.add(steer);

      if (distMouse < radi) {
        let fuga = this.pos.copy().sub(mouse);
        fuga.setMag(p5.map(distMouse, 0, radi, 3, 0));
        this.acc.add(fuga);
      }
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    dibuixar(p5, mida) {
      p5.noStroke();
      p5.fill(20, 20, 20, 255);
      p5.ellipse(this.pos.x, this.pos.y, mida, mida);
    }
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    capaVisual = p5.createGraphics(p5.width, p5.height);
    if (imatgesCarregades) calcularPunts(p5, indexActual);
  };

  return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} />;
};

export default FonsInteractiu;