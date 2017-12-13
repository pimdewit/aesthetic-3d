import BloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import Godray from '@superguigui/wagner/src/passes/godray/godraypass';
import DOFPass from '@superguigui/wagner/src/passes/dof/DOFPass';

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
  DRAWER_TOGGLE: document.querySelector('.drawer-toggle'),
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
export const PASSES = [
  new FXAAPass(),
  new BloomPass({ blurAmount: 1, applyZoomBlur: false }),
  new DOFPass({ focalPass: 0.1, aperture: 0.01 }),
  // new Godray({ blurAmount: 0 }),
  new VignettePass({ reduction: 0.4 }),
  new NoisePass({ speed: 0.2, amount: 0.05 })
];