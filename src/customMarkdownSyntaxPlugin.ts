import { visit, SKIP } from 'unist-util-visit';
import type { Element, ElementContent, Parent } from 'hast';

const regex = /<\{:(.*?):\}>/;

// This plugin works as a rehype plugin to inject a custom HTML element for <{:TEXT:}> patterns
export function customMarkdownSyntaxPlugin() {
  return function transformer(tree: Parent) {
    visit(
      tree,
      'element',
      (elementNode: Element, elementIndex: number | undefined, elementParent?: Parent) => {
        if (elementNode.tagName !== 'p' || !Array.isArray(elementNode.children)) return;
        const children = elementNode.children;
        let needsSplit = false;
        // Check if any child text node contains the pattern
        for (const child of children) {
          if (child.type === 'text' && regex.test(child.value)) {
            needsSplit = true;
            break;
          }
        }
        if (!needsSplit) return;

        // Build new nodes to replace the <p>
        const newNodes: ElementContent[] = [];
        let buffer: ElementContent[] = [];
        for (const child of children) {
          if (child.type === 'text') {
            const pattern = new RegExp(regex, 'g');
            let lastIndex = 0;
            let match;
            while ((match = pattern.exec(child.value)) !== null) {
              // Text before match
              if (match.index > lastIndex) {
                buffer.push({
                  type: 'text',
                  value: child.value.slice(lastIndex, match.index),
                });
              }
              // Flush buffer as <p> if not empty
              if (buffer.length > 0) {
                newNodes.push({
                  type: 'element',
                  tagName: 'p',
                  properties: {},
                  children: buffer,
                });
                buffer = [];
              }
              // Insert custom div
              newNodes.push({
                type: 'element',
                tagName: 'div',
                properties: {
                  'data-three-d-viewer': match[1],
                },
                children: [],
              });
              lastIndex = pattern.lastIndex;
            }
            // Remaining text after last match
            if (lastIndex < child.value.length) {
              buffer.push({
                type: 'text',
                value: child.value.slice(lastIndex),
              });
            }
          } else {
            buffer.push(child);
          }
        }
        // Flush any remaining buffer as <p>
        if (buffer.length > 0) {
          newNodes.push({
            type: 'element',
            tagName: 'p',
            properties: {},
            children: buffer,
          });
        }
        // Replace the original <p> node with newNodes
        if (elementParent && typeof elementIndex === 'number') {
          elementParent.children.splice(elementIndex, 1, ...newNodes);
          return SKIP;
        }
      },
    );
  };
}
