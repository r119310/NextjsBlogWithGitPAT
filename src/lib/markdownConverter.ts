import markdownToTxt from 'markdown-to-txt';

export async function MarkdownToPlainText(content: string) {
  return markdownToTxt(content)
    .replaceAll(/<\/?[^>]+(>|$)/g, '')
    .replace(/\r\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ');
}
