import { SyntheticEvent, useState } from 'react';

export default function ElementForm({ onModalSubmit, setModalIsActive }: any) {
  const [locationName, setLocationName] = useState('');
  const [locationDescription, setLocationDescription] = useState('');

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setModalIsActive(false);
    onModalSubmit(locationName, locationDescription);
    setLocationName('');
    setLocationDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        placeholder="Name this Location"
        value={locationName}
        onChange={(evt) => setLocationName(evt.target.value)}
      />
      <textarea
        placeholder="Describe this location"
        value={locationDescription}
        onChange={(evt) => setLocationDescription(evt.target.value)}
      />
      <input type="submit" value="Enter" />
    </form>
  );
}
