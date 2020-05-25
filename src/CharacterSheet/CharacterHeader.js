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
import { addSign } from '../utils';
import './CharacterHeader.css';

const CharacterHeader = ({ character }) => {
  const dispatch = useContext(DispatchContext);

  const toggleInspiration = () => dispatch({
    type: 'updateCharacter',
    id: character.id,
    character: { inspiration: !character.inspiration },
  });

  return (
    <header className="CharacterHeader">
      <div>
        <h2>{character.name}</h2>

        <p>{character.race} {character.class} {character.level}</p>
      </div>

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
        <Stat label="Experience">
          {character.experience}
        </Stat>
      </StatList>
    </header>
  );
};

export default CharacterHeader;
