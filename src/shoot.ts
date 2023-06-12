import { Bot } from "mineflayer";
import { Entity } from 'prismarine-entity'
import { predictNextPosition } from "./predict.ts"
import { Vec3 } from "vec3"
export function getShotAngle(bot: Bot, player: Entity, lastTargetPos: Array<any>) {
    const targetPosition = player.position;
    const botPosition = bot.entity.position;
    const distance = targetPosition.distanceTo(botPosition)
    console.log("target position: ", targetPosition)
    console.log("last pos: ", lastTargetPos)
    const adjustedPosition = predictNextPosition(lastTargetPos, distance) ?? new Vec3(0, 0, 0)
    console.log("adjusted: ", adjustedPosition)
    const positionDifference = adjustedPosition.minus(botPosition);

    const horizontalDistance = Math.sqrt(positionDifference.x * positionDifference.x + positionDifference.z * positionDifference.z);
    const verticalDistance = positionDifference.y;
    
    const pitch = Math.atan2(verticalDistance, horizontalDistance);
    const yaw = Math.atan2(-positionDifference.z, positionDifference.x) + Math.PI / 2 + Math.PI;
    
    return { pitch, yaw };
}
  