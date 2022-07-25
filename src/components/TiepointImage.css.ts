import { style } from '@vanilla-extract/css';
import { vars } from '../utils/theme.css';

export const container = style({
    display: 'flex',
    flexDirection: 'column',
    height: '50%',
    padding: '1rem',
    marginBottom: '2rem',
    backgroundColor: vars.color.backgroundBlue,
    borderRadius: '0.4rem',
});

export const header = style({
    paddingBottom: '1rem',
    fontSize: '1.2rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    textAlign: 'center',
});
