import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(50, 50);
const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("./转弯.png");
texture.colorSpace = THREE.SRGBColorSpace; // !注意最新版本，webgl渲染器默认编码方式已经改变，为了避免色差，纹理对象编码方式要修改为THREE.SRGBColorSpace
const material = new THREE.MeshLambertMaterial({
  map: texture, // map表示材质的颜色贴图属性
  transparent: true, // 开启透明，这样png贴图的透明部分不显示
});

const mesh = new THREE.Mesh(geometry, material);

mesh.rotateX(-Math.PI / 2); // PlaneGeometry矩形平面默认是在XOY平面上，如果你想平行于XOZ平面，就需要手动旋转
mesh.position.y = 1;

export default mesh;
