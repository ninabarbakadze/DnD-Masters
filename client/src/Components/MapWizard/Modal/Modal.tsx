export default function Modal({
  closeModal,
  modalIsActive,
  heading,
  children,
}: any) {
  const showHideClassName = modalIsActive ? 'modal-container' : 'hidden-modal';

  return (
    <div className={showHideClassName}>
      <div className="modal-form-container">
        <h1>{heading}</h1>
        {children}
        <button
          className=" close-modal-button side-button danger-button"
          onClick={closeModal}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  );
}
