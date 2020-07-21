import React, { useEffect, useRef, useState } from 'react';
import {
  defaultBlockParse as mdParse,
  defaultReactOutput as mdOutput,
} from 'simple-markdown';

import { Button } from '../atoms';
import { cx } from '../../utils';
import './MarkdownEditor.css';


const MarkdownEditor = (props) => {
  const [editing, setEditing] = useState(false);
  const [content, changeContent] = useState(props.content);
  const [height, setHeight] = useState('15vh');

  // Use a ref to match the textarea height with its rendered output
  const previewRef = useRef(null);

  const startEdit = () => {
    if (previewRef.current) setHeight(previewRef.current.offsetHeight + 40);
    setEditing(true);
  };

  const cancelEdit = () => {
    changeContent(props.content);
    setEditing(false);
  };

  useEffect(() => {
    // if content changes from parent, cancel the edit
    changeContent(props.content);
    setEditing(false);
  }, [props.content]);

  const onChange = (event) => changeContent(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(content);
    setEditing(false);
  };

  return (
    <div className={cx("MarkdownEditor", props.className)} >
      {editing ? (
        <form className="MarkdownEditor_form" onSubmit={onSubmit}>
          <textarea
            autoFocus
            onChange={onChange}
            style={{ height }}
            value={content}
          />

          <div>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={cancelEdit}>Cancel</Button>

            <a className="help" href="https://www.markdownguide.org/cheat-sheet/">
              How To Format Text?
            </a>
          </div>
        </form>
      ) : (
        <>
        <div className="MarkdownEditor_preview" ref={previewRef}>
          {mdOutput(mdParse(content))}
        </div>

        <Button onClick={startEdit}>Edit</Button>
        </>
      )}
    </div>
  );
};

export default MarkdownEditor;
