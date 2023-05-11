import { Dialog, Portal, Text, Provider, Button } from 'react-native-paper';
import React from 'react';


interface IErrorModalProps {
  errText: string;
  visible: boolean;
  hideDialog: () => void;
}

const ErrorDialog = (props: IErrorModalProps) => { 
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.hideDialog}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{props.errText}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={props.hideDialog}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default ErrorDialog;