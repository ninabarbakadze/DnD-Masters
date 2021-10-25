import { useDispatch, useSelector } from 'react-redux';
import {
  updateSelectedElement,
  setDelete,
} from '../../../actions/mapWizard.action';
import MapSelectionItem from '../MapSelectionItem/MapSelectionItem';
import { IRootState } from '../../../reducers';
import pointSelectionItems from '../../../assets/svgElements/pointSelectionItems';
import svgIcons from '../../../assets/svgElements/svgIcons';

const PointSelection = () => {
  const dispatch = useDispatch();
  const { shouldDelete } = useSelector(
    (state: IRootState) => state.mapCreationReducer,
  );
  const elementList = [
    <g
      data-name="element1"
      fill="white"
      transform="scale(1.2, 1.2) translate(5,5)"
      className="selection-icon"
    >
      {pointSelectionItems.castle}
    </g>,
    <g
      className="selection-icon"
      data-name="element2"
      fill="white"
      transform="scale(0.2,0.2) translate(-35,-35)"
    >
      {pointSelectionItems.forest}
    </g>,
    <path
      className="selection-icon"
      data-name="element3"
      transform="scale(5,5)"
      d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
      fill="white"
    />,
  ];

  const elementNames = ['element1', 'element2', 'element3'];

  const selectItem = (elementName: string) => {
    dispatch(updateSelectedElement({ selectedElement: elementName }));
  };

  const selectList = elementList.map((element, index) => (
    <MapSelectionItem
      key={JSON.stringify(index)}
      element={element}
      selectItem={selectItem}
      elementName={elementNames[index]}
    />
  ));
  return (
    <div className="map-edit-selection">
      <h2>Select a point of interest</h2>
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
        {svgIcons.delete}
      </svg>
    </div>
  );
};

export default PointSelection;
