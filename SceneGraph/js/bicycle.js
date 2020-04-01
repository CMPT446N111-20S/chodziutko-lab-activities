import * as THREE from './vendor/build/three.module.js';
import {
  GLTFLoader
} from './vendor/examples/jsm/loaders/GLTFLoader.js';

const ONEDEGREE = Math.PI / 180;
const MAXTURN = 80 * ONEDEGREE;
const MINTURN = -MAXTURN;
const BIKESCALE = 10;
const WHEELRAD = 1.25 * BIKESCALE;

export default function Bicycle(manager) {
  const self = this;

  this.scale.x = this.scale.y = this.scale.z = BIKESCALE;
  this.position.x = -21;
  this.position.y = -10;
  this.incr = 0;

  const loader = new GLTFLoader(manager).setPath('./models/');
  loader.load('frame.gltf', function (gltf) {
    const frame = gltf.scene;
    frame.position.x = 0;
    self.add(frame);

    loader.load('wheel.gltf', function (gltf) {
      self.rearWheel = gltf.scene;
      self.rearWheel.incr = 0;
      self.rearWheel.position.x = -0.1;
      self.rearWheel.position.y = 0;
      frame.add(self.rearWheel);

      loader.load('steeringAssembly.gltf', function (gltf) {
        self.steeringAssembly = gltf.scene;

        const steeringAssemblyGroup = new THREE.Object3D();
        steeringAssemblyGroup.position.x = 3.3;
        steeringAssemblyGroup.position.y = 1.35;
        steeringAssemblyGroup.rotation.z = 20 * ONEDEGREE;

        steeringAssemblyGroup.add(self.steeringAssembly);
        frame.add(steeringAssemblyGroup);

        loader.load('wheel.gltf', function (gltf) {
          self.frontWheel = gltf.scene;
          self.frontWheel.incr = 0;
          self.frontWheel.position.x = 0.25;
          self.frontWheel.position.y = -1.55;
          self.steeringAssembly.add(self.frontWheel);

          self.buildGUI();
        })
      });
    });
  });
}
Bicycle.prototype = new THREE.Object3D();

Bicycle.prototype.animate = function () {
  this.incr = -WHEELRAD * this.rearWheel.incr;
  this.frontWheel.incr = this.rearWheel.incr / Math.cos(this.steeringAssembly.rotation.y);
  this.frontWheel.rotation.z -= this.frontWheel.incr;
  this.rearWheel.rotation.z -= this.rearWheel.incr;
  this.rotation.y += Math.atan(1.25 * this.frontWheel.incr * Math.sin(this.steeringAssembly.rotation.y) / 3.6);
  this.position.x -= this.incr * Math.cos(this.rotation.y);
  this.position.z += this.incr * Math.sin(this.rotation.y);
}

Bicycle.prototype.pedalFwd = function () {
  this.rearWheel.incr += ONEDEGREE;
}

Bicycle.prototype.pedalRev = function () {
  this.rearWheel.incr -= ONEDEGREE;
}

Bicycle.prototype.turnRight = function () {
  if (this.steeringAssembly.rotation.y < MAXTURN) {
    this.steeringAssembly.rotation.y += ONEDEGREE;
  }
}

Bicycle.prototype.turnLeft = function () {
  if (this.steeringAssembly.rotation.y > MINTURN) {
    this.steeringAssembly.rotation.y -= ONEDEGREE;
  }
}

Bicycle.prototype.buildGUI = function () {
  var gui = new dat.GUI();
  var bikeFolder = gui.addFolder('Bicycle');
  bikeFolder.add(this.rearWheel, 'incr', MINTURN / 4, MAXTURN / 4).listen();
  bikeFolder.add(this.steeringAssembly.rotation, 'y', MINTURN, MAXTURN).listen();
  bikeFolder.open();
}
