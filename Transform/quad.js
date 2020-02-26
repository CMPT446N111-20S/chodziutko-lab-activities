import * as Mat from "./matmath.js"
import {
  identity2D
} from "./transform.js"

export default function Quad(a, b, c, d, color) {
  this.verts = [a.concat(1), b.concat(1), c.concat(1), d.concat(1)];
  this.color = color;
  this.m = identity2D();
}

Quad.prototype.draw = function (canvas, transform = identity2D()) {
  const transformedVerts = Mat.mult(transform, Mat.mult(this.m, Mat.transpose(this.verts)));
  const quad = new Path2D();
  quad.moveTo(transformedVerts[0][0] + canvas.width / 2, canvas.height / 2 - transformedVerts[1][0]);
  quad.lineTo(transformedVerts[0][1] + canvas.width / 2, canvas.height / 2 - transformedVerts[1][1]);
  quad.lineTo(transformedVerts[0][2] + canvas.width / 2, canvas.height / 2 - transformedVerts[1][2]);
    quad.lineTo(transformedVerts[0][3] + canvas.width / 2, canvas.height / 2 - transformedVerts[1][3]);
  quad.lineTo(transformedVerts[0][0] + canvas.width / 2, canvas.height / 2 - transformedVerts[1][0]);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = this.color;
  ctx.fill(quad);
}

Quad.prototype.transform = function (m) {
  this.m = Mat.mult(m, this.m);
}
