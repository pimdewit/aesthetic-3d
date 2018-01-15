import { FXAA, Bloom, DepthOfField, LightScattering, Vignette, Noise} from './shaders/shaders';

/**
 * Application settings.
 * @param {HTMLElement} PARENT_ELEMENT Element to append the canvas to.
 */
export const APP_SETTINGS = {
  PARENT_ELEMENT: document.querySelector('#app')
};

const THEME = 'dark'; // 'dark', 'light', 'environment'

const COLOR = {
  MAIN: 0x212223,
  LIGHT: 0xffffff,
  BACKGROUND: {
    DARK: 0x030303,
    LIGHT: 0xf2f3f4
  }
};

/**
 * Settings for the renderer.
 * @param {Boolean} ANTI_ALIAS
 * @param {String} POWER_PREFERENCE Provides a hint to the user agent
 *     indicating what configuration of GPU is suitable for this WebGL context.
 *     Can be "high-performance", "low-power" or "default".
 * @param {String} CLEAR_COLOR Hexadecimal color to clear the canvas with.
 */
export const RENDER_CONFIG = {
  ANTI_ALIAS: true,
  POWER_PREFERENCE: 'high-performance',
  CLEAR_COLOR: COLOR.BACKGROUND.DARK // THEME ? THEME[WORLD_CONFIG.THEME_ID] : COLOR.BACKGROUND.DARK
};

/**
 * Materials used in the scene.
 */
export const MATERIALS = {
  SUBJECT: {
    color: COLOR.MAIN,
    roughness: 0.5,
    metalness: 1,
    flatShading: true
  },
  FLOOR: {
    color: COLOR.MAIN,
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
  COLOR: COLOR.BACKGROUND.DARK,
  LIGHTS: [
    {
      COLOR: COLOR.LIGHT,
      INTENSITY: 1,
      X: 0,
      Y: 200,
      Z: 0
    },
    {
      COLOR: COLOR.LIGHT,
      INTENSITY: 0.1,
      X: 0,
      Y: -20,
      Z: 0
    }
  ]
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
