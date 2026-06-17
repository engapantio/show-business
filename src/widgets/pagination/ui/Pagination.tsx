import { Box, Pagination as MuiPagination } from '@mui/material';

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
      <MuiPagination
        page={page}
        count={totalPages}
        onChange={(_, p) => onChange(p)}
        color="primary"
        shape="rounded"
        size="large"
      />
    </Box>
  );
}
