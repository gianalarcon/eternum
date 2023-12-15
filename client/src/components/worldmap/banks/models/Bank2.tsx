/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 ./client/public/models/bank2.glb 
Author: Tunca.Erkal (https://sketchfab.com/Tunca.Erkal)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/medieval-house-c959349f23f04998b8d9687a4a2c6b50
Title: Medieval House
*/

import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: {
      geometry: THREE.BufferGeometry;
      material: THREE.Material;
    };
    defaultMaterial_1: {
      geometry: THREE.BufferGeometry;
      material: THREE.Material;
    };
    defaultMaterial_2: {
      geometry: THREE.BufferGeometry;
      material: THREE.Material;
    };
    defaultMaterial_3: {
      geometry: THREE.BufferGeometry;
      material: THREE.Material;
    };
    defaultMaterial_4: {
      geometry: THREE.BufferGeometry;
      material: THREE.Material;
    };
    defaultMaterial_5: {
      geometry: THREE.BufferGeometry;
      material: THREE.Material;
    };
    defaultMaterial_6: {
      geometry: THREE.BufferGeometry;
      material: THREE.Material;
    };
  };
  materials: {
    lambert4: THREE.MeshStandardMaterial;
    lambert3: THREE.MeshStandardMaterial;
    lambert6: THREE.MeshStandardMaterial;
    lambert5: THREE.MeshStandardMaterial;
    lambert2: THREE.MeshStandardMaterial;
    lambert7: THREE.MeshStandardMaterial;
    lambert8: THREE.MeshStandardMaterial;
  };
};

export default function Bank2(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/bank2.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.lambert4} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.lambert3} />
          <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.lambert6} />
          <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.lambert5} />
          <mesh geometry={nodes.defaultMaterial_4.geometry} material={materials.lambert2} />
          <mesh geometry={nodes.defaultMaterial_5.geometry} material={materials.lambert7} />
          <mesh geometry={nodes.defaultMaterial_6.geometry} material={materials.lambert8} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/bank2.glb");
