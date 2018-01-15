/* Constants, settings - mainly here to prevent "magic numbers". */
import { APP_SETTINGS, MATERIALS, WORLD_CONFIG, UI_CONFIG, USER_SETTINGS, PASSES } from './constants';

/** To avoid unneccesary hassle. */
import loop from 'raf-loop';
import resize from 'brindille-resize';

/** Import the components from THREE needed to run an environment. */
import { WebGLRenderer, Scene, PerspectiveCamera, PointLight } from 'three';

/** https://github.com/spite/Wagner */
import WAGNER from '@superguigui/wagner';

/** One of THREE's controls modules. */
import OrbitControls from './controls/OrbitControls';

/** Objects to display in our scene. */
import Debug from './objects/debug';
import Floor from './objects/floor';

/** UI Elements (heavy WIP) */
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
renderer.setPixelRatio(USER_SETTINGS.SCREEN_DENSITY);

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

/* Create and launch main loop */
const engine = loop(render);
engine.start();

/* -------------------------------------------------------------------------- */

/**
 * Resize canvas
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

function render() {
  if (USER_SETTINGS.CONTROLS_ENABLED) {
    controls.update();
  }

  object.rotation.y += 0.01; // for the lulz

  if (USER_SETTINGS.POST_PROCESSING) {
    composer.reset();
    composer.render(scene, camera);

    for (let index = 0; index < POST_PROCESSING_LAYERS.length; index++) {
      const pass = POST_PROCESSING_LAYERS[index];
      composer.pass(pass);
    }

    composer.toScreen();
  } else {
    renderer.render(scene, camera);
  }
}
