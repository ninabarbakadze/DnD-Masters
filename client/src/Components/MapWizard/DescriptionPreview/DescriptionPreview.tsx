import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';

export default function DescriptionPreview() {
  const { currentDescription, currentName } = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );
  return (
    <div className="map-edit-description">
      <h3>Location Description</h3>
      <h5>{currentName}</h5>
      <p>{currentDescription}</p>
    </div>
  );
}
