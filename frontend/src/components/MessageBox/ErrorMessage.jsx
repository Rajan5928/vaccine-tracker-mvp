import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function ErrorMessage() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
      Your action has failed. Please retry.
    </Alert>
  );
}
