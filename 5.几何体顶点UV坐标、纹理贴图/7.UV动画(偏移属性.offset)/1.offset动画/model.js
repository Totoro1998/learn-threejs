import * as THREE from "three";

const geometry = new THREE.PlaneGeometry(200, 20);
//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture = texLoader.load("./纹理1.jpg");
texture.colorSpace = THREE.SRGBColorSpace; // !注意最新版本，webgl渲染器默认编码方式已经改变，为了避免色差，纹理对象编码方式要修改为THREE.SRGBColorSpace
const material = new THREE.MeshLambertMaterial({
  map: texture, //map表示材质的颜色贴图属性
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);

// texture.offset.x +=0.5;//纹理U方向偏移
// 设置.wrapS也就是U水平方向，纹理映射模式(包裹模式)
texture.wrapS = THREE.RepeatWrapping; //对应offste.x偏移
export { mesh, texture };
