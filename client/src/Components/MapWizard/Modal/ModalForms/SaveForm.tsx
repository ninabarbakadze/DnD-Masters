import { SyntheticEvent, useState } from 'react';

export default function SaveForm({ onModalSubmit, setModalIsActive }: any) {
  const [mapName, setMapName] = useState('');

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setModalIsActive(false);
    onModalSubmit();
    setMapName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        placeholder="your mapname"
        value={mapName}
        onChange={(evt) => setMapName(evt.target.value)}
      />
      <input type="submit" value="Enter" />
    </form>
  );
}
