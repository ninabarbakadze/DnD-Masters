import { useSelector } from 'react-redux';
import { getMap } from '../../../services/map.service';
import { IRootState } from '../../../reducers';
import { updateMapElements } from '../../../actions/gameWizard.actions';
import { PayloadAction } from '../../../interfaces/redux.interface';
import { iGameWizardState } from '../../../reducers/gameCreation.reducer';

interface props {
  onSubmit(data: iGameWizardState, payloadAction: PayloadAction<iGameWizardState>): void;
}

const Invitation = ({ onSubmit }: props) => {
  const { mapId } = useSelector(
    (state: IRootState) => state.gameCreationReducer,
  );

  const user = useSelector((state: IRootState) => state.userReducer);

  const getMapData = async () => {
    if (mapId) {
      const mapData = await getMap(user.name, mapId);
      onSubmit(
        { elementArr: JSON.parse(mapData.locationData), playerArr: [] },
        updateMapElements,
      );
    }
  };

  const handleClick = () => {
    getMapData();
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
};

export default Invitation;
