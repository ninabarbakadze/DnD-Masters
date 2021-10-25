import './InfoBanner.scss';

export default function InfoBanner({
  message,
  type,
  isVisible,
  setIsVisible,
}: any) {
  return (
    <div className={isVisible ? `info-modal ${type}` : 'not-visible'}>
      <button type="button" onClick={setIsVisible} className="modal-close">
        X
      </button>
      <h3>{message}</h3>
    </div>
  );
}
