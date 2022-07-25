import { useMemo, useRef, useEffect } from 'react';
import { Vector2 } from 'three';
import * as Plot from '@observablehq/plot';
import { useData } from '@/DataContext';
import { vars } from '@/utils/theme.css';
import * as styles from '@/components/ResidualLength.css';

function ResidualLength({ activeImage }) {
    const { tiepoints } = useData();

    const activeTiepoints = useMemo(() => tiepoints[activeImage], [activeImage, tiepoints]);

    const plot = useRef(null);

    const baseVector = new Vector2();

    useEffect(() => {
        const initialResiduals = [];
        const finalResiduals = [];

        for (const tiepoint of activeTiepoints) {
            const initialResidual = new Vector2(...tiepoint.initialResidual);
            const finalResidual = new Vector2(...tiepoint.finalResidual);

            const initialDistance = Number(baseVector.distanceTo(initialResidual).toFixed(1));
            const finalDistance = Number(baseVector.distanceTo(finalResidual).toFixed(1));

            initialResiduals.push({ Residual: initialDistance, initial: true });
            finalResiduals.push({ Residual: finalDistance, initial: false });
        }

        const svg = Plot.plot({
            style: {
                height: '100%',
                background: vars.color.backgroundBlue,
            },
            marks: [
                Plot.rectY(initialResiduals, Plot.binX({ y: 'count' }, { x: 'Residual', fill: vars.color.darkBlue })),
                Plot.rectY(finalResiduals, Plot.binX({ y: 'count' }, { x: 'Residual', fill: vars.color.lightBlue })),
            ],
        });

        plot.current.replaceChildren(svg);
    }, [activeTiepoints]);

    return (
        <div ref={plot} className={styles.container}></div>
    );
}

export default ResidualLength;
