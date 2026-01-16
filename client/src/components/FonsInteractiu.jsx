import React, { useEffect, useRef } from "react";
import p5 from "p5";

const FonsInteractiu = () => {
  const containerRef = useRef();
  const canvasRef = useRef(null);

  useEffect(() => {
    // Evitem duplicats en Strict Mode
    if (canvasRef.current) return;

    const sketch = (p) => {
      let imatges = [];
      let puntsDeDesti = [];
      let particules = [];
      let indexActual = 0;
      let capaVisual;
      let pinzellDifuminat;
      let imatgesCarregades = false;

      let velocitatViatge = 8;
      let midaPunt = 2.5;
      let densitatEscaneig = 2;
      let radiInteraccio = 40;
      let tempsTotal = 390; 
      let comptador = 0;

      // En p5.js 2.0, les rutes han de ser asíncrones dins de setup
      p.setup = async () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(containerRef.current);
        capaVisual = p.createGraphics(p.width, p.height);

        // 1. CARREGA D'IMATGES (Nova sintaxi asíncrona)
        try {
          const promeses = [];
          for (let i = 1; i <= 5; i++) {
            promeses.push(p.loadImage(`/img/referents/referent${i}.png`));
          }
          imatges = await Promise.all(promeses);
          
          // Ajustem al format Cover
          for (let i = 0; i < imatges.length; i++) {
            imatges[i] = ajustarImatgeCover(imatges[i]);
            imatges[i].loadPixels();
          }
          
          calcularPunts(0);
          imatgesCarregades = true;
          console.log("Imatges carregades i processades");
        } catch (e) {
          console.error("Error carregant les imatges:", e);
        }

        // 2. PINZELL DIFUMINAT
        let mida = radiInteraccio * 4;
        pinzellDifuminat = p.createGraphics(mida, mida);
        let ctx = pinzellDifuminat.drawingContext;
        let gradient = ctx.createRadialGradient(mida/2, mida/2, 0, mida/2, mida/2, mida/2);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, mida, mida);
      };

      function ajustarImatgeCover(img) {
        let escala = Math.max(p.width / img.width, p.height / img.height);
        let novaW = img.width * escala;
        let novaH = img.height * escala;
        let temp = p.createImage(p.width, p.height);
        temp.copy(img, 0, 0, img.width, img.height, (p.width - novaW)/2, (p.height - novaH)/2, novaW, novaH);
        return temp;
      }

      p.draw = () => {
        // No dibuixem res fins que les imatges estiguin llestes
        if (!imatgesCarregades) {
          p.background(245, 243, 235);
          return;
        }

        p.background(245, 243, 235);
        let estemEnViatge = comptador < 120 || comptador > 330;

        // 3. MOVIMENT PARTÍCULES
        for (let i = 0; i < puntsDeDesti.length; i++) {
          if (particules[i]) {
            particules[i].moure(puntsDeDesti[i], estemEnViatge);
            particules[i].dibuixar();
          }
        }

        // 4. EFECTE DIFUMINAT
        capaVisual.clear();
        capaVisual.image(imatges[indexActual], 0, 0);
        capaVisual.drawingContext.globalCompositeOperation = 'destination-out';
        capaVisual.image(pinzellDifuminat, p.mouseX - pinzellDifuminat.width/2, p.mouseY - pinzellDifuminat.height/2);
        capaVisual.drawingContext.globalCompositeOperation = 'source-over';
        
        p.blendMode(p.MULTIPLY);
        p.image(capaVisual, 0, 0);
        p.blendMode(p.BLEND);

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
        if (!img || !img.pixels) return;
        
        for (let y = 0; y < p.height; y += densitatEscaneig) {
          for (let x = 0; x < p.width; x += densitatEscaneig) {
            let idx = (x + y * p.width) * 4;
            if (img.pixels[idx] < 150) puntsDeDesti.push(p.createVector(x, y));
          }
        }
        while (particules.length < puntsDeDesti.length) {
          particules.push(new Particula());
        }
      }

      class Particula {
        constructor() {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p.createVector(0,0);
          this.acc = p.createVector(0,0);
        }
        moure(target, viatge) {
          let mouse = p.createVector(p.mouseX, p.mouseY);
          let dMouse = this.pos.dist(mouse);
          let dTarget = this.pos.dist(target);
          if (!viatge && dMouse > 80 && dTarget < 1) return;

          let seek = p5.Vector.sub(target, this.pos);
          seek.setMag(viatge ? 8 : p.map(p.constrain(dTarget, 0, 100), 0, 100, 0, 8));
          this.acc.add(p5.Vector.sub(seek, this.vel).limit(0.8));

          if (dMouse < 60) {
            let escape = p5.Vector.sub(this.pos, mouse).setMag(2);
            this.acc.add(escape);
          }
          this.vel.add(this.acc).limit(10);
          this.pos.add(this.vel);
          this.acc.mult(0);
        }
        dibuixar() {
          p.noStroke();
          p.fill(20, 20, 20);
          p.ellipse(this.pos.x, this.pos.y, midaPunt);
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    canvasRef.current = new p5(sketch);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
        canvasRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100vw", 
        height: "100vh", 
        zIndex: -1, 
        backgroundColor: "#f5f3eb" 
      }} 
    />
  );
};

export default FonsInteractiu;