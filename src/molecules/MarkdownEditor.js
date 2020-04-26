import React, { useState } from 'react';
import {
  defaultBlockParse as mdParse,
  defaultReactOutput as mdOutput,
} from 'simple-markdown';

import { Button } from '../atoms';
import { cx } from '../utils';
import './MarkdownEditor.css';


const MarkdownEditor = (props) => {
  const [editing, setEditing] = useState(false);
  const [content, changeContent] = useState(props.content);

  const startEdit = () => setEditing(true);

  const cancelEdit = () => {
    changeContent(props.content);
    setEditing(false);
  };

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
          <textarea onChange={onChange} value={content} autoFocus />

          <div>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={cancelEdit}>Cancel</Button>

            <span className="help">
              Formatting: <strong>**bold**</strong>, <em>_italic_</em>, or lists with - or 1.
            </span>
          </div>
        </form>
      ) : (
        <div className="MarkdownEditor_preview">
          {mdOutput(mdParse(content))}
          
          <Button onClick={startEdit}>Update</Button>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
