import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
//importing textures
import starTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRing from '../img/saturnring.png';
import earthTexture from '../img/earth.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import marsTexture from '../img/mars.jpg';
import uranusTexture from '../img/uranus.jpg';
import uranusRing from '../img/uranusring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(-100, 10, 10);
orbit.update();

//light

const ambientLight=new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// texture loader

const textureLoader=new THREE.TextureLoader(); 

//cube texture background
const cubeTexture=new THREE.CubeTextureLoader();
scene.background=cubeTexture.load([
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture
]);
//sun

const sunGeo=new THREE.SphereGeometry(16,30,30);
const sunMaterial=new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun=new THREE.Mesh(sunGeo,sunMaterial);
scene.add(sun);

function generatePlanet(size,texture,position,ring)
{
    const Geo=new THREE.SphereGeometry(size,30,30);
    const Mat=new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh= new THREE.Mesh(Geo,Mat);
    const obj=new THREE.Object3D();
    scene.add(obj);
    if(ring)
    {
        const RingGeo =new THREE.RingGeometry(ring.innerRadius,ring.outerRadius,30);
        const RingMat=new THREE.MeshStandardMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
    });
        const Ringmesh=new THREE.Mesh(RingGeo,RingMat);
        obj.add(Ringmesh);
        Ringmesh.position.x=132;
        Ringmesh.rotation.x=-0.5* Math.PI;
    }
    obj.add(mesh);
    mesh.position.x=position;
    return {mesh,obj}
}
const mercury =generatePlanet(3.2,mercuryTexture,28); 
const venus =generatePlanet(5.8,venusTexture,44);
const earth=generatePlanet(6,earthTexture,62);
const mars=generatePlanet(4,marsTexture,78);
const jupiter=generatePlanet(12,jupiterTexture,100);
const saturn= generatePlanet(10,saturnTexture,132,{innerRadius:10,outerRadius:20,texture : saturnRing});
const uranus=generatePlanet(7,uranusTexture,176);
const neptune=generatePlanet(7,neptuneTexture,200);
const pluto=generatePlanet(2.8,plutoTexture,216);
//function to generate all planets
// function createPlanete(size,texture,position)
// {
//     const Geo=new THREE.SphereGeometry(size,30,30);
//     const Material=new THREE.MeshStandardMaterial({
//          map: textureLoader.load(texture)
//     });
//     const mesh=new THREE.Mesh(Geo,Material);
//     const obj=new THREE.Object3D();
//     obj.add(mesh);
//     scene.add(obj); 
//     mesh.position.x=position;
//     return mesh
// }

//mercury= createPlanete(3.2,mercuryTexture,28);

//mercury 
// const mercuryGeo=new THREE.SphereGeometry(3.2,30,30);
// const mercuryMaterial=new THREE.MeshStandardMaterial({
//     map: textureLoader.load(mercuryTexture)
// });
// const mercury=new THREE.Mesh(mercuryGeo,mercuryMaterial);
// // sun.add(mercury);
// const mercuryObj= new THREE.Object3D();
// mercuryObj.add(mercury);
// scene.add(mercuryObj);
// mercury.position.x=28;

// //venus
// const venusGeo=new THREE.SphereGeometry(5,30,30);
// const venusMaterial=new THREE.MeshStandardMaterial({
//     map: textureLoader.load(venusTexture)
// });
// const venus=new THREE.Mesh(venusGeo,venusMaterial);
// const venusObj=new THREE.Object3D();
// venusObj.add(venus);
// scene.add(venusObj);
// venus.position.x=32;

// //saturn 
// const saturnGeo=new THREE.SphereGeometry(10,30,30);
// const saturnMaterial=new THREE.MeshStandardMaterial({
//     map: textureLoader.load(saturnTexture)
// });
// const saturn=new THREE.Mesh(saturnGeo,saturnMaterial);
// const saturnObj=new THREE.Object3D();   
// saturnObj.add(saturn);
// scene.add(saturnObj);
// saturn.position.x=132;
// //saturn ring
// const saturnRingGeo =new THREE.RingGeometry(10,20,30);
// const saturnRingMat=new THREE.MeshStandardMaterial({
//     map: textureLoader.load(saturnRing),
//     side: THREE.DoubleSide
// });
// const satRing=new THREE.Mesh(saturnRingGeo,saturnRingMat);
// saturnObj.add(satRing);
// satRing.position.x=132;
// satRing.rotation.x=-0.5* Math.PI;
//declaring a point light taking parameter as color ,intensity and the max distance it can reach
const pointLight=new THREE.PointLight(0xFFFFFF,2,300);
scene.add(pointLight);
// // Sets a 12 by 12 gird helper
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// // Sets the x, y, and z axes with each having a length of 4
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

function animate() {
    sun.rotateY(0.004);
    mercury.obj.rotateY(0.04);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    venus.obj.rotateY(0.015);
    earth.mesh.rotateY(0.02);
    earth.obj.rotateY(0.01);
    mars.mesh.rotateY(0.018);
    mars.obj.rotateY(0.008);
    jupiter.mesh.rotateY(0.04);
    jupiter.obj.rotateY(0.002);
    saturn.mesh.rotateY(0.038);
    saturn.obj.rotateY(0.0009);
    uranus.mesh.rotateY(0.03);
    uranus.obj.rotateY(0.0004);
    neptune.mesh.rotateY(0.032);
    neptune.obj.rotateY(0.0001);
    pluto.mesh.rotateY(0.008);
    pluto.obj.rotateY(0.0007);
    // venus.rotateY(0.04);
    // venusObj.rotateY(0.02);
    // saturn.rotateY(0.038);
    // saturnObj.rotateY(0.0009);  
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});