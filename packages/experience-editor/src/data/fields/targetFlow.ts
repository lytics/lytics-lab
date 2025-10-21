import { Field, Flow } from "../pfa-fields";

export const TargetFlowStep: Field = {
  id: "flowStep",
  label: "Flow Step",
  description: "Which step of the Flow?",
  required: false,
  hidden: true,
  type: "string",
  method: "select",
  render: "details.target.flow.step",
};

export const TargetFlowVersion: Field = {
  id: "flowVersion",
  label: "Flow Version",
  description: "Which version of the Flow?",
  required: false,
  hidden: true,
  type: "string",
  method: "select",
  render: "details.target.flow.version",
};

export const TargetFlow: Field = {
  id: "flow",
  label: "Flow",
  description: "Which Flow to target",
  required: false,
  hidden: true,
  type: "string",
  method: "select",
  render: "details.target.flow.id",
};

export const TargetFlowWithOptions = (flows: Flow[]) => {
  let payload = TargetFlow;
  payload.options = flows.reduce((acc, flow) => {
    acc.push({ label: flow.label, value: flow.value });
    return acc;
  }, []);
  return payload;
};

export const TargetFlowVersionWithOptions = (flows: Flow[], id: string) => {
  let payload = TargetFlowVersion;
  payload.options = flows
    .find((flow) => flow.value === id)
    .versions.map((v) => ({
      label: v.version.toString(),
      value: v.version.toString(),
    }));
  return payload;
};

export const TargetFlowStepWithOptions = (
  flows: Flow[],
  id: string,
  version: string,
) => {
  let payload = TargetFlowStep;
  payload.options = flows
    .find((flow) => flow.value === id)
    .versions.find((v) => v.version.toString() === version).steps;
  return payload;
};
