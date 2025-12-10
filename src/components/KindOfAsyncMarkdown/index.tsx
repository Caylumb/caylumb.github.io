import { useEffect, useState } from 'react';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import KindOFAsyncModelLoader from '../KindOFAsyncModelLoader';
import { customMarkdownSyntaxPlugin } from '../../customMarkdownSyntaxPlugin';
import KindOfAsyncImageLoader from '../KindOfAsyncImageLoader';
import Layout from '../Layout';

interface AsyncMarkdownProps {
  markdownFetcher: () => Promise<string>;
}

const components: Components = {
  div: ({ node, ...props }) => {
    if (
      node &&
      'properties' in node &&
      node.properties &&
      typeof node.properties['data-three-d-viewer'] === 'string'
    ) {
      return <KindOFAsyncModelLoader modelName={node.properties['data-three-d-viewer']} />;
    }
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
  a: ({ href, children }) => {
    const cleanHref = href?.replace('.md', '');
    return <a href={cleanHref}>{children}</a>;
  },
};

function KindOfAsyncMarkdown({ markdownFetcher }: AsyncMarkdownProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

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

  if (text === '') {
    return (
      <Layout>
        <div className="markdown-content">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="markdown-content">
          <p>Error loading content</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="markdown-content">
        <Markdown rehypePlugins={[remarkGfm, customMarkdownSyntaxPlugin]} components={components}>
          {text}
        </Markdown>
      </article>
    </Layout>
  );
}

export default KindOfAsyncMarkdown;
