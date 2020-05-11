import React from 'react';

import { Table } from '../atoms';
import {
  getSpellAttackBonus,
  getSpellcastingAbility,
  getSpellSaveDC,
} from '../formulas';
import { MarkdownEditor } from '../molecules';
import SpellSlots from './SpellSlots';
import './Spells.css';


const Spells = ({ character }) => {
  const ability = getSpellcastingAbility(character);

  const toggleSpellSlot = () => { console.log('toggle spell slot') };

  const updateSpellNotes = (spellNotes) => console.log('update spell notes', spellNotes);

  return (
    <section className="Spells">
      {ability ? (
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

        <SpellSlots slots={character.spellSlots} toggleSpellSlot={toggleSpellSlot} />

        <MarkdownEditor content={character.spellNotes} handleSubmit={updateSpellNotes} />
        </>
      ) : (
        <p><em>This character can't cast spells</em></p>
      )}
    </section>
  );
};

export default Spells;
