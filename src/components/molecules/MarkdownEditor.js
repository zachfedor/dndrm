import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // if content changes from parent, reflect change in local state safely
    changeContent(props.content);
  }, [props.content]);

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

            <a className="help" href="https://www.markdownguide.org/cheat-sheet/">
              Help: Formatting in Markdown
            </a>
          </div>
        </form>
      ) : (
        <div className="MarkdownEditor_preview">
          {mdOutput(mdParse(content))}
          
          <Button onClick={startEdit}>Edit</Button>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
