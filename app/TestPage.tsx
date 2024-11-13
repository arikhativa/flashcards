import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import TagComponent from "@/components/Tag";
import { ComponentProps, CRUDMode, ObjType } from "@/types/generic";
import CardComponent from "@/components/Card";
import NotFoundScreen from "./+not-found";
import TestForm from "@/components/TestForm";

type localSearchParams = {};

const TestPage: React.FC = () => {
  // const {  } = useLocalSearchParams<localSearchParams>();

  return <TestForm></TestForm>;
};

export default TestPage;
