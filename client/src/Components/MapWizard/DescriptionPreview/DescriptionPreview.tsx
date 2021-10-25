import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';

const DescriptionPreview = () => {
  const { currentDescription, currentName } = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );
  return (
    <div className="map-edit-description">
      <h2>Location Description</h2>
      <h5>{currentName}</h5>
      <p>{currentDescription}</p>
    </div>
  );
};

export default DescriptionPreview;
