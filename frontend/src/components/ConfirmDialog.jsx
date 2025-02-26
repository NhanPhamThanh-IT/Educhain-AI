import { Stack, Button, Dialog, Typography, DialogTitle, DialogActions } from '@mui/material';

export default function ConfirmDialog({
  open,
  title,
  onClose,
  onConfirm,
  confirmIcon,
  confirmText,
  messageTextField,
  message,
}) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      {/* <Divider sx={{ p: 1 }} /> */}
      <Stack spacing={3} sx={{ p: 3, pb: 0 }}>
        {messageTextField || (
          // Otherwise, use Typography for the message
          <Typography variant="p">{message}</Typography>
        )}
      </Stack>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onConfirm}
          startIcon={<Box icon={confirmIcon || 'eva:trash-2-fill'} />}
        >
          {confirmText || 'Đồng ý'}
        </Button>
        <Button onClick={onClose}>Không</Button>
      </DialogActions>
    </Dialog>
  );
}