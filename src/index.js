import loop from 'raf-loop';
import resize from 'brindille-resize';

import { APP_SETTINGS, MATERIALS, WORLD_CONFIG, UI_CONFIG, USER_SETTINGS, PASSES } from './constants';

import { WebGLRenderer, Scene, PerspectiveCamera, PointLight, AmbientLight, BoxBufferGeometry, MeshStandardMaterial, Mesh } from 'three';
import WAGNER from '@superguigui/wagner';

import OrbitControls from './controls/OrbitControls';

import Torus from './objects/Torus';
import Debug from './objects/debug';
import Floor from './objects/floor';

import { keyToId, keyToText, createFunctionalCheckbox } from './common/common';
import { Drawer } from './ui/drawer';
import { GUI } from './ui/gui';

const drawer = new Drawer(UI_CONFIG.DRAWER);
drawer.addToggle(UI_CONFIG.DRAWER_TOGGLE);

const gui = new GUI();
gui.objectToList(USER_SETTINGS).then(list => {
  UI_CONFIG.DRAWER_CONTAINER.appendChild(list);
});


/* Init renderer and canvas */
const container = APP_SETTINGS.PARENT_ELEMENT;

const renderer = new WebGLRenderer({antialias: true});
renderer.setClearColor(WORLD_CONFIG.COLOR);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

/* Composer for special effects */
const composer = new WAGNER.Composer(renderer);

/* Main scene and camera */
const scene = new Scene();
const camera = new PerspectiveCamera(50, resize.width / resize.height, 0.1, 700);
const controls = new OrbitControls(camera, {element: renderer.domElement, parent: renderer.domElement, distance: 10 });

/* Lights */
const frontLight = new PointLight(0xFFFFFF, 1);
frontLight.position.y = 200;
scene.add(frontLight);

const backLight = new PointLight(0xFFFFFF, 0.1);
backLight.position.y = -20;
scene.add(backLight);


/* Add a floor to the scene. */
const floor = new Floor(MATERIALS.FLOOR, -50);
scene.add(floor);


/* Actual content of the scene */
const object = new Debug(3, MATERIALS.SUBJECT);
scene.add(object);

/* Various event listeners */
resize.addListener(onResize);

/* create and launch main loop */
const engine = loop(render);
engine.start();

/* -------------------------------------------------------------------------------- */

/**
  Resize canvas
*/
function onResize() {
  console.log(resize.width, resize.height);
  camera.aspect = resize.width / resize.height;
  camera.updateProjectionMatrix();
  renderer.setSize(resize.width, resize.height);
  composer.setSize(resize.width * window.devicePixelRatio, resize.height * window.devicePixelRatio);
}

/**
  Render loop
*/
function render(dt) {
  if (USER_SETTINGS.CONTROLS_ENABLED) {
    controls.update();
  }

  object.rotation.y += 0.01;

  if (USER_SETTINGS.POST_PROCESSING) {
    composer.reset();
    composer.render(scene, camera);

    for (let index = 0; index < PASSES.length; index++) {
      const pass = PASSES[index];
      composer.pass(pass);
    }

    composer.toScreen();
  } else {
    renderer.render(scene, camera);
  }
}
