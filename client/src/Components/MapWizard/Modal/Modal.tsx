export default function Modal({ closeModal, modalIsActive }: any) {
  const showHideClassName = modalIsActive ? 'modal-container' : 'hidden-modal';
  return (
    <div className={showHideClassName}>
      <h1>Describe the location</h1>
      <button onClick={closeModal} type="button">
        Close
      </button>
    </div>
  );
}
