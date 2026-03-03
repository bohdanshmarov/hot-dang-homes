import React from "react";
import { getFontSizeForHeading, getTextAlign } from "utils/fonts";

export const Heading = ({ textAlign, content, level = 2 }) => {
  // Защита: если level не пришел, используем h2 по умолчанию
  const Tag = `h${level}`;

  return (
    <Tag
      dangerouslySetInnerHTML={{ __html: content }}
      className={`font-heading max-w-5xl mx-auto my-5 ${getFontSizeForHeading(
        level,
      )} ${getTextAlign(textAlign)}`}
    />
  );
};
