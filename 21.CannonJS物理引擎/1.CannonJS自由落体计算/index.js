import * as CANNON from "cannon-es";

// 0.1m半径球体
const bodyShape = new CANNON.Sphere(1);
// 可以把Body称为碰撞体,用来模拟生活中的物体
const body = new CANNON.Body({
  mass: 0.3, //碰撞体质量
  position: new CANNON.Vec3(0, 100, 0), //碰撞体位置
  shape: bodyShape, //碰撞体的几何体形状
});
console.log("body", body);

// CANNON.World创建物理世界对象
const world = new CANNON.World();
// 设置物理世界重力加速度
world.gravity.set(0, -9.8, 0); //单位：m/s²
//物理球body添加到物理世界中，这样body就会受到物理世界加速度的影响World
world.addBody(body);

const fixedTimeStep = 1 / 60; //固定的时间步长1/60秒
function render() {
  console.log("球位置", body.position);
  console.log("球速度", body.velocity);
  console.log("y方向球位置", body.position.y);
  world.step(fixedTimeStep); //更新物理计算
  requestAnimationFrame(render);
}
render();
