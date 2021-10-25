import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ImageUpload from '../../ImageUpload/ImageUpload';
import storage from '../../../firebase';
import { updateUrl } from '../../../actions/mapWizard.action';
import InfoBanner from '../../InfoBanner/InfoBanner';

interface props {
  history: RouteComponentProps['history'];
}

export default function MapUpload({ history }: props) {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();
  const [mapUploaded, setMapUploaded] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const handleUpload = () => {
    if (!file) return;
    const storageRef = ref(storage, `/images/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      dispatch(
        updateUrl({
          mapUrl: `https://firebasestorage.googleapis.com/v0/b/dnd-masters.appspot.com/o/${snapshot.metadata.fullPath.replace(
            /\//,
            '%2F',
          )}?alt=media`,
        }),
      );
    });
  };

  const handleSubmit = (): void => {
    handleUpload();
    setIsModal(!isModal);
    setMapUploaded(true);
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="map-upload-container">
      <div className="upload-image-header">
        <h1>Image Upload</h1>
        <h3>Select an Image and edit your Map</h3>
      </div>
      <div className="upload-preview">
        <ImageUpload setFile={setFile} />
        {file && (
          <button
            className={mapUploaded ? 'not-visible' : 'main-button'}
            type="submit"
            onClick={() => handleSubmit()}
          >
            Upload
          </button>
        )}
        <button
          className={
            mapUploaded ? 'main-button success-button' : 'not-visible '
          }
          type="button"
          onClick={() => history.push('/mapWizard/mapEdit')}
        >
          Edit Map
        </button>
      </div>
      <InfoBanner
        isVisible={isModal}
        setIsVisible={toggleModal}
        message="Image successfully uploaded"
        type="success"
      />
    </div>
  );
}
