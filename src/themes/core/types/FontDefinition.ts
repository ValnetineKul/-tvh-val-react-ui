export type FontDefinition = {
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: 'italic';
  lineHeight?: `${number}px`;
  fontSize?: `${number}px`;
  letterSpacing?: 'none';
  paragraphSpacing?: 'none';
  textDecoration?: 'none' | 'underline' | 'line-through';
  textTransform?: 'uppercase' | 'none';
};
