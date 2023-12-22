import * as React from 'react';

import { ToneViewProps } from './Tone.types';

export default function ToneView(props: ToneViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
