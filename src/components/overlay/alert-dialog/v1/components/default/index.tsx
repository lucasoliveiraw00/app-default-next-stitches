import { Button } from '../../../../../form/button';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  FlexRow,
  StyledOverlay,
} from '../../styled-components';

import { AlertDialogProps } from './types';

const AlertDialog = (props: AlertDialogProps) => {
  const {
    title,
    description,
    triggerButtonName,
    triggerButtonType,
    confirmButtonName,
    cancelButtonName,
    confirmButtonType,
    cancelButtonType,
    confirmCallback,
    cancelCallback,
  } = props;
  return (
    <div>
      <AlertDialogRoot>
        <AlertDialogTrigger asChild>
          <Button btn={triggerButtonType}>{triggerButtonName}</Button>
        </AlertDialogTrigger>
        <AlertDialogPortal>
          <StyledOverlay />
          <AlertDialogContent onEscapeKeyDown={cancelCallback}>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
            <FlexRow>
              <AlertDialogCancel asChild>
                <Button
                  btn={cancelButtonType}
                  css={{ marginRight: '1rem' }}
                  onClick={cancelCallback}
                >
                  {cancelButtonName}
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button btn={confirmButtonType} onClick={confirmCallback}>
                  {confirmButtonName}
                </Button>
              </AlertDialogAction>
            </FlexRow>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </div>
  );
};

AlertDialog.defaultProps = {
  triggerButtonType: 'info',
  confirmButtonType: 'info',
  cancelButtonType: 'secondary',
  confirmCallback: undefined,
  cancelCallback: undefined,
};

export { AlertDialog };
