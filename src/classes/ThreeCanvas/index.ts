import * as THREE from 'three';
import { Mesh, Vector3, MathUtils } from 'three';
import theme from 'utils/theme';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

interface IOptions {
  mountPoint: HTMLDivElement;
  width: number;
  height: number;
}

let startTime = Date.now();

class ThreeCanvas {
  private renderer: THREE.WebGLRenderer;
  private composer: THREE.Composer;
  private camera: THREE.Camera;
  private cubeGroup: THREE.Group;
  private clock: THREE.Clock;

  constructor(options: IOptions) {
    const { mountPoint, width, height } = options;

    // this is just here for reference. most of this file should be overwritten :)

    // basics
    const clock = this.clock = new THREE.Clock();
    const scene = new THREE.Scene();
    const camera = this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
    const renderer = this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    scene.background = new THREE.Color( theme.colors.white );
    renderer.setSize( width, height );
    camera.position.z = 0;

    // post processing support
    const composer = this.composer = new EffectComposer( renderer );

    const renderPass = new RenderPass( scene, camera );
    renderPass.clear = false;
    composer.addPass( renderPass );

    // mount to DOM
    mountPoint.appendChild( renderer.domElement );
    // VR support
    // renderer.xr.enabled = true;
    // mountPoint.appendChild( VRButton.createButton( renderer ) );

    this.addMeshes(scene);
  }

  addMeshes(scene: THREE.Scene) {
    const cubeGroup = this.cubeGroup = new THREE.Group();
    const cubeInitialPositions = [
      {
        rotation: new Vector3(35, 35, 0),
        position: new Vector3(0, -0.5, 0),
      },
      {
        rotation: new Vector3(-35, -95, 0),
        position: new Vector3(0, 1, 0),
      },
    ];

    const material = new THREE.MeshBasicMaterial( { color: theme.baseFontColor } );
    for (let i=0; i < 2; i++) {
      const geometry= new THREE.BoxGeometry();

      const cube = new Mesh( geometry, material );
      cubeGroup.add(cube);

      cube.rotation.set(cubeInitialPositions[i].rotation.x, cubeInitialPositions[i].rotation.y, cubeInitialPositions[i].rotation.z,);
      cube.position.set(cubeInitialPositions[i].position.x, cubeInitialPositions[i].position.y, cubeInitialPositions[i].position.z,);
    }

    cubeGroup.position.z = -9; // push 9 meters back
    scene.add(cubeGroup);
  }

  resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  public setAnimationLoop(callback: Function) {
    this.renderer.setAnimationLoop(callback);
  }

  render() {
    // check if we need to resize the canvas and re-setup the camera
    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    this.cubeGroup.rotation.y = this.clock.getElapsedTime();

    this.composer.render();
  }
}

export default ThreeCanvas;
