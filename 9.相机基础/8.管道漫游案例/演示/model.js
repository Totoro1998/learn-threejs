import * as THREE from 'three';


// 三维样条曲线
const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-50, 20, 90),
    new THREE.Vector3(-10, 40, 40),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(90, -40, 60),
    new THREE.Vector3(120, 30, 30),
]);
// 样条曲线path作为TubeGeometry参数生成管道
const geometry = new THREE.TubeGeometry(path, 200, 5, 30);
const texLoader = new THREE.TextureLoader(); 
const texture = texLoader.load('./diffuse.jpg');//纹理贴图
texture.wrapS = THREE.RepeatWrapping;//UV坐标U方向阵列模式
texture.repeat.x = 10;//纹理沿着管道方向阵列(UV坐标U方向)
const material = new THREE.MeshLambertMaterial({
    map:texture,
    side: THREE.DoubleSide, //双面显示看到管道内壁
    // transparent:true,
    // opacity:0.5,
});
const mesh = new THREE.Mesh(geometry, material);

// 从曲线轨迹线上等间距获取一定数量点坐标
const pointsArr = path.getSpacedPoints(500);
// console.log('pointsArr',pointsArr);


// // 可视化轨迹线
// const geometry2 = new THREE.BufferGeometry();
// geometry2.setFromPoints(path.getPoints(100));
// const material2 = new THREE.LineBasicMaterial({color: 0xfffffff});
// const line = new THREE.Line(geometry2, material2);
// mesh.add(line);

export {mesh,pointsArr};