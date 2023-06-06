import React from 'react';

const ParagraphWithCharacterLimit = ({ text, characterLimit }) => {
  const truncatedText = text.slice(0, characterLimit);

  return (
    <p>
      {truncatedText}
      {text.length > characterLimit && '...'}
    </p>
  );
};

export default ParagraphWithCharacterLimit;
