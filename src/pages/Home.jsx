import { Suspense, useContext } from "react";
import Island from "../models/Island";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import {
  Environment,
  Fisheye,
  KeyboardControls
} from "@react-three/drei";
import Controller from "ecctrl";
import TyCharacter from "../models/TyCharacter";
import { PlayerControlContext } from "../store/PlayerControls";
import { Player } from "@lottiefiles/react-lottie-player";
import AudioComponent from "../components/AudioComponent";

const Home = () => {
  const { keyPressed, onKeyChange } = useContext(PlayerControlContext);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -30.5, -30];
    let rotation = [0, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };

  const [islandScale, islandPosition, rotation] = adjustIslandForScreenSize();

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <div id="canvas-container" className="main-container">
      <Suspense
        fallback={
          <div className="w-96 h-96 mx-auto">
            <Player
              src="https://lottie.host/7db792f6-0590-41a7-b54e-7678a23142ec/B3V1S4bxJw.json"
              autoplay
              loop
              className="w-96 h-96 "
            />
            <h1 className="text-center font-loading text-2xl">
              Fetching the good stuff...
            </h1>
            <h1 className="text-center font-loading text-sm mt-16">
              Like chips.
            </h1>
          </div>
        }
      >
        <Canvas shadows onPointerDown={(e) => e.target.requestPointerLock()}>
          <Fisheye zoom={0.4}>
            <Environment files="/sunset.hdr" background resolution={1080} />
            <directionalLight
              castShadow
              position={[0, 10, 0]}
              intensity={7}
              color={"red"}
            >
              <orthographicCamera
                attach="shadow-camera"
                args={[-60, 60, 60, -60]}
              />
            </directionalLight>
            <ambientLight intensity={0.1} castShadow />
            <Physics timeStep="vary">
              <KeyboardControls
                map={keyboardMap}
                onChange={(name, pressed, state) => {
                  if (name === "jump" && pressed && keyPressed !== 0) {
                    onKeyChange(0);
                  }
                  if (
                    ["forward", "backward", "leftward", "rightward"].includes(
                      name
                    ) &&
                    pressed &&
                    keyPressed !== 6
                  ) {
                    onKeyChange(6);
                  }
                  if (
                    !Object.values(state).includes(true) &&
                    keyPressed !== 0
                  ) {
                    onKeyChange(2);
                  }
                }}
              >
                <Controller maxVelLimit={5}>
                  <TyCharacter
                    position={[0, -1, 0]}
                    scale={1}
                    rotation={[0, 0, 0]}
                  />
                </Controller>
              </KeyboardControls>
              <RigidBody type="fixed" colliders="trimesh">
                <Island
                  position={islandPosition}
                  scale={islandScale}
                  rotation={rotation}
                />
              </RigidBody>
            </Physics>
          </Fisheye>
          <AudioComponent />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Home;
