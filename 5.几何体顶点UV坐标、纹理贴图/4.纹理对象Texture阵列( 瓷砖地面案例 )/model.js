import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(2000, 2000);
//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load("./瓷砖.jpg");
texture.colorSpace = THREE.SRGBColorSpace; // !注意最新版本，webgl渲染器默认编码方式已经改变，为了避免色差，纹理对象编码方式要修改为THREE.SRGBColorSpace

// 设置阵列
texture.wrapS = THREE.RepeatWrapping; // 纹理在水平（S）方向的贴图方式
texture.wrapT = THREE.RepeatWrapping; // 纹理在垂直（T）方向的贴图方式
// uv两个方向纹理重复数量
texture.repeat.set(12, 12); //注意选择合适的阵列数量

const material = new THREE.MeshLambertMaterial({
  // color: 0x00ffff,
  // 设置纹理贴图：Texture对象作为材质map属性的属性值
  map: texture, //map表示材质的颜色贴图属性
  side: THREE.DoubleSide,
});

const mesh = new THREE.Mesh(geometry, material);

// 旋转矩形平面
mesh.rotateX(-Math.PI / 2); // !PlaneGeometry矩形平面默认是在XOY平面上，如果你想平行于XOZ平面，就需要手动旋转

export default mesh;
