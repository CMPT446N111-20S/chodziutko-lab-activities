import * as THREE from './vendor/build/three.module.js';

// TODO #0 rename your class and module
export default function MyModel(manager) {
  // TODO #1 set the initial position/scale/orientation of your model
 const self = this;

  this.scale.x = this.scale.y = this.scale.z = 5;
  this.position.x = -5;
  this.position.y = -15;
  this.incr = 0;
  // TODO #2 create the shapes that you'll use to build your model.
  //    I recommend simple, built-in geometries like cube, sphere, etc.
  //    Be sure to choose shapes the fit the object you want to create.
  //    Examples:
  //      - for a hinged pendulum (a la textbook) you might use two Boxes and a Cylinder
  //      - for a Car you might use several Boxes (makes it easier to see the wheels moving!)
  //      - for a Bird might be composed of a sphere/capsule for a body
  //        and two flattened Boxes for wings
  //    Later, once you get it working, you can decide it you want to make it prettier
  // TODO #2a create a base mesh from a simple geometry
    
    //UNICYCLE
    var geometry = new THREE.CircleGeometry( 5, 15 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var circle = new THREE.Mesh( geometry, material );
    //self.
    circle.position.x = 0.25;
    //self.
    circle.position.y = -8;
    self.add( circle );
  // TODO #2b create a second mesh from another geometry
    var geometry = new THREE.CylinderGeometry( 1, 1, 10, 25 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var cylinder = new THREE.Mesh( geometry, material );
    self.add( cylinder );
  // TODO #2c create a third mesh from another geometry
    var geometry = new THREE.BoxGeometry( 8, 1, 5 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = 0
    cube.position.y = 5
    self.add( cube );
  // TODO #2d (Optional) add more meshes if you want to make a more complex object!
    //fuck no


  // TODO #3 assemble the shapes into a hierarchy appropriate for animating your object
  // TODO #3a add the base mesh to your model
  // TODO #3b add the second mesh to your model or the base mesh (depending on your design)
  // TODO #3c add the third mesh to your model, the base, or the second mesh (depending on your design)
  // TODO #3d (Optional) attach more meshes to make a more complex object!

  // TODO #4 apply transformations to each mesh in order achieve the desired position/sizing/orientation

  // TODO #5 create and assign materials to your meshes to give your object some character!
}

MyModel.prototype = new THREE.Object3D();

MyModel.prototype.animate = function () {
  // TODO #6 update transformations on each node of your model
  // appropriately to yield the desired animation(s)
  //    Examples:
  //      - for a hinged pendulum (a la textbook) you might increment the rotations on the arms
  //      - for a Car increment the translation on the top-level node and the rotations on the wheel nodes
  //      - for a Bird increment the translation on the top-level node, a vertical "bob" translation on the
  //        body node, and rotations (with limited range) on the wing nodes
}

// TODO #7 (Optional) add additional methods for updating transformations
// on your model for use with input controls for user interaction