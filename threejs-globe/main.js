import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

const scene = new THREE.Scene()
const camera = new THREE.
  PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
  renderer.setSize(innerWidth, innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  document.body.appendChild(renderer.
    domElement)

//sphere
const sphere = new THREE.Mesh(new THREE.
  SphereGeometry(5, 50, 50), new THREE.
  ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/Earth-plantlife.png') //world map, change here
      }
    }
  })
)
scene.add(sphere)

//atmosphere
const atmosphere = new THREE.Mesh(new THREE.
  SphereGeometry(5, 50, 50), new THREE.
  ShaderMaterial({
    vertexShader: atmosphereFragmentShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
)

atmosphere.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere);

const starGeometry =  new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
})

const starVerticies = []
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  starVerticies.push(x, y, z)
}

console.log(starVerticies)
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVerticies, 3))

const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sphere.rotation.y += 0.001 //sphere rotation speed
}

animate()