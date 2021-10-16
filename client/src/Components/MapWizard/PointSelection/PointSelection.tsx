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
    <path
      data-name="element3"
      transform="scale(5,5)"
      d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
      fill="black"
    />,
  ];

  const selectItem = (evt: any) => {
    dispatch(
      updateSelectedElement({ selectedElement: evt.target.dataset.name }),
    );
  };

  const selectList = elementList.map((element) => (
    <MapSelectionItem element={element} selectItem={selectItem} />
  ));
  return (
    <div className="map-edit-selection">
      <h3>Select a point of interest</h3>
      <div>{selectList}</div>
    </div>
  );
}
