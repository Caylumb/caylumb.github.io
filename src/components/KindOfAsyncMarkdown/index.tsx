import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

interface AsyncMarkdownProps {
  markdownFetcher: () => Promise<string>;
}

function KindOfAsyncMarkdown({ markdownFetcher }: AsyncMarkdownProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  // This is a bit of a hacky way to asynchronously load the markdown content
  useEffect(() => {
    markdownFetcher()
      .then((content) => {
        setText(content);
      })
      .catch((error) => {
        console.error('Error loading markdown file:', error);
        setError(true);
      });
  }, [markdownFetcher]);

  if (text == '') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading content</div>;
  }

  return <Markdown>{text}</Markdown>;
}

export default KindOfAsyncMarkdown;
