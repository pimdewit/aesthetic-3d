import { Object3D, PlaneBufferGeometry, MeshStandardMaterial, Mesh } from 'three';

export default class Floor extends Object3D {
  constructor(materialOptions, y) {
    super();

    const geometry = new PlaneBufferGeometry(1000, 1000);
    const material = new MeshStandardMaterial(materialOptions);
    const mesh = new Mesh(geometry, material);

    this.add(mesh);

    // Rotate the floor so it is facing the y+ axis.
    mesh.rotation.x = -90;

    mesh.position.y = y;
    mesh.receiveShadow = true;
  }
}
