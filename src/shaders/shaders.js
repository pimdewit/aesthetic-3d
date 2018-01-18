import BloomPass from '@superguigui/wagner/src/passes/bloom/MultiPassBloomPass';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';
import Godray from '@superguigui/wagner/src/passes/godray/godraypass';
import DOFPass from '@superguigui/wagner/src/passes/dof/DOFPass';

/**
 * Sharpens the output. Also considered "fake antialiasing".
 * https://www.kotaku.com.au/2011/12/what-is-fxaa/
 */
export const FXAA = new FXAAPass();

/**
 * Bloom creates a "glow" effect when the light intensity is above a certain
 *    threshold in the output, even on areas that are not illuminated.
 */
export const Bloom = new BloomPass({
  blurAmount: 1,
  applyZoomBlur: false
});

/**
 * Strictly speaking, a real camera can only focus clearly on a single
 *    distance at a time. Everything in front of and behind this plane appears
 *    increasingly blurry. The area between the nearest and farthest objects
 *    that appears focused is known as depth of field.
 */
export const DepthOfField = new DOFPass({
  focalPass: 0.1,
  aperture: 0.01
});

/**
 * Also known as "Volumetric Light Scattering".
 * https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch13.html
 */
export const LightScattering = new Godray({
  blurAmount: 0
});

/**
 * "Vignetting" is a reduction of an image's brightness or
 *    saturation toward the periphery compared to the image center.
 */
export const Vignette = new VignettePass({
  reduction: 0.4
});

/**
 * Noise is a form of procedural content generation.
 * In this case it allows for a 2d overlay of pixels being coloured.
 */
export const Noise = new NoisePass({ speed: 0.2, amount: 0.05 });

/**
 * passes.
 * @type {Array}
 * @desc The passes will overlay eachother in the same order as the array.
 */
const POST_PROCESSING_LAYERS = [
  FXAA,
  Bloom,
  Vignette,
  Noise
];

/**
 * Render all shader passes.
 * @param {WAGNER.Composer} composer 
 */
export function shaderRenderer(scene, camera, composer) {
  composer.reset();
  composer.render(scene, camera);

  for (let index = 0; index < POST_PROCESSING_LAYERS.length; index++) {
    const pass = POST_PROCESSING_LAYERS[index];
    composer.pass(pass);
  }

  composer.toScreen();
};
