import { Chip, type ChipProps } from '@mui/material';

interface PostTagProps extends Omit<ChipProps, 'label'> {
  tag: string;
}

export function PostTag({ tag, ...rest }: PostTagProps) {
  return <Chip label={`#${tag}`} size="small" {...rest} />;
}
