import React from 'react';
import { templates } from 'core/js/reactHelpers';

export default function Typist(props) {
  const {
    texts = [],
    fontSize,
    _typedText,
    _isFinished
  } = props;
  const style = fontSize ? { fontSize: `${fontSize}px` } : null;
  const paragraphs = texts.map((text, index) => <p key={index}>{text}</p>);
  return (
    <div className="component__inner typist__inner">
      <templates.header {...props} />
      <div className="component__widget typist__widget" style={style}>
        {_isFinished
          ? <div className="typist__texts">{paragraphs}</div>
          : <>
            <div className="aria-label">{paragraphs}</div>
            <div className="typist__text" aria-hidden="true">{_typedText}</div>
          </>
        }
      </div>
    </div>
  );
}
