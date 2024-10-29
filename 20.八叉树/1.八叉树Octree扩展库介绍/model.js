import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// 引入/examples/jsm/math/目录下八叉树扩展库
import { Octree } from "three/addons/math/Octree.js";
import { OctreeHelper } from "three/addons/helpers/OctreeHelper.js";

const loader = new GLTFLoader();

const model = new THREE.Group();

const gltf = await loader.loadAsync("./地形.glb");
model.add(gltf.scene);

// 创建八叉树
const worldOctree = new Octree();
// 分割模型，生成八叉树的子节点
worldOctree.fromGraphNode(gltf.scene);

console.log("查看八叉树结构", worldOctree);

// 可视化八叉树
const helper = new OctreeHelper(worldOctree);
model.add(helper);

export default model;
