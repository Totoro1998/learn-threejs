// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
const div = document.getElementById("tag");
div.style.top = "-161px"; //指示线端点放在标注点附近
// HTML元素转化为threejs的CSS2模型对象
const tag = new CSS2DObject(div);
export default tag;
