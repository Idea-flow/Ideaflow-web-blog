export function createMarkdownItNewWindowPlugin() {
  return function(md) {
    // 保存原始的渲染器
    const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

    // 重写链接渲染器
    md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
      // 为所有链接添加 target="_blank" 和 rel="noopener noreferrer" 属性
      const token = tokens[idx];
      
      // 添加 target="_blank"
      const targetIndex = token.attrIndex('target');
      if (targetIndex < 0) {
        token.attrPush(['target', '_blank']);
      } else {
        token.attrs[targetIndex][1] = '_blank';
      }

      // 添加 rel="noopener noreferrer"
      const relIndex = token.attrIndex('rel');
      if (relIndex < 0) {
        token.attrPush(['rel', 'noopener noreferrer']);
      } else {
        token.attrs[relIndex][1] = 'noopener noreferrer';
      }

      // 调用原始渲染器
      return defaultRender(tokens, idx, options, env, self);
    };
  };
}