import { useReducer } from 'react';
import Toolbar from '@/components/Toolbar';
import Pill from '@/components/Pill';
import Label from '@/components/Label';
import Checkbox from '@/components/Checkbox';
import CameraViewport from '@/components/CameraViewport';
import { useData } from '@/DataContext';
import * as styles from '@/components/GlobalImageView.css';

enum ActionType {
    RESIDUAL_INITIAL = 'RESIDUAL_INITIAL',
    RESIDUAL_FINAL = 'RESIDUAL_FINAL',
};

interface State {
    isInitial: boolean;
    isFinal: boolean;
};

interface Action {
    type: string;
    data: string;
};

const initialState: State = { isInitial: true, isFinal: true };

function reducer(state: State, action: Action) {
    switch (action.type) {
        case ActionType.RESIDUAL_INITIAL:
            return { ...state, isInitial: !state.isInitial };
        case ActionType.RESIDUAL_FINAL:
            return { ...state, isFinal: !state.isFinal };
        default:
            return state;
    }
}

export default function GlobalScene() {
    const { initialResidualBounds, finalResidualBounds } = useData();

    const [state, dispatch] = useReducer(reducer, initialState);

    function handleChange(event: React.FormEvent<HTMLInputElement>) {
        dispatch({ type: event.currentTarget.name, data: event.currentTarget.value });
    }

    return (
        <>
            <Toolbar>
                <Pill>
                    <Label>
                        Residual Type
                    </Label>
                    <Checkbox
                        name={ActionType.RESIDUAL_INITIAL}
                        checked={state.isInitial}
                        onChange={handleChange}
                    >
                        <span>
                            Initial
                        </span>
                        <span>
                            [{initialResidualBounds[0][0]}, {initialResidualBounds[0][1]}]
                        </span>
                    </Checkbox>
                    <Checkbox
                        name={ActionType.RESIDUAL_FINAL}
                        checked={state.isFinal}
                        onChange={handleChange}
                        isInverted
                    >
                        <span>
                            Final
                        </span>
                        <span>
                            [{finalResidualBounds[0][0]}, {finalResidualBounds[0][1]}]
                        </span>
                    </Checkbox>
                </Pill>
            </Toolbar>
            <section className={styles.container}>
                <CameraViewport state={state} />
            </section>
        </>
    );
}