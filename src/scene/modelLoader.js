import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';

function createModelLoader(scene) {

  const obstacles = [];

  const interactables = {
    terminalMeshName: {
      name: "Terminal_1",
      mesh: null,
      interactPosition: new THREE.Vector3(-5, 0, -4)
    },
    tableMeshName: {
      name: "interact_table_1",
      mesh: null,
      interactPosition: new THREE.Vector3(5, 0, 3)
    },
    mainTableMeshName: {
      name: "m_table_1",
      mesh: null,
      interactPosition: new THREE.Vector3(-3, 0, 0)
    }
  }

  init();

  function loadModels()  {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        "/SceneNotComplete.glb",
        (gltf) => {
          const DEG2RAD = Math.PI / 180;
  
          // Setup scene model on scene
          const sceneModel = gltf.scene;
          sceneModel.position.set(1, -0.5, 2);
          const sceneScale = 0.7;
          sceneModel.scale.set(sceneScale, sceneScale, sceneScale);
          sceneModel.rotation.set(0, -90 * DEG2RAD, 0);
          sceneModel.castShadow = true;
  
          // Search for obstacles in scene
          const obstacleThresholdSize = 1;
          sceneModel.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.metalness = 0;
  
              const box = new THREE.Box3().setFromObject(child);
              const size = new THREE.Vector3();
              box.getSize(size);
              const sizeList = [...size];
  
              if (sizeList.some(item => item >= obstacleThresholdSize)) {
                obstacles.push(child);
              }

              if (child.name == interactables.terminalMeshName.name) {
                interactables['terminalMeshName'].mesh = child;
              }
              if (child.name == interactables.tableMeshName.name) {
                interactables['tableMeshName'].mesh = child;
              }
              if (child.name == interactables.mainTableMeshName.name) {
                interactables['mainTableMeshName'].mesh = child;
              }
            }
          });
  
          scene.add(sceneModel);
          resolve(sceneModel);
        },
        undefined,
        (error) => {
          console.error("An error occurred while loading the model:", error);
          reject(error); 
        }
      );
    });
  };

  async function init() {
    await loadModels();
  } 

  return {
    obstacles,
    interactables
  }
}


export { createModelLoader };