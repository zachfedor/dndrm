import React, { useContext } from 'react';

import { DispatchContext } from '../App'
import { LabeledInput, MarkdownEditor } from '../molecules';
import './Background.css';


const Background = ({ character }) => {
  const dispatch = useContext(DispatchContext);
  const updateBackgroundNotes = (backgroundNotes) => dispatch({
    type: 'updateCharacter',
    id: character.id,
    character: { backgroundNotes },
  });

  return (
    <section className="Background">
      <form>
        <LabeledInput id="background" value={character.background} readOnly />        
        <LabeledInput id="alignment" value={character.alignment} readOnly />        
      </form>

      <MarkdownEditor
        content={character.backgroundNotes}
        handleSubmit={updateBackgroundNotes}
      />
    </section>
  );
};

export default Background;
