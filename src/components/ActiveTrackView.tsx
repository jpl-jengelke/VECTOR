import { Track } from '@/components/Tracks';
import CameraViewport from '@/components/CameraViewport';
import RadialChart from '@/components/RadialChart';
import ResidualChart from '@/components/ResidualChart';
import SlopeChart from '@/components/SlopeChart';
import { PageAction } from '@/App';
import { useData } from '@/DataContext';
import * as styles from '@/components/ActiveTrackView.css';

interface ActiveTrackViewProps {
    dispatch: React.Dispatch<PageAction>;
};

export default function ActiveTrackView({ dispatch }: ActiveTrackViewProps) {
    const { activeImage, activeTrack } = useData();

    return (
        <>
            {activeImage && activeTrack && (
                <section className={styles.grid}>
                    <div className={styles.panel}>
                        <h3 className={styles.header}>
                            Track ID: {activeTrack}
                        </h3>
                        <div className={styles.bar}>
                            <Track
                                dispatch={dispatch}
                                activeImage={activeImage}
                                activeTrack={activeTrack}
                            />
                        </div>
                        <CameraViewport />
                    </div>
                    <div className={styles.column}>
                        <div className={styles.item}>
                            <RadialChart activeImage={activeImage} activeTrack={activeTrack} />
                        </div>
                        <div className={styles.item}>
                            <ResidualChart activeImage={activeImage} activeTrack={activeTrack} />
                        </div>
                        <div className={styles.item}>
                            <SlopeChart activeImage={activeImage} activeTrack={activeTrack} />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
