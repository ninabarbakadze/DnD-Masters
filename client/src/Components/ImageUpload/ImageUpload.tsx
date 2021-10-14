import { useState, useRef } from 'react';

export default function ImageUpload({ setFile }: any) {
  const [url, setUrl] = useState('');
  const filePickerRef = useRef<HTMLInputElement>(null);
  console.log(url);
  console.log(filePickerRef);

  function pickedHandler(event: any) {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      const pickedFileUrl = URL.createObjectURL(pickedFile);
      setUrl(pickedFileUrl);
      setFile(pickedFile);
    }
  }

  function pickedImageHandler() {
    if (filePickerRef.current) filePickerRef.current.click();
  }

  return (
    <div className="image-container">
      <input
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickedHandler}
      />
      <div className="image-upload">
        <div className="image-upload-preview">
          {url && <img src={url} alt="preview" />}
          {!url && (
            <div className="center">
              <button
                className="upload-button"
                type="button"
                onClick={pickedImageHandler}
              >
                <span>+</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
