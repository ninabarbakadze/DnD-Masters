// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSelectedElement,
  setDelete,
} from '../../../actions/mapWizard.action';
import MapSelectionItem from '../MapSelectionItem/MapSelectionItem';
import { IRootState } from '../../../reducers';

export default function PointSelection() {
  // const [selectedElement, setSelectedElement] = useState('');
  const dispatch = useDispatch();
  const { shouldDelete } = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );
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
      <svg
        className={
          shouldDelete ? 'element-deletion deletion-on' : 'element-deletion'
        }
        onClick={() => dispatch(setDelete({ shouldDelete: true }))}
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        {/* eslint-disable-next-line */}
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path
          // eslint-disable-next-line
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
    </div>
  );
}
