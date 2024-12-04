import React, {useEffect} from 'react';
import {
  StyleProp,
  PermissionsAndroid,
  StyleSheet,
  ViewStyle,
  TextInput,
  Platform,
} from 'react-native';
import {Button, Card, Snackbar} from 'react-native-paper';
import RNFS from 'react-native-fs';
import {DB_NAME} from '../db/AppDataSource';

import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const currentDbPath = `${RNFS.DocumentDirectoryPath}/../databases/${DB_NAME}`;
const exportPath = `${RNFS.DownloadDirectoryPath}/exported-database.db`; // Or any other path you prefer

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function ImportExportDB({style}: Props) {
  const [msg, setMsg] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'External Storage Permission',
            message:
              'This app needs access to your external storage to read files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can read from the external storage');
          accessDownloadDir();
        } else {
          console.log('Read permission denied');
        }
      } else {
        const result = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
        if (result === RESULTS.GRANTED) {
          setMsg('You can read from the media library');
          setVisible(true);
          accessDownloadDir();
        } else {
          setMsg('Read permission denied');
          setVisible(true);
        }
      }
    };

    const accessDownloadDir = () => {
      const downloadDir = RNFS.DownloadDirectoryPath;

      RNFS.readDir(downloadDir)
        .then(result => {
          console.log('GOT RESULT', result);
          const str = result.map(item => item.name).join(', ');
          setMsg('Res' + str);
          setVisible(true);
        })
        .catch(err => {
          setMsg('Error: ' + err.message);
          setVisible(true);
        });
    };

    requestPermission();
  }, []);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const exportDB = async () => {
    try {
      await RNFS.copyFile(currentDbPath, exportPath);
      console.log('Database exported to:', exportPath);
    } catch (error) {
      setMsg('Error importing database' + error);
      onToggleSnackBar();
    }
  };

  const importDatabase = async () => {
    try {
      await RNFS.copyFile(exportPath, currentDbPath);
      console.log('Database imported from:', exportPath);
    } catch (error) {
      setMsg('Error importing database' + error);
      onToggleSnackBar();
    }
  };

  return (
    <>
      <Card style={style}>
        <Card.Actions>
          <Button mode={'contained'} onPress={exportDB}>
            Export DB
          </Button>
          <Button mode={'contained'} onPress={importDatabase}>
            import DB
          </Button>
        </Card.Actions>
      </Card>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        {msg}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({});
