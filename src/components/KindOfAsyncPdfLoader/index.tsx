import { useMemo } from 'react';

const pdfModules = import.meta.glob<string>('../../assets/**/*.pdf', {
  eager: true,
  import: 'default',
  query: '?url',
});

interface KindOfAsyncPdfLoaderProps {
  pdfPath: string;
}

export default function KindOfAsyncPdfLoader({ pdfPath }: KindOfAsyncPdfLoaderProps) {
  const pdfUrl = useMemo(() => {
    const key = `../../assets/${pdfPath}.pdf`;
    return pdfModules[key] ?? null;
  }, [pdfPath]);

  if (!pdfUrl) {
    return <div>Error loading PDF</div>;
  }

  return (
    <iframe
      src={pdfUrl}
      style={{ width: '100%', height: '400px', border: 'none' }}
      title={pdfPath}
    />
  );
}
