/* eslint no-underscore-dangle: 0 */
import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import ImageUpload from '../../ImageUpload/ImageUpload';
// @ts-ignore
import storage from '../../../firebase';

export default function MapUpload() {
  const [file, setFile] = useState<File | undefined>();
  const [url, setUrl] = useState('');

  console.log('url from firebase', url);

  function handleUpload() {
    if (!file) return;
    const storageRef = ref(storage, `/images/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      setUrl(
        // @ts-ignore
        `https://firebasestorage.googleapis.com/v0/b/dnd-masters.appspot.com/o/${snapshot.ref._location.path_.replace(
          /\//,
          '%2F',
        )}?alt=media`,
      );
    });
  }

  const handleSubmit = (): void => {
    console.log('handlesubmit fired');
    handleUpload();
  };

  return (
    <div>
      <ImageUpload setFile={setFile} />
      <h1>Upload Image</h1>
      <button type="submit" onClick={() => handleSubmit()}>
        submit
      </button>
    </div>
  );
}
