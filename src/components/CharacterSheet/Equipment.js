import React, { useContext, useState } from 'react';

import { DispatchContext } from '../App';
import { Button, Input, Select, Table } from '../atoms';
import { UPDATE_CHARACTER } from '../../constants/actionTypes';
import { MarkdownEditor } from '../molecules';
import './Equipment.css';

const COINS = ['cp', 'sp', 'ep', 'gp', 'pp'];
const COINS_DESCRIPTION = [
  'Copper',
  'Silver (1 sp = 10 cp)',
  'Electrum (1 ep = 5 sp)',
  'Gold (1 gp = 10 sp)',
  'Platinum (1 pp = 10 gp)',
]

const Equipment = ({ character }) => {
  const dispatch = useContext(DispatchContext);

  const updateCharacter = (fields) => dispatch({
    type: UPDATE_CHARACTER,
    id: character.id,
    character: fields,
  });

  const initialFormState = { type: '', amount: '' };
  const [formState, setFormState] = useState(initialFormState);
  const changeFormField = (key) => (event) =>
    setFormState({ ...formState, [key]: event.target.value });

  const add = (x, y) => x + y;
  const sub = (x, y) => x - y;

  const updateCoin = (fn) => () => {
    const { type, amount } = formState;
    if (COINS.includes(type) && Number.isInteger(Number(amount))) {
      const coin = { ...character.coin };
      coin[type] = fn((coin[type] || 0), Number(amount));
      updateCharacter({ coin });
      setFormState(initialFormState);
    }
  };

  const updateEquipmentNotes = (equipmentNotes) =>
    updateCharacter({ equipmentNotes });

  return (
    <section className="Equipment">
      <Table>
        <thead>
          <tr>
            {COINS.map((c, i) => (
              <th key={c} title={COINS_DESCRIPTION[i]}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {COINS.map(c => <td key={c}>{character.coin[c]}</td>)}
          </tr>
        </tbody>
      </Table>

      <form className="CoinForm">
        <label htmlFor="type">Coin:
        <Select
          id="type"
          onChange={changeFormField('type')}
          value={formState.type}
        >
            <option value="">-</option>
            {COINS.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </Select>
        </label>

        <label htmlFor="amount">Amount:
        <Input
          id="amount"
          disabled={formState.type === ''}
          type="number"
          onChange={changeFormField('amount')}
          value={formState.amount}
        />
        </label>

        <Button disabled={formState.type === ''} type="button" onClick={updateCoin(add)}>
          Add
        </Button>

        <Button disabled={formState.type === ''} type="button" onClick={updateCoin(sub)}>
          Subtract
        </Button>
      </form>

      <MarkdownEditor
        content={character.equipmentNotes}
        handleSubmit={updateEquipmentNotes}
      />
    </section>
  );
};

export default Equipment;
