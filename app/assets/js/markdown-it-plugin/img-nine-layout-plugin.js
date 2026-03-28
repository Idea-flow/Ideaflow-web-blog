export function createMarkdownItImgNineLayoutPlugin() {
  return function(md) {
    // 添加新的token类型
    const IMG_CARD_OPEN = 'img_card_open';
    const IMG_CARD_CLOSE = 'img_card_close';

    // 添加新的规则来识别imgCard标签
    md.block.ruler.before('fence', 'img_card', function(state, startLine, endLine, silent) {
      const start = state.bMarks[startLine] + state.tShift[startLine];
      const max = state.eMarks[startLine];
      
      // 检查是否是imgCard标签开始
      const startLine_content = state.src.slice(start, max).trim();
      if (!startLine_content.match(/<ImgNineLayout>/i)) return false;
      
      let nextLine = startLine + 1;
      let content = [];
      
      // 寻找结束标签
      while (nextLine < endLine) {
        const line = state.src.slice(state.bMarks[nextLine] + state.tShift[nextLine], state.eMarks[nextLine]).trim();
        if (line.match(/<\/ImgNineLayout>/i)) {
          break;
        }
        if (line.length > 0) { // 只添加非空行
          content.push(line);
        }
        nextLine++;
      }
      
      if (nextLine >= endLine) return false;
      
      if (silent) return true;
      
      // 创建token
      let token = state.push(IMG_CARD_OPEN, 'div', 1);
      token.block = true;
      token.map = [startLine, nextLine];
      token.attrs = [['class', 'img-nine-layout']];
      
      // 处理内容
      state.md.inline.parse(
        content.join('\n'),
        state.md,
        state.env,
        state.tokens
      );
      
      token = state.push(IMG_CARD_CLOSE, 'div', -1);
      token.block = true;
      
      state.line = nextLine + 1;
      return true;
    });


    // 渲染规则
    md.renderer.rules[IMG_CARD_OPEN] = function(tokens, idx) {
      return '<div class="img-nine-layout">';
    };
    
    md.renderer.rules[IMG_CARD_CLOSE] = function() {
      return '</div>';
    };
  };
}