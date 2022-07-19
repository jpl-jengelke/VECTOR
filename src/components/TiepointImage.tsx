import { useRef, useState, useEffect } from 'react';
import { TextureLoader, Box3, Vector2 } from 'three';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { Points, Line, useTexture } from '@react-three/drei';
import { useData } from '@/DataContext';
import * as styles from '@/components/TiepointImage.css';

function TiepointImage({ activeImage, tiepoints }) {
    const { camera, size } = useThree();

    const map = useLoader(TextureLoader, `src/assets/example/${activeImage}.png`);
    const sprite = useTexture('/src/assets/disc.png');

    const mesh = useRef();

    const [points, setPoints] = useState(Float32Array.from([]));
    const [initialResiduals, setInitialResiduals] = useState([]);
    const [finalResiduals, setFinalResiduals] = useState([]);

    const baseVector = new Vector2();

    function initData() {
        const newPoints = [];
        const newInitialResiduals = [];
        const newFinalResiduals = [];

        for (const [i, tiepoint] of tiepoints.entries()) {
            const isLeft = tiepoint.leftId === activeImage;

            const pixel = isLeft ? new Vector2(...tiepoint.leftPixel) : new Vector2(...tiepoint.rightPixel);
            pixel.setX(pixel.x - map.image.width / 2);
            pixel.setY(pixel.y - map.image.height / 2);

            if (isLeft) {
                newPoints.push(...pixel.toArray(), 1);
            } else {
                newPoints.push(...pixel.toArray(), 1);
            }

            const initialResidual = new Vector2(...tiepoint.initialResidual)
            const finalResidual = new Vector2(...tiepoint.finalResidual)

            newInitialResiduals.push(
                <Line
                    key={i}
                    color={0x0000FF}
                    points={[
                        [...pixel.toArray(), 0],
                        [...initialResidual.add(pixel).toArray(), 0],
                    ]}
                />
            );

            newFinalResiduals.push(
                <Line
                    key={i}
                    color={0x00FF00}
                    points={[
                        [...pixel.toArray(), 0],
                        [...finalResidual.add(pixel).toArray(), 0],
                    ]}
                />
            );
        }

        setPoints(Float32Array.from(newPoints));
        setInitialResiduals(newInitialResiduals);
        setFinalResiduals(newFinalResiduals);
    }

    function fitCamera() {
        const aabb = new Box3().setFromObject(mesh.current);
        camera.zoom = Math.min(
            size.width / (aabb.max.x - aabb.min.x),
            size.height / (aabb.max.y - aabb.min.y)
        );
        camera.updateProjectionMatrix();
    }

    useEffect(() => {
        fitCamera();
    }, [map]);

    useEffect(() => {
        initData();
    }, [tiepoints]);

    return (
        <>
            <mesh ref={mesh}>
                <planeGeometry args={[map.image.width, map.image.height]} />
                <meshBasicMaterial map={map} />
            </mesh>
            {points.length > 0 && (
                <Points positions={points}>
                    <pointsMaterial
                        sizeAttenuation={false}
                        size={3}
                        map={sprite}
                        alphaTest={0.5}
                        transparent={true}
                        color={0xFF0000}
                    />
                </Points>
            )}
            {initialResiduals.length > 0 && initialResiduals}
            {finalResiduals.length > 0 && finalResiduals}
        </>
    );
}

function Container() {
    const { activeImage, tiepoints } = useData();

    return (
        <Canvas className={styles.container} orthographic={true}>
            <TiepointImage activeImage={activeImage} tiepoints={tiepoints[activeImage]} />
        </Canvas>
    );
}

export default Container;