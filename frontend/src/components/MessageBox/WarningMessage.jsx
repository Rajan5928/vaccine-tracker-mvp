import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function WarningMessage() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="warning">
      There is an issue with your request
    </Alert>
  );
}
