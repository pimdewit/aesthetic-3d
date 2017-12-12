import { Object3D, TetrahedronGeometry, BoxBufferGeometry, MeshStandardMaterial, Mesh } from 'three';

export default class Debug extends Object3D {
  constructor(detail, materialOptions) {
    super();

    const geometry = new TetrahedronGeometry(1, detail);
    const material = new MeshStandardMaterial(materialOptions);
    const mesh = new Mesh(geometry, material);

    this.add(mesh);
  }
}
