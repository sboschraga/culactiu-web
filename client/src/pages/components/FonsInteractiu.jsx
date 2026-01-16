import React, { useEffect, useRef } from "react";
import p5 from "p5";

const FonsInteractiu = () => {
  const containerRef = useRef();
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. BLOCATGE CRÍTIC: Si ja existeix el canvas, no en creis un de nou.
    // Això evita que React Strict Mode dupliqui el procés.
    if (canvasRef.current) return;

    const sketch = (p) => {
      let imatges = [];
      let puntsDeDesti = [];
      let particules = [];
      let indexActual = 0;
      let capaVisual;
      let pinzellDifuminat;

      // CONFIGURACIÓ ORIGINAL
      let velocitatViatge = 8;
      let midaPunt = 2.5;
      let densitatEscaneig = 2;
      let radiInteraccio = 10;

      let tempsViatge = 120;
      let tempsAparicio = 60;
      let tempsSolid = 150;
      let tempsDesaparicio = 60;
      let tempsTotal = tempsViatge + tempsAparicio + tempsSolid + tempsDesaparicio;
      let comptador = 0;

      p.preload = () => {
        for (let i = 1; i <= 5; i++) {
          imatges.push(p.loadImage(`/img/referents/referent${i}.png`));
        }
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(containerRef.current);
        
        // 2. RENDIMENT CRÍTIC: Forcem que dibuixi 1 píxel per cada píxel real.
        // Sense això, en Mac o pantalles 4K el lag és inevitable.
        p.pixelDensity(1); 
        
        capaVisual = p.createGraphics(p.width, p.height);
        capaVisual.pixelDensity(1);

        let mida = radiInteraccio * 4;
        pinzellDifuminat = p.createGraphics(mida, mida);
        let ctx = pinzellDifuminat.drawingContext;
        let gradient = ctx.createRadialGradient(mida/2, mida/2, 0, mida/2, mida/2, mida/2);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(0.25, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, mida, mida);

        for (let img of imatges) {
          img.resize(p.width, p.height);
          img.loadPixels();
        }
        calcularPunts(0);
      };

      p.draw = () => {
        p.background(245, 243, 235);

        let estemEnFaseViatge = (comptador < tempsViatge) || (comptador > tempsTotal - tempsDesaparicio);

        for (let i = 0; i < puntsDeDesti.length; i++) {
          if (!particules[i]) break;
          particules[i].moure(puntsDeDesti[i], estemEnFaseViatge);
          particules[i].dibuixar();
        }

        let opacitat = 0;
        if (comptador < tempsViatge) opacitat = 0;
        else if (comptador < tempsViatge + tempsAparicio) opacitat = p.map(comptador - tempsViatge, 0, tempsAparicio, 0, 255);
        else if (comptador < tempsTotal - tempsDesaparicio) opacitat = 255;
        else opacitat = p.map(comptador - (tempsTotal - tempsDesaparicio), 0, tempsDesaparicio, 255, 0);

        if (opacitat > 0) {
          capaVisual.clear();
          capaVisual.tint(255, opacitat);
          capaVisual.image(imatges[indexActual], 0, 0, p.width, p.height);
          capaVisual.drawingContext.globalCompositeOperation = 'destination-out';
          capaVisual.image(pinzellDifuminat, p.mouseX - pinzellDifuminat.width/2, p.mouseY - pinzellDifuminat.height/2);
          capaVisual.drawingContext.globalCompositeOperation = 'source-over';
          
          p.blendMode(p.MULTIPLY);
          p.image(capaVisual, 0, 0);
          p.blendMode(p.BLEND);
        }

        comptador++;
        if (comptador > tempsTotal) {
          comptador = 0;
          indexActual = (indexActual + 1) % imatges.length;
          calcularPunts(indexActual);
        }
      };

      function calcularPunts(index) {
        puntsDeDesti = [];
        let img = imatges[index];
        if(!img || !img.pixels) return;

        for (let y = 0; y < p.height; y += densitatEscaneig) {
          for (let x = 0; x < p.width; x += densitatEscaneig) {
            let idx = (x + y * p.width) * 4;
            if (img.pixels[idx] < 150) puntsDeDesti.push(p.createVector(x, y));
          }
        }
        puntsDeDesti = p.shuffle(puntsDeDesti);
        
        while (particules.length < puntsDeDesti.length) particules.push(new Particula());
        if (particules.length > puntsDeDesti.length) particules.splice(puntsDeDesti.length);
      }

      class Particula {
        constructor() {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p.createVector(0, 0);
          this.acc = p.createVector(0, 0);
        }
        moure(target, actiu) {
          let mouse = p.createVector(p.mouseX, p.mouseY);
          let distMouse = this.pos.dist(mouse);
          let distToTarget = this.pos.dist(target);

          if (!actiu && distMouse > radiInteraccio * 2 && distToTarget < 1) {
            this.pos.set(target.x, target.y);
            this.vel.mult(0);
            return;
          }

          let desitjat = p5.Vector.sub(target, this.pos);
          let dist = desitjat.mag();
          let speed = (dist < 100) ? p.map(dist, 0, 100, 0, velocitatViatge) : velocitatViatge;
          desitjat.setMag(speed);
          
          let steer = p5.Vector.sub(desitjat, this.vel);
          steer.limit(0.8);
          this.acc.add(steer);

          if (distMouse < radiInteraccio * 1.5) {
            let repulsion = p5.Vector.sub(this.pos, mouse);
            repulsion.setMag(p.map(distMouse, 0, radiInteraccio * 1.5, 2, 0));
            this.acc.add(repulsion);
          }

          this.vel.add(this.acc);
          this.pos.add(this.vel);
          this.acc.mult(0);
        }
        dibuixar() {
          p.noStroke();
          p.fill(20, 20, 20);
          p.ellipse(this.pos.x, this.pos.y, midaPunt, midaPunt);
        }
      }

      // 3. OPTIMITZACIÓ DE RESIZE: No cridem setup() sencers, només ajustem canvas.
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    canvasRef.current = new p5(sketch);
    return () => canvasRef.current.remove();
  }, []);

  return <div ref={containerRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
};

export default FonsInteractiu;