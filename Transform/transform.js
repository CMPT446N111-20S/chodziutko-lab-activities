export function identity2D() {
  return [[1, 0, 0],
          [0, 1, 0],
          [0, 0, 1]];
}

export function rotate2D(angle = 0) {
  // TODO #2a return the appropriate matrix as an array-of-arrays
  return [[Math.cos(angle), -(Math.sin(angle)), 0],
         [Math.sin(angle), Math.cos(angle),0],
         [0,0,1]];
    //return undefined;
}

export function shearX(sx) {
  // TODO #2b return the appropriate matrix as an array-of-arrays
  return [[1, sx, 0],
          [0, 1, 0],
         [0,0,1]];
    //return undefined;
}

export function shearY(sy) {
  // TODO #2c return the appropriate matrix as an array-of-arrays
   return [[1, 0, 0],
          [sy, 1, 0],
          [0,0,1]];
    //return undefined;
}

export function scale2D(sx = 1, sy = 1) {
  // TODO #2d return the appropriate matrix as an array-of-arrays
  //return undefined;
      return [[sx, 0, 0],
              [0, sy, 0],
              [0, 0, 1]];
}

export function translate2D(dx = 0, dy = 0) {
  // TODO #2e return the appropriate matrix as an array-of-arrays
  //return undefined;
      return [[1, 0, dx],
              [0, 1, dy],
              [0, 0, 1]];
}
