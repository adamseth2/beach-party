import { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

type uploadImage = (id: string, file: File | null) => Promise<string | void>;

type useStorage = () => {
  uploadImage: uploadImage;
  error: any;
};

const useStorage: useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<any>(null);
  // const [id, setId] = useState<string>(null);
  //@ts-ignore
  const uploadImage: uploadImage = async (id: string, file: File | null) => {
    console.log('USESTORAGE TIME =');
    console.log(Date.now());
    if (file === null) {
      return;
    }
    const imgRef = ref(storage, id);
    console.log('File name is ' + id);
    const uploadTask = uploadBytesResumable(imgRef, file);
    let url = '';
    const promise = new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log('File available at', downloadURL);
            url = downloadURL;
            resolve(downloadURL);
          });
        }
      );
    });
    console.log('Promise is ', promise);
    return promise;
  };
  //   storageRef7.put(file).on(
  //     'state_changed',
  //     snap => {
  //       let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
  //       setProgress(percentage);
  //     },
  //     err => {
  //       setError(err);
  //     },
  //     async () => {
  //       const url = await storageRef.getDownloadURL();
  //       const createdOn = timestamp();
  //       collectionRef
  //         .add({
  //           name,
  //           title,
  //           price,
  //           dimension,
  //           description,
  //           url,
  //           createdOn,
  //         })
  //         .then(docRef => {
  //           setId(docRef.id);
  //         });
  //       setUrl(url);
  //     }
  //   );
  // }, [file]);

  return { uploadImage, progress, error };
};

export default useStorage;
