"use strict";
const getMasterGrade = (targetIn, speedIn, weapon) => {
    var _a;
    if (!Object.keys(Weapons).includes(weapon)) {
        throw new Error(`${weapon} is not valid weapon for calculate the grade!`);
    }
    const weaponProp = weaponsProps[weapon];
    const BaseVo = weaponProp.BaseVo;
    const GRAVITY = weaponProp.GRAVITY;
    const target = targetIn;
    const speed = speedIn;
    const startPosition = bot.entity.position.offset(0, 1.6, 0); // Bow offset position
    // Calculate target Height, for shot in the heart  =P
    const targetHeight = !isEntity(target) ? 0 : (target.type === 'player' ? 1.16 : ((_a = target.height) !== null && _a !== void 0 ? _a : 0));
    const targetPosition = target.position.offset(0, targetHeight, 0);
    // Check the first best trayectory
    let distances = getTargetDistance(startPosition, targetPosition);
    let shotCalculation = geBaseCalculation(distances.hDistance, distances.yDistance, GRAVITY, startPosition, targetPosition, BaseVo);
    if (!shotCalculation) {
        return undefined;
    }
    // Recalculate the new target based on speed + first trayectory
    const premonition = getPremonition(shotCalculation.totalTicks, speed, startPosition, targetPosition);
    distances = premonition.distances;
    const newTarget = premonition.newTarget;
    // Recalculate the trayectory based on new target location
    shotCalculation = geBaseCalculation(distances.hDistance, distances.yDistance, GRAVITY, startPosition, targetPosition, BaseVo);
    if (!shotCalculation) {
        return undefined;
    }
    // Get more precision on shot
    const precisionShot = getPrecisionShot(shotCalculation.grade, distances.hDistance, distances.yDistance, 1, GRAVITY, startPosition, targetPosition, BaseVo);
    const { arrowTrajectoryPoints, blockInTrayect, nearestDistance, nearestGrade } = precisionShot;
    // Calculate yaw
    const yaw = calculateYaw(startPosition, newTarget);
    if (nearestDistance > 4) {
        return undefined;
    } // Too far
    return {
        pitch: degreesToRadians(nearestGrade / 10),
        yaw,
        grade: nearestGrade / 10,
        nearestDistance,
        target: newTarget,
        arrowTrajectoryPoints,
        blockInTrayect
    };
};
