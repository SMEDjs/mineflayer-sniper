import { Vec3 } from "vec3"

export function predictNextPosition(previousPositions: Array<any>, distance: number) {
    if(!previousPositions.length) return;
  
    let avgDisplacement = new Vec3(0, 0, 0);
    for (let i = 1; i < previousPositions.length; i++) {
      const displacement = new Vec3(
        previousPositions[i].x - previousPositions[i - 1].x,
        previousPositions[i].y - previousPositions[i - 1].y,
        previousPositions[i].z - previousPositions[i - 1].z
      );
      avgDisplacement.x += displacement.x;
      avgDisplacement.y += displacement.y;
      avgDisplacement.z += displacement.z;
    }
    avgDisplacement.x /= previousPositions.length - 1;
    avgDisplacement.y /= previousPositions.length - 1;
    avgDisplacement.z /= previousPositions.length - 1;
  
    const lastPosition = previousPositions.at(-1);
    avgDisplacement = avgDisplacement.scaled(distance / 3)
    const nextPosition = new Vec3(
      lastPosition.x + avgDisplacement.x,
      lastPosition.y + avgDisplacement.y,
      lastPosition.z + avgDisplacement.z
    );
  
    return nextPosition;
  }