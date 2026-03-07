import { useMemo } from 'react';

const pdfModules = import.meta.glob<string>('../../assets/blogPosts/**/*.pdf', {
  eager: true,
  import: 'default',
  query: '?url',
});

interface NewTabLinkProps {
  href: string;
  label: string;
}

export default function NewTabLink({ href, label }: NewTabLinkProps) {
  const resolvedHref = useMemo(() => {
    // If it looks like an internal PDF path (no protocol, ends with .pdf or matches a known path)
    const pdfKey = `../../assets/blogPosts/${href}.pdf`;
    if (pdfModules[pdfKey]) {
      return pdfModules[pdfKey];
    }
    // Otherwise treat as a direct URL (external or otherwise)
    return href;
  }, [href]);

  return (
    <a href={resolvedHref} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}
