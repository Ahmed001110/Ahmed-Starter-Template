
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



const canvas = document.getElementById('webgl')
const renderer = new THREE.WebGLRenderer({
    antialias : true,
    canvas,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



// GLTF Loader //////////////////////////////////////////////
// //////////////////////////////
const loader = new GLTFLoader()
let model;
loader.load("assets/webgl_logo.glb" , (gltf)=>{
model = gltf.scene
scene.add(model)
})



// RGBELoader ////////////////////////////////////////////////
/////////////////////////////

const rgbe = new RGBELoader()
rgbe.load("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/forrest-slope/forest_slope_1k.hdr" , (texture)=>{
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = texture
    scene.background = texture
})



// Controls ////////////////

const controls = new OrbitControls(camera,renderer.domElement)
controls.update()



camera.position.z = 2;

function animate() {
	requestAnimationFrame( animate );


	renderer.render( scene, camera );
}

animate();