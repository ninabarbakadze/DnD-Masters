import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';

export default function DescriptionPreview() {
  const { currentDescription } = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );
  return (
    <div className="map-edit-description">
      <h3>Location Description</h3>
      <p>{currentDescription}</p>
    </div>
  );
}
