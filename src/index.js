import { APP_SETTINGS, MATERIALS, WORLD_CONFIG, RENDER_CONFIG, UI_CONFIG, USER_SETTINGS } from './constants';

import loop from 'raf-loop';
import resize from 'brindille-resize';

import { WebGLRenderer, Scene, PerspectiveCamera, PointLight } from 'three';

import { shaderRenderer } from './shaders/shaders';

import WAGNER from '@superguigui/wagner';

import OrbitControls from './controls/OrbitControls';
import Debug from './objects/debug';
import Floor from './objects/floor';
import { Drawer } from './ui/drawer';
import { GUI } from './ui/gui';

const drawer = new Drawer(UI_CONFIG.DRAWER);
UI_CONFIG.DRAWER_TOGGLE.forEach(toggle => drawer.addToggle(toggle));

const gui = new GUI();
gui.objectToList(USER_SETTINGS).then(list => {
  UI_CONFIG.DRAWER_CONTAINER.appendChild(list);
});


/* -------------------------------------------------------------------------- */
/* Init renderer and canvas */
const container = APP_SETTINGS.PARENT_ELEMENT;
const renderer = new WebGLRenderer({
  antialias: RENDER_CONFIG.ANTI_ALIAS,
  powerPreference: RENDER_CONFIG.POWER_PREFERENCE
});

renderer.setClearColor(RENDER_CONFIG.CLEAR_COLOR);
renderer.setPixelRatio(USER_SETTINGS.SCREEN_DENSITY);

container.appendChild(renderer.domElement);

/* Composer for special effects */
const composer = new WAGNER.Composer(renderer);

/* Main scene and camera */
const scene = new Scene();
const camera = new PerspectiveCamera(50, resize.width / resize.height, 0.1, 700);
const controls = new OrbitControls(camera, {
  element: renderer.domElement,
  parent: renderer.domElement,
  distance: 10 });

/* -------------------------------------------------------------------------- */
/* Environment */

/* Add a floor to the scene. */
const floor = new Floor(MATERIALS.FLOOR, -50);
scene.add(floor);

/* Actual content of the scene */
const object = new Debug(3, MATERIALS.SUBJECT);
scene.add(object);

WORLD_CONFIG.LIGHTS.forEach(config => {
  const light = new PointLight(config.COLOR, config.INTENSITY);
  light.position.set(config.X, config.Y, config.Z);
  scene.add(light);
});

/* Various event listeners */
resize.addListener(onResize);

/* Create and launch main loop */
const engine = loop(render);
engine.start();

/* -------------------------------------------------------------------------- */

/**
 * Resize handler.
 */
function onResize() {
  const width = resize.width;
  const height = resize.height;

  const density = USER_SETTINGS.SCREEN_DENSITY;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  composer.setSize(width * density, height * density);
}

/**
 * Animations.
 */
function animate() {
  object.rotation.y += 0.01;
}

/**
 * Render.
 */
function render() {
  if (USER_SETTINGS.CONTROLS_ENABLED) {
    controls.update();
  }

  animate();

  if (USER_SETTINGS.POST_PROCESSING) {
    // Render the visuals through the shader passes.
    shaderRenderer(scene, camera, composer); 
  } else {
    // Render the visuals through the actual scene.
    renderer.render(scene, camera);
  }
}
