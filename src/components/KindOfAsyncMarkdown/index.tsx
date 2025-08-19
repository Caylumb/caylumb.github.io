import { useEffect, useState } from 'react';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import KindOFAsyncModelLoader from '../KindOFAsyncModelLoader';
import { customMarkdownSyntaxPlugin } from '../../customMarkdownSyntaxPlugin';
import KindOfAsyncImageLoader from '../KindOfAsyncImageLoader';

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
      typeof node.properties['data-three-d-viewer'] === 'string'
    ) {
      return <KindOFAsyncModelLoader modelName={node.properties['data-three-d-viewer']} />;
    }
    // Default div
    return <div {...props} />;
  },
  img: ({ src, alt }) => {
    const fullFileNameSplit = src?.split('/').pop()?.split('.');
    const fileName = fullFileNameSplit?.[0];
    const fileType = fullFileNameSplit?.[1];

    if (fileName && fileType && alt) {
      return <KindOfAsyncImageLoader imageName={fileName} imageType={fileType} altText={alt} />;
    } else {
      throw new Error('Image source is not valid');
    }
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
