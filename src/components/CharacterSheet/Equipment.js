import React, { useContext } from 'react';

import { DispatchContext } from '../App';
import { Table } from '../atoms';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import { MarkdownEditor } from '../molecules';
import './Equipment.css';

const COINS = ['cp', 'sp', 'ep', 'gp', 'pp'];

const Equipment = ({ character }) => {
  const dispatch = useContext(DispatchContext);
  const updateEquipmentNotes = (equipmentNotes) => dispatch({
    type: UPDATE_CHARACTER,
    id: character.id,
    character: { equipmentNotes },
  });

  return (
    <section className="Equipment">
      <Table>
        <thead>
          <tr>
            {COINS.map(c => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {COINS.map(c => <td key={c}>{character.coin[c]}</td>)}
          </tr>
        </tbody>
      </Table>

      <MarkdownEditor content={character.equipmentNotes} handleSubmit={updateEquipmentNotes}/>
    </section>
  );
};

export default Equipment;
