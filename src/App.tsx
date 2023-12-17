import  { useState } from 'react'
import { Interactive, XR, Controllers, VRButton } from '@react-three/xr'
import { Sky, Text } from '@react-three/drei'
import '@react-three/fiber'
import './style.css'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#666" />
    </mesh>
  )
}
function Sphere(props:any) {
  const ref:any = useRef();
  useFrame((state:any) => {
    ref.current.position.set(
      Math.sin(state.clock.getElapsedTime() / 1.5) / 2,
      Math.cos(state.clock.getElapsedTime() / 1.5) / 2,
      Math.cos(state.clock.getElapsedTime() / 1.5) / 2 + 0.5
    );
    ref.current.rotation.set(
      Math.sin(state.clock.getElapsedTime() / 1.5) / 2 * 5,
      Math.cos(state.clock.getElapsedTime() / 1.5) / 2,
      Math.tan(state.clock.getElapsedTime() / 10.5) / 2
    );
  });
  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[0.2, 30, 30]} />
      <meshStandardMaterial color='hotpink' />
    </mesh>
  );
}
export
function Box({ color, size, scale, children, ...rest }: any) {
  return (
    <mesh scale={scale} {...rest}>
      <boxGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  )
}



function Button(props: any) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState(0x123456);

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }

  return (
    <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
      <Box color={color} scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]} size={[0.4, 0.1, 0.1]} {...props}>
        <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
          Hello KayinVR!
        </Text>
      </Box>
    </Interactive>
  )
}

export default function App() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <Sky sunPosition={[0, 1, 0]} />
          <Floor />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Controllers />
          <Button position={[0, 0.8, -1]} />
          <Sphere/>
        </XR>
      </Canvas>
    </>
  )
}

