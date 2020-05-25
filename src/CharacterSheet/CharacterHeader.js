import React, { useContext } from 'react';

import { DispatchContext } from '../App';
import { CheckCircle } from '../atoms';
import Stat from '../CharacterCard/Stat';
import StatList from '../CharacterCard/StatList';
import {
  getAbilityModifier,
  getProficiencyBonus,
  getSkillModifier,
} from '../formulas';
import { LabeledInput } from '../molecules';
import { addSign } from '../utils';
import './CharacterHeader.css';

const CharacterHeader = ({ character }) => {
  const dispatch = useContext(DispatchContext);
  // const onChange = (event) => {
  //   console.log(event.target.id, event.target.value);
  // };
  const onSubmit = () => console.log('Updated character header');

  const toggleInspiration = () => dispatch({
    type: 'updateCharacter',
    id: character.id,
    character: { inspiration: !character.inspiration },
  });

  return (
    <header className="CharacterHeader">
      <h2>{character.name}</h2>

      <form onSubmit={onSubmit}>
        <div className="details">
          <LabeledInput id="race" value={character.race} readOnly />

          <LabeledInput id="class" value={character.class} readOnly />

          <LabeledInput id="level" value={character.level} readOnly />

          <LabeledInput id="experience" value={character.experience} readOnly />
        </div>
      </form>

      <StatList className="Stats">
        <Stat label="Proficiency Bonus">
          {addSign(getProficiencyBonus(character))}
        </Stat>
        <Stat label="Initiative Bonus">
          {addSign(getAbilityModifier(character, 'dexterity'))}
        </Stat>
        <Stat label="Passive Perception">
          {getSkillModifier(character, 'perception') + 10}
        </Stat>
        <Stat label="Armor Class">
          {character.armorClass}
        </Stat>
        <Stat label="Speed">
          {character.speed}
        </Stat>
        <Stat label="Inspiration">
          <CheckCircle
            checked={character.inspiration}
            handleClick={toggleInspiration}
          />
        </Stat>
      </StatList>
    </header>
  );
};

export default CharacterHeader;
