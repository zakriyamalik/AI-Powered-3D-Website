import React from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame, useThree } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);

  // Access the WebGL renderer capabilities
  const { gl } = useThree();

  // Load the GLTF model and extract nodes and materials
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  
  // Load textures for the logo and full decal
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Set anisotropy if the texture is loaded
  if (logoTexture) {
    logoTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
  }

  // Use frame loop to smoothly interpolate the shirt color to the current state color
  useFrame((state, delta) => {
    // Debugging log for color values
    console.log('Color:', materials.lambert1.color);
    console.log('Target Color:', snap.color);

    // Easing function to smoothly transition shirt color
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  // Generate a unique key based on the current state
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* Conditionally render the full texture decal if enabled */}
        {snap.isFullTexture && (
          <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
        )}

        {/* Conditionally render the logo decal if enabled and texture is loaded */}
        {snap.isLogoTexture && logoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
}

export default Shirt;
