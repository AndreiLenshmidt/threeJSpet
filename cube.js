import * as THREE from "three";

const scene = new THREE.Scene();
// Создаем оси координат и добавляем их на экран (сцену)
const axisHelper = new THREE.AxesHelper(3);
scene.add(axisHelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
// Создаем три куба
const cube1 = new THREE.Mesh(geometry, material);
cube1.position.x = -2;
const cube2 = new THREE.Mesh(geometry, material);
cube2.position.x = 0;
const cube3 = new THREE.Mesh(geometry, material);
cube3.position.x = 2;
// Группирум три куба в одну группу
const group = new THREE.Group();
group.add(cube1).add(cube2).add(cube3);

scene.add(group);
camera.position.z = 5;

// group.rotation.reorder("YXZ");

function animate() {
  // вращаем всю группу разом
  group.rotation.x += 0.01;
  group.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Масштабирование объекта колесом мыши
document.addEventListener("wheel", (e) => {
  //   console.log(e);
  if (e.deltaY < -1) {
    camera.position.z = camera.position.z - 1;
  } else {
    camera.position.z = camera.position.z + 1;
  }
});
