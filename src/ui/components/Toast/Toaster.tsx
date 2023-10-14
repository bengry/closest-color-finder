import { Toast } from './Toast';
import { useToast } from './useToast';
import { Grid } from '@shadow-panda/styled-system/jsx';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <Toast.Provider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <Grid gap="1">
              {title && <Toast.Title>{title}</Toast.Title>}
              {description && (
                <Toast.Description>{description}</Toast.Description>
              )}
            </Grid>

            {action}
            <Toast.Close />
          </Toast>
        );
      })}

      <Toast.Viewport />
    </Toast.Provider>
  );
}
