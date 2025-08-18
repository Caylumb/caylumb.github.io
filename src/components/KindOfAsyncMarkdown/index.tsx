import { useEffect, useState } from 'react';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import KindOFAsyncModelLoader from '../KindOFAsyncModelLoader';
import { customMarkdownSyntaxPlugin } from '../../customMarkdownSyntaxPlugin';

interface AsyncMarkdownProps {
  markdownFetcher: () => Promise<string>;
}

const components: Components = {
  div: ({ node, ...props }) => {
    // Check for our custom attribute
    if (
      node &&
      'properties' in node &&
      node.properties &&
      typeof node.properties['data-three-d-viwer'] === 'string'
    ) {
      return <KindOFAsyncModelLoader modelName={node.properties['data-three-d-viwer']} />;
    }
    // Default div
    return <div {...props} />;
  },
};

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

  return (
    <Markdown rehypePlugins={[remarkGfm, customMarkdownSyntaxPlugin]} components={components}>
      {text}
    </Markdown>
  );
}

export default KindOfAsyncMarkdown;
