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
const cube = new THREE.Mesh(geometry, material);
// изменяем позицию объекта
cube.position.x = -1;
cube.position.y = 2;
cube.position.z = 1;
// длина вектора
console.log("длина вектора", cube.position.length());
// расстояние до другого вектора
console.log(
  "расстояние до другого вектора",
  cube.position.distanceTo(camera.position)
);
// нормализованное значение
console.log("нормализованное значение", cube.position.normalize());
// быстрое изменение координат
console.log("быстрое изменение координат", cube.position.set(0, 0, 0));

// изменяем масшаб объкта по осям:
cube.scale.x = 0.5;
cube.scale.y = 1.2;
cube.scale.z = 0.6;
// изменяем масшаб объкта по всем осям:
cube.scale.set(1, 1, 1);

scene.add(cube);
// Позиция камеры ближе/дальше от экрана, при 0 камера внутри объекта
camera.position.z = 5;
// Позиция обзора камеры lookAt передаем вектор или позицию
// camera.lookAt(new THREE.Vector3(2, 0, 0));
// camera.lookAt(cube.position);

function animate() {
  //  Изменить порядок вращения по умолчанию позволяет свойство reorder
  //   cube.rotation.reorder("XYZ");
  // вращаем объект при помощи свойства rotation. Порядок вращения по умолчанию : XYZ
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

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
