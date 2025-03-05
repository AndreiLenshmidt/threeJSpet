import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

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
camera.position.set(0, 2, 5);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#444",
    metalness: 0,
    roughness: 0.5,
  })
);
// Добавляем встроенный контроллер, позволяет вращать модельку мышью
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// Добавляем плоскость
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);
// Добавляем источник света
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(dirLight);
// Функция загружает модельку на страницу, принимает 4 параметра, url, колбек успешной загрузки, колбек прогресс зпрузки, колбек неудачи
const loader = new GLTFLoader();
loader.load(
  "/FinalBaseMesh.gltf",
  (gltf) => {
    gltf.scene.children[0].scale.set(8, 8, 8);
    scene.add(gltf.scene.children[0]);
    // console.log("suscess");
    // console.log(gltf);
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

function animate() {
  //  Изменить порядок вращения по умолчанию позволяет свойство reorder
  //   cube.rotation.reorder("XYZ");
  // вращаем объект при помощи свойства rotation. Порядок вращения по умолчанию : XYZ
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Масштабирование объекта колесом мыши
// document.addEventListener("wheel", (e) => {
//   //   console.log(e);
//   if (e.deltaY < -1) {
//     camera.position.z = camera.position.z - 1;
//   } else {
//     camera.position.z = camera.position.z + 1;
//   }
// });
