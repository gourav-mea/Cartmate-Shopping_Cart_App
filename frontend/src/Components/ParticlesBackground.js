import React from 'react';
import particlesfile from './particles.json';
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";


export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log(container);
    }, []);

    return (
        <div className="" style={{ position: "relative", zIndex: "-50" }}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={particlesfile}
            />
                
        </div>
    );
}
