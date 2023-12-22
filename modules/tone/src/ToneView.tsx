import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ToneViewProps } from './Tone.types';

const NativeView: React.ComponentType<ToneViewProps> =
  requireNativeViewManager('Tone');

export default function ToneView(props: ToneViewProps) {
  return <NativeView {...props} />;
}
