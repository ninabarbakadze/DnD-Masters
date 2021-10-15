import { SyntheticEvent, useState } from 'react';

export default function Modal({
  closeModal,
  modalIsActive,
  setModalIsActive,
}: any) {
  const [locationName, setLocationName] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const showHideClassName = modalIsActive ? 'modal-container' : 'hidden-modal';

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    console.log(locationName);
    console.log(locationDescription);
    setModalIsActive(false);
  };

  return (
    <div className={showHideClassName}>
      <h1>Describe the location</h1>
      <form onSubmit={handleSubmit}>
        <input
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
      <button onClick={closeModal} type="button">
        Close
      </button>
    </div>
  );
}
