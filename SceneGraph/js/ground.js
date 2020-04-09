import * as THREE from './vendor/build/three.module.js';

export default function Ground(x, y, z) {
  THREE.Mesh.call(this, this.geometry, new THREE.MeshLambertMaterial());
    this.position.x = 0;
  this.position.y = -84;
  this.position.z = 0;
  const self = this;
     new THREE.TextureLoader().load('./textures/rough_asphalt_tile.jpg', texture => {
    self.texture = texture;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(500, 50);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    self.material = new THREE.MeshLambertMaterial({
      map: texture
    });
  });
};

Ground.prototype = Object.create(THREE.Mesh.prototype);
//Ground.prototype.geometry = new THREE.PlaneGeometry(10000, 0.1, 10000, 1, 1, 1);
Ground.prototype.geometry = new THREE.PlaneGeometry(1000, 1000).rotateX(-90 *(Math.PI/180));
// TODO #1 all Ground objects should have a Plane geometry