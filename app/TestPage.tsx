import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import TagComponent from "@/components/Tag";
import { ComponentProps, CRUDMode, ObjType } from "@/types/generic";
import CardComponent from "@/components/Card";
import NotFoundScreen from "./+not-found";
import TestForm from "@/components/TestForm";
import { EMPTY_TEST_SETTING, TestSettings } from "@/types/TestSettings";
import TestManager from "@/components/TestManager";

type localSearchParams = {};

const TestPage: React.FC = () => {
  // const {  } = useLocalSearchParams<localSearchParams>();
  const navigation = useNavigation();
  const [isTestSetupDone, setIsTestSetupDone] = useState(false);
  const [testSettings, setTestSettings] =
    useState<TestSettings>(EMPTY_TEST_SETTING);

  useEffect(() => {
    navigation.setOptions({ title: "", headerShown: false });
    setTestSettings({
      ...testSettings,
      selectedTags: [],
    });
  }, []);

  return (
    <>
      {isTestSetupDone ? (
        <TestManager testSettings={testSettings}></TestManager>
      ) : (
        <TestForm
          testSettings={testSettings}
          setTestSettings={setTestSettings}
          onSubmit={() => setIsTestSetupDone(true)}
        ></TestForm>
      )}
    </>
  );
};

export default TestPage;
