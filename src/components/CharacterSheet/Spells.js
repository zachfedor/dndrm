import React, { useContext, useEffect, useState } from 'react';

import { DispatchContext } from '../App';
import { Button, Input, Ordinal, Table } from '../atoms';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import {
  getSpellAttackBonus,
  getSpellcastingAbility,
  getSpellSaveDC,
} from '../../formulas';
import { MarkdownEditor } from '../molecules';
import SpellSlots from './SpellSlots';
import './Spells.css';


const Spells = ({ character }) => {
  const dispatch = useContext(DispatchContext);

  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  // Cancel the edit if user navigates to another character
  useEffect(() => setEdit(false), [character.id]);

  const [spellSlots, setSpellSlots] = useState(Array(9).fill(0).map((num, idx) => {
    return (character.spellSlots && character.spellSlots[idx + 1])
      ? character.spellSlots[idx + 1].length : num;
  }));

  const updateSpellNotes = (spellNotes) => dispatch({
    type: UPDATE_CHARACTER,
    id: character.id,
    character: { spellNotes },
  });

  const changeSlotLevel = (idx) => (event) => {
    setSpellSlots([
      ...spellSlots.slice(0, idx),
      Number(event.target.value),
      ...spellSlots.slice(idx + 1)
    ]);
  };

  const updateSpellSlots = (event) => {
    event.preventDefault();

    const slotsPerLevel = spellSlots.reduce((obj, num, idx) => {
      if (num) obj[idx + 1] = Array(num).fill(true);
      return obj;
    }, {});

    dispatch({
      type: UPDATE_CHARACTER,
      id: character.id,
      character: {
        spellSlots: Object.keys(slotsPerLevel).length ? slotsPerLevel : null,
      },
    });
    setEdit(false);
  };

  const ability = getSpellcastingAbility(character);

  if (edit) {
    return (
      <section className="Spells-edit">
        <form onSubmit={updateSpellSlots}>
          <Table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Number of Slots</th>
              </tr>
            </thead>
            <tbody>
              {spellSlots.map((num, idx) => (
                <tr key={idx}>
                  <td><Ordinal num={idx + 1} /></td>
                  <td>
                    <Input
                      onChange={changeSlotLevel(idx)}
                      max={5}
                      min={0}
                      type="number"
                      value={num}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="Spells_buttonGroup">
                  <Button type="submit">Save</Button>
                  <Button type="button" onClick={toggleEdit}>Cancel</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </form>
      </section>
    );
  }

  return (
    <section className="Spells">
      {character.spellSlots ? (
        <>
        <Table>
          <thead>
            <tr>
              <th>Spellcasting Ability</th>
              <th>Spell Save DC</th>
              <th>Spell Attack Bonus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* TODO: multiclassing - loop through all class abilities separately */}
              <td>{ability}</td>
              <td>{getSpellSaveDC(character)}</td>
              <td>{getSpellAttackBonus(character)}</td>
            </tr>
          </tbody>
        </Table>

        <SpellSlots character={character} />

        <Button onClick={toggleEdit}>
          Edit Spell Slots
        </Button>

        <MarkdownEditor content={character.spellNotes} handleSubmit={updateSpellNotes} />
        </>
      ) : (
        <>
        <p><em>This character can't cast spells.</em></p>

        <Button onClick={toggleEdit}>
          Edit Spell Slots
        </Button>
        </>
      )}
    </section>
  );
};

export default Spells;
