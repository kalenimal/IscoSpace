import * as Three from "three"
import { FontLoader, OrbitControls, RGBELoader, TextGeometry } from "three/examples/jsm/Addons.js"
import GUI from "lil-gui"
import gsap from "gsap"




const canvas = document.querySelector("canvas.webgl")


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const gui = new GUI();
const scene = new Three.Scene()


const rgbeLoader = new RGBELoader()
rgbeLoader.load('/envMaps/sky.hdr', (environmentMap) =>
{
    environmentMap.mapping = Three.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})

 const ambientLight = new Three.AmbientLight(0xffffff, 1)
 scene.add(ambientLight)
 const pointLight = new Three.PointLight(0xffffff, 30)
 pointLight.position.x = 2
 pointLight.position.y = 3
 pointLight.position.z = 4
 scene.add(pointLight) 

const texturesLoader = new Three.TextureLoader()
const matcapTexture = texturesLoader.load("/textures/matcaps/3.png")



const fontLoader = new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry("ISCO PRO", {
        font,
		size: 0.5,
		depth: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5
    })

textGeometry.center()
const textMaterial = new Three.MeshMatcapMaterial({matcap: matcapTexture})
const text = new Three.Mesh(textGeometry, textMaterial)

scene.add(text)
})

const petrTexture = texturesLoader.load("/textures/petr.png")
const ConeGeometry = new Three.SphereGeometry( 0.5, 100, 100 ) 
const coneMaterial = new Three.MeshStandardMaterial({map: petrTexture, metalness: .7})

for(let i = 0; i < 100; i++){
    const cone = new Three.Mesh(ConeGeometry, coneMaterial)
    cone.position.x = (Math.random() - 0.5) * 10
    cone.position.y =  (Math.random() - 0.5) * 10
    cone.position.z =  (Math.random() - 0.5) * 10

   cone.rotation.x = Math.random() * Math.PI
   cone.rotation.y = Math.random() * Math.PI

   const scale = Math.random()

   cone.scale.x = scale
   cone.scale.y = scale
   cone.scale.z = scale
    scene.add(cone)
}







const cube = new Three.Mesh(new Three.BoxGeometry(1,1,1), new Three.MeshMatcapMaterial({color: "red"}))
/* scene.add(cube) */


const camera = new Three.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
camera.position.z = 8;
camera.position.x = 3;
camera.position.y = -3;
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

const renderer = new Three.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/* renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) */


renderer.render(scene, camera)

gsap.to(camera.position, { duration: 3, delay: 1, x: -1.5, y: 0.5, z: 3})

const clock = new Three.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  

  controls.update()
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()