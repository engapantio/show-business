import { Stack, Chip } from '@mui/material';
import { POPULAR_TAGS } from '../model/tags';

interface TagFilterProps {
  activeTag: string;
  onSelect: (tag: string) => void;
}

export function TagFilter({ activeTag, onSelect }: TagFilterProps) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={1} role="list" aria-label="Filter by tag">
      {POPULAR_TAGS.map((tag) => {
        const isActive = tag === activeTag;
        return (
          <Chip
            key={tag}
            role="listitem"
            label={`#${tag}`}
            size="small"
            onClick={() => onSelect(isActive ? '' : tag)}
            aria-pressed={isActive}
            sx={
              isActive
                ? {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }
                : {}
            }
          />
        );
      })}
    </Stack>
  );
}
