const formatLabelForDigit = (
  n: number,
  [label1, label2to4, label5to10]: string[]
) => {
  const isSingularLabel = (n: string) =>
    n.slice(-2) !== '11' && n.slice(-1) === '1';

  const isPluralLabel2to4 = (n: string) => {
    const lastDigit = parseInt(n.slice(-1));
    return lastDigit >= 2 && lastDigit <= 4 && n.slice(-2, -1) !== '1';
  };

  const stringified = n.toString();

  if (isSingularLabel(stringified)) {
    return label1;
  }

  if (isPluralLabel2to4(stringified)) {
    return label2to4;
  }

  return label5to10;
};

export default formatLabelForDigit;
