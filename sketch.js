const xBackground = 600
const yBackground = 400

let xBolinha = 300
let yBolinha = 200
let diametroBolinha = 15
let raio = diametroBolinha / 2
let velocidadeXBolinha = 5
let velocidadeYBolinha = 5

const larguraRaquete = 10
const alturaRaquete = 100

let xRaquete1 = 1
let yRaquete1 = 150

let xRaquete2 = 585
let yRaquete2 = 150
let velocidadeRaquete2

let colisao = false

let pontos1 = 0
let pontos2 = 0

let chanceDeErrar = 0

let somRaquete
let somPonto
let somTrilha

function preload() {
  somTrilha = loadSound("trilha.mp3")
  somPontos = loadSound("ponto.mp3")
  somRaquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  somTrilha.loop()
}

function draw() {
  background(0);
  bolinha()
  moverBolinha()
  verificarBolinhaBorda()
  
  colisaoRaquete(xRaquete1, yRaquete1)
  moverRaquete1()
  raquete(xRaquete1, yRaquete1)
  
  colisaoRaquete(xRaquete2, yRaquete2)
  moverRaquete2()
  raquete(xRaquete2, yRaquete2)
  
  ponto()
  placar()
}

function bolinha () {
  circle(xBolinha, yBolinha , diametroBolinha);
}

function moverBolinha() {
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}

function verificarBolinhaBorda () {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1
    somPontos.play()
    
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1    
  }
}

function raquete(x ,y) {
  rect(x, y, larguraRaquete, alturaRaquete)
}

function moverRaquete1() {
  if (keyIsDown(UP_ARROW)){
    yRaquete1 -= 10    
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaquete1 += 10    
  }
}

// Player 2
/*function moverRaquete2() {
  if (keyIsDown(87){
    yRaquete2 -= 10    
  }
  
  if (keyIsDown(83)){
    yRaquete2 += 10    
  }
}*/

function moverRaquete2() {
  velocidadeRaquete2 = yBolinha - yRaquete2 - alturaRaquete / 2 - 30
  yRaquete2 += velocidadeRaquete2
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontos2 >= pontos1) {
      chanceDeErrar += 1
    
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
    
  } else {
      chanceDeErrar -= 1
    
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

function colisaoRaquete(x, y) {
  colisao = collideRectCircle(x, y, larguraRaquete, alturaRaquete , xBolinha, yBolinha, raio)
  
  if (colisao) {
    velocidadeXBolinha *= -1
    somRaquetada.play()
  }
}

function placar(pontos, x, y) {
  stroke(255)
  textAlign(CENTER)
  textSize(20)
  
  fill(color(255, 140, 0))
  rect(130, 5, 40, 30)
  fill(255)
  text(pontos1, 150, 26)
  
  
  fill(color(255, 140, 0))
  rect(430, 5, 40, 30)
  fill(255)
  text(pontos2, 450, 26)
}

function ponto () {
  if (xBolinha > 590) {
    pontos1 += 1
    xBolinha = 300
  }
  
  if (xBolinha < 10) {
    pontos2 += 1
    xBolinha = 300
  }
}