import { Dispatch, SetStateAction } from 'react';

export type Option = { label: string; value: string | number };

export type Options = Option[];

export type SetOption = Dispatch<SetStateAction<Option>>;

export type GlobalContext = {
  satellite: Option;
  setSatellite: SetOption;
  satellites: Option[];
  composite: Option;
  setComposite: SetOption;
  composites: Option[];
  visualization: Option;
  setVisualization: SetOption;
  visualizations: Option[];
};
