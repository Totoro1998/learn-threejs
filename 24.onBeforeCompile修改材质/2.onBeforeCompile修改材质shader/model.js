import * as THREE from "three";

const geometry = new THREE.SphereGeometry(60, 25, 25); //球体
const texture = new THREE.TextureLoader().load("./Earth.png");
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshLambertMaterial({
  map: texture,
});
// 修改材质material默认的着色器shader代码
material.onBeforeCompile = function (shader) {
  // console.log('片元着色器', shader.fragmentShader);
  // 在片元着色器main函数里面最后一行插入代码
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <dithering_fragment>",
    `
        #include <dithering_fragment>
        gl_FragColor.r = 0.0;
        gl_FragColor.g = 0.0;
        `
  );
};

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
