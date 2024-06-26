const canvas = document.querySelector('.canvas-holder canvas');

const calcSize = () => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  let dpi = window.devicePixelRatio;
  
  let size = Math.max(w, h);
  
  canvas.width = size * dpi;
	canvas.height = size * dpi;
  canvas.style.width = size + 'px'
  canvas.style.height = size + 'px'
  
}

const sandbox = new GlslCanvas(canvas);
sandbox.load(frag)

const textures = ["images/trails.jpg", "images/light.jpg", "images/distress.jpeg"]
let current = 0

const setTexture = () => {
  current += 1
  if (current == textures.length ) current = 0
  sandbox.setUniform("trails", textures[current]);
}
canvas.addEventListener('click', setTexture)

window.addEventListener('load', () => {
  calcSize()
  sandbox.setUniform("trails", textures[current]);
});

window.addEventListener('resize', calcSize)

