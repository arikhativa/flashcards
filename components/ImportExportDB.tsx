import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Button, Card, Snackbar} from 'react-native-paper';
import RNFS from 'react-native-fs';
import {DB_NAME} from '../db/AppDataSource';

const currentDbPath = `${RNFS.DocumentDirectoryPath}/../databases/${DB_NAME}`;
const exportPath = `${RNFS.DownloadDirectoryPath}/exported-database.db`; // Or any other path you prefer

interface Props {
  style?: StyleProp<ViewStyle>;
}

export default function ImportExportDB({style}: Props) {
  const [msg, setMsg] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  // async function donload() {
  //   downloadFile(
  //     'https://raw.githubusercontent.com/arikhativa/random/refs/heads/main/exported-database.db',
  //   );
  // }

  // const downloadFile = async url => {
  //   const path = `${RNFS.DocumentDirectoryPath}`;
  //   try {
  //     // Start the file download
  //     const downloadResult = await RNFS.downloadFile({
  //       fromUrl: url,
  //       toFile: currentDbPath,
  //     }).promise;

  //     if (downloadResult.statusCode === 200) {
  //       setMsg(`File downloaded successfully: ${currentDbPath}`);
  //       onToggleSnackBar();
  //     } else {
  //       setMsg(
  //         `Failed to download file. Status code: ${downloadResult.statusCode}`,
  //       );
  //       onToggleSnackBar();
  //     }
  //   } catch (error) {
  //     onToggleSnackBar();
  //     setMsg('Error downloading file:' + error);
  //   }
  // };

  const exportDB = async () => {
    try {
      await RNFS.copyFile(currentDbPath, exportPath);
      console.log('Database exported to:', exportPath);
    } catch (error) {
      setMsg('Error importing database' + error);
      onToggleSnackBar();
    }
  };

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <Card style={style}>
        <Card.Actions>
          <Button mode={'contained'} onPress={exportDB}>
            Export DB
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
