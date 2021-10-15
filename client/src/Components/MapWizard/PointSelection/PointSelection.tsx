// import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSelectedElement } from '../../../actions/mapWizard.action';
import MapSelectionItem from '../MapSelectionItem/MapSelectionItem';

export default function PointSelection() {
  // const [selectedElement, setSelectedElement] = useState('');
  const dispatch = useDispatch();
  const elementList = [
    <circle data-name="element1" r="50" cx="50" cy="50" fill="red" />,
    <rect data-name="element2" width="100" height="100" fill="blue" />,
  ];

  const handleClick = (evt: any) => {
    dispatch(
      updateSelectedElement({ selectedElement: evt.target.dataset.name }),
    );
  };

  const selectList = elementList.map((element) => (
    <MapSelectionItem element={element} handleClick={handleClick} />
  ));
  return (
    <div className="map-edit-selection">
      <h3>Select a point of interest</h3>
      <div>{selectList}</div>
    </div>
  );
}
