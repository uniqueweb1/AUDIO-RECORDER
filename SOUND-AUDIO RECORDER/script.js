
const canvasContainer = document.querySelector("#canvas-container");

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('webgl');
let audioSource;
let analyser;

container.addEventListener('click', function() {
    audio.play();
})