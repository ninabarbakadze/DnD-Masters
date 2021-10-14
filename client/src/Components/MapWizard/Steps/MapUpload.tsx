/* eslint no-underscore-dangle: 0 */
import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import ImageUpload from '../../ImageUpload/ImageUpload';
import storage from '../../../firebase';

export default function MapUpload() {
  const [file, setFile] = useState<File | undefined>();
  const [url, setUrl] = useState('');

  console.log('url from firebase', url);

  function handleUpload() {
    console.log('handleupload fired');
    if (!file) return;
    const storageRef = ref(storage, `/images/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      setUrl(
        // @ts-ignore
        `https://firebasestorage.googleapis.com/u/0/project/dnd-masters/storage/dnd-masters.appspot.com/o/${snapshot.ref._location.path_.replace(
          /\//,
          '%2F',
        )}?alt=media`,
      );
    });
  }
  // https://console.firebase.google.com/u/0/project/dnd-masters/storage/dnd-masters.appspot.com/files/~2Fimages
  const handleSubmit = (): void => {
    console.log('handlesubmit fired');
    handleUpload();
  };

  console.log(url);
  console.log(file);
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
