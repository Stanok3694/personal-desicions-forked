import React, { Component } from "react";
import { ApiRoutes } from "../configs";

import { GetData } from "../hoc";
import { WorkersList } from "../components/Workers";

const ScreensWorkers = () => GetData(WorkersList, ApiRoutes.getAllWorkers);

export default ScreensWorkers();