import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { Octree } from "three/addons/math/Octree.js";
import { Capsule } from "three/addons/math/Capsule.js";

import { collisionModel, model, ground, person, changeAction, mixer, currentAction } from "./model.js"; //模型对象

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

//光源设置
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(100, 60, 100);
// scene.add(directionalLight);
const pointlLight = new THREE.PointLight(0xffffff, 0.5);
pointlLight.position.set(0, 80, 0);
scene.add(pointlLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

//相机
const width = window.innerWidth;
const height = window.innerHeight;
// 漫游和整体预览fov不一样
// 漫游状态，避免相机附近被剪裁，把near设置小一点  比1更小  0.01
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 3000);
camera.position.set(40, 40, 40);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, //开启优化锯齿
  logarithmicDepthBuffer: true,
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 声明一个对象keyStates用来记录键盘事件状态
const keyStates = {};
// 当某个键盘按下设置对应属性设置为true
document.addEventListener("keydown", (event) => {
  keyStates[event.code] = true;
});
// 当某个键盘抬起设置对应属性设置为false
document.addEventListener("keyup", (event) => {
  keyStates[event.code] = false;
});

// 八叉树和胶囊碰撞体实现角色运动碰撞检测
//根据地形模型数据生成八叉树
const octree = new Octree();
// 稍微打的模型顶点数量太多，不好处理怎么办
// octree.fromGraphNode(ground);
octree.fromGraphNode(collisionModel);
// 胶囊碰撞体用来近似模拟人的外形
// 三个参数：胶囊底部球心start、球心顶部球心end、半径radius
// const radius = 0.7;//胶囊圆周半径  可能穿不过小孔
const radius = 0.4; //胶囊圆周半径  虽然脚穿模，但是看不过，相机在背后
const capsule = new Capsule(new THREE.Vector3(0, radius, 0), new THREE.Vector3(0, 1.4 + radius, 0), radius);
// const capsule = new Capsule(new THREE.Vector3(0, radius, 0), new THREE.Vector3(0, 1.4, 0), radius);

// capsule.translate(new THREE.Vector3(0, 20, 0))

// capsule.translate(new THREE.Vector3(0, 1, 0))

// capsule.translate(new THREE.Vector3(-52.8, 0, 160));

const obj = model.getObjectByName("停车场标注");
const worldPosition = new THREE.Vector3();
obj.getWorldPosition(worldPosition);
worldPosition.y = 20;
capsule.translate(worldPosition); //初始化碰撞体初始位置

//标记玩家角色(人)模型是否在地面上，准确说就是玩家(人模型)脚掌是否有支撑
let personOnFloor = true;

// 给相机创建一个父对象：方便通过父对象.rotation属性间接控制相机姿态
const cameraGroup = new THREE.Group();
cameraGroup.add(camera);
// camera.position.set(0, 1.8, 5.5);//人后面一点
// 30度设置
// camera.position.set(0, 1.8, -6.5);//根据人朝向设置 人后面一点
// camera.position.set(0, 1.8, -6.5);//第一个人称，人前面一点
// camera.lookAt(capsule.end);//对着人身上某个点
// camera.lookAt(0, 1.6, 0);//对着人身上某个点

// 70度设置
camera.position.set(0, 1.6, -2.3); //根据人朝向设置 人后面一点
camera.lookAt(0, 1.6, 0.0); //对着人前方一点

// person.add(camera);//相机作为人子对象，会跟着人运动
person.add(cameraGroup); //相机父对象作为玩家角色(人)模型子对象

// 当鼠标左键按下后进入指针锁定模式(鼠标无限滑动)
addEventListener("mousedown", () => {
  document.body.requestPointerLock(); //指针锁定
});

// 人和相机初始姿态正前方：沿着z轴负半轴方向
//鼠标左右移动，人绕y轴旋转
addEventListener("mousemove", (event) => {
  // 进入指针模式后，才能根据鼠标位置控制人旋转
  if (document.pointerLockElement == document.body) {
    // 鼠标左右滑动，让人左右转向(绕y轴旋转)，相机会父对象人绕左右转向
    person.rotation.y -= event.movementX / 500; //加减法根据左右方向对应关系设置，缩放倍数根据，相应敏感度设置
    // 鼠标上下滑动，让相机视线方向上下转动(相机父对象cameraGroup绕着x轴旋转)
    cameraGroup.rotation.x -= event.movementY / 500; //加减法根据上下抬头对应关系设置
    // 约束相机视线上下浮动角度范围30度
    const angle = THREE.MathUtils.degToRad(30 / 2);
    // if (cameraGroup.rotation.x < -angle) cameraGroup.rotation.x = -angle;
    // if (cameraGroup.rotation.x > angle) cameraGroup.rotation.x = angle;
  }
  // 总的来说：人仅仅左右转向，相机一方面和人同步左右转向，另一方面上下抬头或低头
});

let jumpState = false; //判断是不是在跳跃期间

let WaveState = false; //打招呼状态

document.addEventListener("keydown", (event) => {
  if (event.code == "KeyX" && !WaveState) {
    WaveState = true;
    // console.log('Wave',Wave);
    // 如果Wave正在执行，不要再次执行changeAction('Wave')
    if (currentAction.name != "Wave") {
      changeAction("Wave");
      setTimeout(function () {
        WaveState = false; //打招呼开始倒计时2秒后，把打招呼状态标记为false
      }, 4);
    }
  }
});

// // Wave执行期间不能根据速度执行休闲或步行状态
// // 能不能放在外面执行
// if (keyStates["KeyX"]) {

// }

// 用三维向量表示玩家角色(人)运动漫游速度
const v = new THREE.Vector3(); //运动速度
// 渲染循环
const clock = new THREE.Clock();
function render() {
  const deltaTime = clock.getDelta(); //渲染的时间间隔

  updatePlayerSpeed(deltaTime); //根据按键和阻尼状态，更新更新玩家角色的当前速度
  updatePlayerPosition(deltaTime); //更新玩家位置(人和胶囊碰撞体)
  updateCollision(capsule); //表示人的胶囊碰撞体和周围地面碰撞检测(交叉重合计算)

  mixer.update(deltaTime);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// 更新玩家(人模型和胶囊碰撞体)位置
function updatePlayerPosition(deltaTime) {
  // 在间隔deltaTime时间内，人移动距离计算(速度*时间)
  const spL = v.clone().multiplyScalar(deltaTime);
  // person.position.add(spL);//改变人的位置
  capsule.translate(spL); //用碰撞体表示人模型，进行平移
  // 将胶囊的位置进行设置
  capsule.getCenter(person.position);

  // 获取胶囊碰撞体位置，控制人角色模型的位置
  person.position.copy(capsule.start);
  person.position.y -= radius;

  // if(person.position.y<-0.5){//如果掉落水平吗一下0.5恢复到0.0
  //     // new THREE.Vector3(0, radius, 0), new THREE.Vector3(0, 1.4, 0)
  //     capsule.start.y = radius
  //     capsule.start.y = 1.4
  // }
}

//渲染循环中调用,参数胶囊碰撞体capsule表示玩家角色，更新胶囊碰撞体的与地形碰撞信息(交叉重合)
function updateCollision(capsule) {
  //碰撞检测，如果胶囊碰撞体移动后，和地面交叉重合，立即修正
  const result = octree.capsuleIntersect(capsule);
  // 胶囊碰撞体前后左右移动过程中，如果与八叉树地形有交叉重合，立即平移胶囊碰撞体，确保胶囊碰撞体与地形不交叉重合
  if (result) {
    capsule.translate(result.normal.multiplyScalar(result.depth));
    // 交叉计算返回结果法线大于0，判断是否存在对人脚有支撑作用的面，personOnFloor设置为true
    if (result.normal.y > 0) {
      // const y = new THREE.Vector3(0, 1, 0)
      // // console.log('result.normal',result.normal);//没有归一化(八叉树库)
      // const cos = result.normal.normalize().dot(y);
      // const angle = THREE.MathUtils.degToRad(89);
      // if (cos > Math.cos(angle)) {//与支撑面夹角大于60度  撞在墙上，上下震动，自由下落导致的
      personOnFloor = true; //存在对人有支撑的面，比如地面，或楼梯
    } else {
      personOnFloor = false; //人的脚无支撑，比如人下楼梯、下斜坡、从高处跳下来
    }
  } else {
    // 交叉重合，可能是脚，可能是头，但是没有交叉重合，人肯定是算悬空状态
    personOnFloor = false; //人的脚无支撑，比如人下楼梯、下斜坡、从高处跳下来
  }
}

// 控制玩家角色运动速度(收WASD等按键、阻尼、重力影响)，渲染循环中调用
function updatePlayerSpeed(deltaTime) {
  const vMax = 5; // 最大速度限制
  const a = 20; //调节按键加速快慢
  if (v.length() < vMax) {
    if (keyStates["KeyW"]) {
      // if (v.length() < vMax) {//限制最高速度
      // W按下时候，给运动速度加速 乘以deltaTime倍数(不同倍数可以调节加速快慢)
      // 5*deltaTime：表示间隔deltaTime秒内，速度增加5*deltaTime
      // v.add(dir.clone().multiplyScalar(5 * deltaTime));
      const front = new THREE.Vector3();
      person.getWorldDirection(front); //获取玩家角色(相机)正前方
      // person没有任何旋转的时候，front初始默认值沿着z方向
      // 注意：threejs加载人外部模型时候，保证人正前方是z方向，就是说front初始默认值一致
      v.add(front.multiplyScalar(a * deltaTime));
      // }
      // console.log('v.length()', v.length());
    }
    if (keyStates["KeyS"]) {
      // if (v.length() < vMax) {//限制最高速度
      const front = new THREE.Vector3();
      person.getWorldDirection(front); //获取玩家角色(相机)正前方
      v.add(front.multiplyScalar(-a * deltaTime)); //前方反方向
      // }
    }
    if (keyStates["KeyA"]) {
      // if (v.length() < vMax) {//限制最高速度
      const front = new THREE.Vector3();
      person.getWorldDirection(front);
      const up = new THREE.Vector3(0, 1, 0); //y方向，也是玩家上方向person.up
      //叉乘获得垂直于向量up和front的向量 左右与叉乘顺序有关,可以用右手螺旋定则判断，也可以代码测试结合3D场景观察验证
      const left = up.clone().cross(front);
      // console.log('left',left);
      v.add(left.multiplyScalar(a * deltaTime)); //前方反方向
      // }
    }
    if (keyStates["KeyD"]) {
      // if (v.length() < vMax) {//限制最高速度
      const front = new THREE.Vector3();
      person.getWorldDirection(front);
      const up = new THREE.Vector3(0, 1, 0); //y方向，也是玩家上方向person.up
      //叉乘获得垂直于向量up和front的向量 左右与叉乘顺序有关,可以用右手螺旋定则判断，也可以代码测试结合3D场景观察验证
      const right = front.clone().cross(up);
      v.add(right.multiplyScalar(a * deltaTime)); //前方反方向
      // }
    }
  }

  // 解释阻尼数学运算含义
  // 10 + (-0.4 * 10) = 10*(1-0.4) = 6
  // 6  + (-0.4 * 6) = 6*(1-0.4) = 6 * 0.6  越来越逼近0
  // const spv = v.clone().multiplyScalar(damping);//当前速度乘以一个绝对值小于1的数字
  // v.add(spv);//加上减少的速度  v速度大小越来越逼近0，不会跑到反方向
  //v+v*damping = v*(1 + damping)  1 + damping小于1，v越来越小，趋近于
  const damping = -0.1; //阻尼相关系数
  if (personOnFloor) {
    v.y = 0; //当人接触地面时候，y方向速度归零
    // v+v*damping = v*(1 + damping)
    v.addScaledVector(v, damping); //阻尼对速度减速
  }

  // 当人离开地面情况下，即便按空格键，也不起作用，当你按下空格键后，很快人就会离开地
  if (personOnFloor) {
    //人在地面情况下，按空格键跳跃
    // 空格键处于按下状态，给人一个向上的速度
    if (keyStates["Space"]) {
      //半空中如果多次按或一直按，会多次给与加速
      jumpState = true;
      v.y = 5;
      if (currentAction.name != "Jump") {
        changeAction("Jump");
        // currentAction.time/currentAction.timeScale = 实际播放时间;
        // currentAction.timeScale = currentAction.time / (v.y / g);
        // console.log('currentAction.time',currentAction.time);
      }

      personOnFloor = false; //人还没来得及跳，可能会被判断在地面上，跳跃刚开始就改为不在地面上
    }
  }

  // 这里的执行好像有问题，难道说需要延迟计算
  // jumpState还没来得及跳起来，就进行碰撞检测了
  // 人原来处于跳跃状态，同时又在地上面了，判定为飞跳跃状态
  // 要考虑执行时间问题
  // if (personOnFloor) {
  //     // 地面的状态还没来得及，调整为不在地面上，就执行了代码，强制改变personOnFloor
  //     if (jumpState) jumpState = false;
  // }
  if (jumpState && v.y < 0) {
    //跳跃期间，且速度开始小于零说明开始下落
    jumpState = false;
  }

  // 还有一个方法，就是发射一个射线，计算人与地面距离
  // 实时计算，如果距离地面0.5米就开始转变状态  判断y方向<-0.3

  if (!personOnFloor) {
    //不在地面上(或者说没有支撑面)
    // 根据重力加速控制玩家角色y方向速度
    const g = -9.8; //重力加速度
    v.y += g * deltaTime;
  }

  // 根据速度调整骨骼动画状态
  if (personOnFloor) {
    const newV = v.clone();
    newV.y = 0; //不考虑y方向速度
    // 我想知道为什么会在某一瞬间很大，谁知道
    // y方向存在奇怪的突然速度bug，大bug
    const vL = newV.length(); //很神奇，我虽然没有看到动，但是有突然的变化，奇怪
    // console.log('vL',vL);
    // 跳跃后，无论速度多少，不执行下面动作
    if (!jumpState && !WaveState) {
      //跳跃期间不进行其他动画切换
      if (vL < 0.2) {
        if (currentAction.name != "Idle") changeAction("Idle");
      } else if (vL > 0.2 && vL < 5) {
        if (currentAction.name != "Walk") changeAction("Walk");
      }
      // else if (vL > 5) {
      //     if (currentAction.name !== 'Run') changeAction('Run');
      // }
    }
  }
}

// const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// const hdrLoader = new RGBELoader();//hdr格式图像加载器
// const envMap = await hdrLoader.loadAsync('./model/envMap.hdr');
// envMap.mapping = THREE.EquirectangularReflectionMapping;
// //         // envMap.colorSpace  = THREE.SRGBColorSpace;//设置为SRGB颜色空间
// scene.environment = envMap;

// 全景图作为球体Mesh颜色纹理贴图
const texture = new THREE.TextureLoader().load("./model/全景图.jpg");
texture.colorSpace = THREE.SRGBColorSpace;
scene.environment = texture;
const geometry = new THREE.SphereGeometry(800, 50, 50);
// const geometry = new THREE.CylinderGeometry( 200, 200, 200, 32 );
const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.BackSide, //默认前面可见，设置为背面可见即可
});
const mesh = new THREE.Mesh(geometry, material);
// mesh.rotateY(Math.PI);
scene.add(mesh);

// 漫游雾化   与  整体预览  雾化参数临界值不同
// scene.fog = new THREE.Fog(0x73a5c8, 500, 1000);//500希望500位置更加清晰
scene.fog = new THREE.Fog(0x73a5c8, 1, 300); //1 人的话，可以模拟人眼观察的效果
