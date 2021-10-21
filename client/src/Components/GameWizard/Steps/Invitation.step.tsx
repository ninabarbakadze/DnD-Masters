import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMap } from '../../../services/map.service';
import { IRootState } from '../../../reducers';
import { updateMapElements } from '../../../actions/gameWizard.actions';

function Invitation({ onSubmit }: any) {
  // const dispatch = useDispatch();
  const { mapId } = useSelector(
    (state: IRootState) => state.gameCreationReducer,
  );

  const user = useSelector((state: IRootState) => state.user);

  const getMapData = async () => {
    if (mapId) {
      const mapData = await getMap(user.name, mapId);
      onSubmit(
        { elementArr: JSON.parse(mapData.locationData) },
        updateMapElements,
      );
    }
  };

  const handleClick = () => {
    getMapData();
    // onSubmit();
  };

  return (
    <div>
      <p>
        Invitiation Link:
        {Math.random()}
      </p>
      <button type="button" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
}

export default withRouter(Invitation);
