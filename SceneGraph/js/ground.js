import * as THREE from './vendor/build/three.module.js';

export default function Ground(x, y, z) {
  THREE.Mesh.call(this, this.geometry, new THREE.MeshLambertMaterial());
    this.position.x = 20;
  this.position.y = -24;
  this.position.z = 1;
  const self = this;
  // TODO #2 position your object

  // TODO #3 load a texture image and assign a new material using that texture
    console.log("1")
     new THREE.TextureLoader().load('./textures/rough_asphalt_tile.jpg', texture => {
    self.texture = texture;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 50);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    self.material = new THREE.MeshLambertMaterial({
      map: texture
    });
  });
};

Ground.prototype = Object.create(THREE.Mesh.prototype);
 console.log("2")
Ground.prototype.geometry = new THREE.PlaneGeometry(10000, 0.1, 10000, 1, 1, 1);
 console.log("3")
// TODO #1 all Ground objects should have a Plane geometry