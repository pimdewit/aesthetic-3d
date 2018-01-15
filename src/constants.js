import { FXAA, Bloom, DepthOfField, LightScattering, Vignette, Noise} from './shaders/shaders';

/**
 * Application settings.
 * @param {HTMLElement} PARENT_ELEMENT Element to append the canvas to.
 */
export const APP_SETTINGS = {
  PARENT_ELEMENT: document.querySelector('#app')
};

/**
 * Materials used in the scene.
 */
export const MATERIALS = {
  SUBJECT: {
    color: 0x212223,
    roughness: 0.5,
    metalness: 1,
    flatShading: true
  },
  FLOOR: {
    color: 0x212223,
    roughness: 0.5,
    metalness: 1,
    flatShading: true
  }
};

/**
 * Settings for the environment.
 * @param {Number} COLOR
 */
export const WORLD_CONFIG = {
  COLOR: 0x030303,
};

/**
 * Config for the UI
 */
export const UI_CONFIG = {
  DRAWER: document.querySelector('.drawer-backdrop'),
  DRAWER_CONTAINER: document.querySelector('.drawer-container'),
  DRAWER_TOGGLE: document.querySelectorAll('[drawer-toggle]'),
  DRAWER_TOGGLE_ACTIVE: 'drawer-toggle--open'
};

/**
 * Settings changeable by the user.
 * @param {Boolean} POST_PROCESSING Flag to enable/disable post shaders.
 */
export const USER_SETTINGS = {
  POST_PROCESSING: true,
  CONTROLS_ENABLED: true,
  SCREEN_DENSITY: window.devicePixelRatio
};

/**
 * passes.
 * @type {Array}
 * @desc The passes will overlay eachother in the same order as the array.
 */
export const POST_PROCESSING_LAYERS = [
  FXAA,
  Bloom,
  Vignette,
  Noise
];
