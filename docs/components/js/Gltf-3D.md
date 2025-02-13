# js渲染三维模型

## 前置条件

```plain
pnpm create vite my-vue-app -- --template vue
pnpm install
pnpm add three
```

## 实现

```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

export default class CreateThree {
  constructor(params = {}) {
    const {
      model = 'GLTF',
      width = window.innerWidth / 2.25, // 画布宽
      height = window.innerHeight, // 画布高
      positionX = 10,
      positionY = 60,
      positionZ = 136,
      autoRotate = true,
    } = params
    // 场景
    this.scene = new THREE.Scene()

    // 相机
    // 四个参数，分别代表  视角角度，画布宽高比，近截面（相机到物体的距离），远界面（近截面远截面想像成一个锥形截面）
    this.camera = new THREE.PerspectiveCamera(60, width / height, 1, 3000)
    // 相机的位置
    this.camera.position.set(positionX, positionY, positionZ)
    // 坐标原点,相机观察的点
    this.camera.lookAt(0, 0, 0)

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      logaritgmicDepthBuffer: true,
      alpha: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(width, height)

    // 相机控件
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableZoom = false
    this.controls.enablePan = false
    this.controls.target.set(0, 0, 0)
    this.controls.update()

    // gltf 加载，解压缩加载 。。。压缩暂时没做
    if (model === 'GLTF') {
      this.loader = new GLTFLoader()
    } else if (model === 'FBX') {
      this.loader = new FBXLoader()
    }

    this.controls.maxPolarAngle = 1.8 // 上下翻转的最大角度
    this.controls.minPolarAngle = 0.0 // 上下翻转的最小角度
    this.controls.autoRotate = autoRotate // 是否自动旋转
    this.controls.autoRotateSpeed = 6

    // 渲染循环
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
      this.controls.update()
    })

    // 平行光
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    // 右手法则，大拇指x,食指y,中指z
    this.directionalLight.position.set(8, 10, 50)
    this.scene.add(this.directionalLight)
    // 可以设置多个光源  - 上边的是前照光，下面的是后照光
    this.directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0)
    // 右手法则，大拇指x,食指y,中指z
    this.directionalLight1.position.set(10, 2, -10)
    this.scene.add(this.directionalLight1)

    this.directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0)
    this.directionalLight2.position.set(-10, 2, 10)
    this.scene.add(this.directionalLight2)

    this.directionalLight3 = new THREE.DirectionalLight(0xffffff, 1.0)
    this.directionalLight3.position.set(10, 2, 10)
    this.scene.add(this.directionalLight3)

    this.directionalLight4 = new THREE.DirectionalLight(0xffffff, 1.0)
    this.directionalLight4.position.set(1, 10, 1)
    this.scene.add(this.directionalLight4)

    // 画布尺寸
    window.addEventListener('resize', () => {
      this.renderer.setSize(width, height)
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
    })
  }
}

```

```vue
<template>
    <div ref="threeRef"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import CreateThree from './CreateThree'

const threeRef = ref(null)

onMounted(() => {
    const three = new CreateThree()
    // 如果是FBX模型
    // const three = new CreateThree({ model: 'FBX' })
    
    threeRef.value.appendChild(three.renderer.domElement)
    three.loader.load('spare-cab.gltf', (gltf) => {
        gltf.scene.traverse(child => {
            if (child.isMesh) {
                child.material.transparent = true
                child.material.metalness = 1.0;//金属度
                child.material.roughness = 0.5;//表面粗糙度
                // 可以选择模型的零件，代码重置颜色
                if (child.material.name === "base-center") {
                    child.material.color.set(0x99CCFF);
                    child.material.emissive.set(0x99CCFF);
                    child.material.emissiveIntensity = 1.0; // 设置自发光强度为1.0
                }
                if (child.material.name === "base-body") {
                    child.material.color.set(0xC0C0C0);
                    child.material.emissive.set(0xC0C0C0);
                    child.material.emissiveIntensity = 1.0; // 设置自发光强度为1.0
                }
            }
        })
        three.scene.add(gltf.scene)
    })
    // 如果是FBX模型
    // three.loader.load('DGM43.fbx', (fbx) => {
    //     three.scene.add(fbx)
    // })
})

</script>
```
