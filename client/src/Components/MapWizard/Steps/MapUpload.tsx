/* eslint-disable */
import { useState, useEffect } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import ImageUpload from '../../ImageUpload/ImageUpload';
import storage from '../../../firebase';
import { updateUrl } from '../../../actions/mapWizard.action';
import InfoModal from '../../InfoModal/InfoModal';

export default function MapUpload({ history }: any) {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | undefined>();
  const [mapUploaded, setMapUploaded] = useState(false);
  const [isModal, setIsModal] = useState(false);

  function handleUpload() {
    if (!file) return;
    const storageRef = ref(storage, `/images/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      dispatch(
        updateUrl({
          mapUrl:
            // @ts-expect-error
            `https://firebasestorage.googleapis.com/v0/b/dnd-masters.appspot.com/o/${snapshot.ref._location.path_.replace(
              /\//,
              '%2F',
            )}?alt=media`,
        }),
      );
    });
  }

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
      <InfoModal
        isVisible={isModal}
        setIsVisible={toggleModal}
        message="Image successfully uploaded"
        type="success"
      />
    </div>
  );
}
