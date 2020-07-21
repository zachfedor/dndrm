import React, { useContext } from 'react';

import { DispatchContext } from '../App';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import { MarkdownEditor } from '../molecules';
import './Features.css';

const Features = ({ character }) => {
  // const placeholder = "Notes for Features, Traits, Feats, etc.";
  const dispatch = useContext(DispatchContext);
  const updateFeatureNotes = (featureNotes) => dispatch({
    type: UPDATE_CHARACTER,
    id: character.id,
    character: { featureNotes },
  });

  return (
    <section className="Features">
      <MarkdownEditor content={character.featureNotes} handleSubmit={updateFeatureNotes} />
    </section>
  );
};

export default Features;
