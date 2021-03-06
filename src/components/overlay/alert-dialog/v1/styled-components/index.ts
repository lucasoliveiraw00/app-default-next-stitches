import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { keyframes, styled } from '../../../../../theme';

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogRoot = AlertDialogPrimitive.Root;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.44)',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

export const AlertDialogContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  '&:focus': { outline: 'none' },
});

export const AlertDialogTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  color: '$gray',
  fontSize: 17,
  fontWeight: 500,
  marginBottom: 10,
});

export const AlertDialogDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: 30,
  color: '$gray',
  fontSize: 15,
  lineHeight: 1.5,
});

export const FlexRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});
