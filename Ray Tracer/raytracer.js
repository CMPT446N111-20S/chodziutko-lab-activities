import {degreesToRadians} from "./genmath.js";
import * as Vec from "./vecmath.js";
/* Scene representation */
export function Scene(surface) {
  this.image = document.getElementById("viewport"); // HTML5 canvas element serving as render buffer
  this.surface = surface; // a Surface object (must have a valid intersect method)
  this.backgroundColor = [0.5, 0.5, 0.5]; // default background color when no intersection is found
  
    this.camera = { // simple definition for a linear-perspective viewer
  
    aspect: this.image.width / this.image.height,
    fov: degreesToRadians(60),
    // eye/camera position
    e: [ 0, 0, 0 ],
    // basis vector for camera coordinate frame
    u: [ 1, 0, 0 ],
    v: [ 0, 1, 0 ],
    w: [ 0, 0, 1 ],
    // distance to the image/view plane
    d: 1
  };
    ///
    //
    // !!!!!!!
    //
    // q - p(t) light vector
    //point in direc†ion of camera
    //w points toward user
    // l = (0, 0, 1), (0,1,0), (1,0,0)
    //whats normalization
    //I ranges between 0-1
    //do the entire thing three time
    this.light = {
    p: [0,1,0],
    i: 0.75
    }
   
}

/* Generate viewing ray through the pixel with given coordinates */
Scene.prototype.project = function(i, j) {
  // TODO compute u and v
    //u = x, v = y, w = z
  const top = Math.tan(this.camera.fov / 2);
  const right = top * this.camera.aspect; //top * this.image.width
  const bottom = -top; // -(Math.tan(this.camera.fov/2))
  const left = -right; // -(top * aspect)
  const u = left + (right - left) * (i + 0.5)/ this.image.width;
  const v = top - (top - bottom) * (j + 0.5)/this.image.height;

  return {
    // TODO use u and v to compute the ray direction
    direction: Vec.add(Vec.add(Vec.mult(-this.camera.d, this.camera.w),Vec.mult(u, this.camera.u)), Vec.mult(v, this.camera.v)),
    //direction: undefined
      // TODO ray origin for perspective viewing is just the eye position
    origin: this.camera.e
      //^^^ that should be right but i be getting errors
      //origin: 0
      //origin: undefined
      //math do be hard sometimes
  };
};

/* Compute the shaded color for the given object intersection. (For now, this is just a solid color.) */
Scene.prototype.shade = function(hit, ray) {
  // TODO In the event of a hit return the color of the intersecting object.
  //  Otherwise return the background color.
    // diffuse shading: color = k(d) (object.color) * I(intensity of light) * max(0,n.l)
    
    //let l = [0,1,0];
    
   
    //const h =
    if (hit){
        var l = Vec.norm(Vec.diff(this.light.p, hit.p));
        const v = Vec.norm(Vec.diff(this.camera.e, hit.p));
        const h = (Vec.norm(Vec.add(v,l)));
        // TODO compute normal vector n
        
        const n = hit.object.normal(hit.p);
        const a = Vec.mult(1, hit.object.color);
        const b = Math.max(0, Vec.dot(n, h));
        const phong = Vec.mult(Math.pow(b, hit.object.shine),a);
        const diffuse = (Vec.mult((Math.max(0, Vec.dot(n, l))),Vec.mult(1, hit.object.color)));
        //wha t if i just dropped out
        return (Vec.add(phong, diffuse));
        
        
        //
        //return hit.object.color;
    } else {
  return this.backgroundColor;
    }
};

/* Basic ray tracing algorithm. */
Scene.prototype.trace = function() {
  for (let j = 0; j < this.image.height; j++)
    for (let i = 0; i < this.image.width; i++) {
      // TODO Use the appropriate methods to implement the algorithm.
        //what the hell am i supposed to do here
        //its fine 
      const ray   = this.project(i,j);
      const hit   = this.surface.intersect(ray);//im mega dumbass ;
      // Set the pixel color in the render buffer
      this.image.getContext("2d").fillStyle = arrayToColor(this.shade(hit));
      this.image.getContext("2d").fillRect(i, j, 1, 1);
    }
};

/* Helper function to convert an number array to a CSS color value */
function arrayToColor(rgb) {
  return "rgb(" + 255*rgb[0] + "," + 255*rgb[1] + "," + 255*rgb[2] + ")";
}
