import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to Tone.web.ts
// and on native platforms to Tone.ts
import ToneModule from './src/ToneModule';
import ToneView from './src/ToneView';
import { ChangeEventPayload, ToneViewProps } from './src/Tone.types';

export async function setValueAsync(value: string) {
  return await ToneModule.setValueAsync(value);
}

const emitter = new EventEmitter(ToneModule ?? NativeModulesProxy.Tone);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ToneView, ToneViewProps, ChangeEventPayload };

// audio control
export function narrowbandPlay(): void {
  ToneModule.narrowbandPlay();
}

export function narrowbandOnlyPlay(): void {
  ToneModule.narrowbandOnlyPlay();
}

export function notchedPlay(): void {
  ToneModule.notchedPlay();
}

export function notchedOnlyPlay(): void {
  ToneModule.notchedOnlyPlay();
}

export function decreaseThreshold(): void {
  ToneModule.decreaseThreshold();
}

export function increaseThreshold(): void {
  ToneModule.increaseThreshold();
}

export function nextFreq(): void {
  ToneModule.nextFreq();
}

// getter and setter
export function setPan(pan: number): void {
  ToneModule.setPan(pan);
}

export function setFrequency(frequency: number[]): void {
  ToneModule.setFrequency(frequency);
}

export function setThreshold(threshold: number): void {
  ToneModule.setThreshold(threshold);
}

export function getThreshold(): number { 
  return ToneModule.getThreshold();
}

export function getDB(): number {
  return ToneModule.getDB();
}

export function getFrequency(): number { 
  return ToneModule.getFrequency();
}

export function getAllFrequency(): number[] { 
  return ToneModule.getAllFrequency();
}

export function getDuration(): number { //not used
  return ToneModule.getDuration();
}

export function getPan(): number {
  return ToneModule.getPan();
}

export function isAllTested(): Boolean {
  return ToneModule.isAllTested();
}

export function revertSettings(): void {
  ToneModule.revertSettings();
}

// result
export function addNotchedResult(result: number): void{
  ToneModule.addNotchedResult(result);
}

export function addNarrowbandResult(result: number): void{
  ToneModule.addNarrowbandResult(result);
}

export function getNarrowbandResult(): number[]{
  return ToneModule.getNarrowbandResult();
}

export function getNotchedResult(): number[]{
  return ToneModule.getNotchedResult();
}

export function resetResult(): void{
  ToneModule.resetResult();
}

// lab use
export function stop(): void{
  ToneModule.stop();
}

export function tonePlay(): String{
  return ToneModule.tonePlay();
}

export function setNoiseThreshold(threshold: number): void {
  ToneModule.setNoiseThreshold(threshold);
}

export function setNotchedOrder(order: number): void{
  ToneModule.setNotchedOrder(order);
}

export function setNarrowbandOrder(order: number): void{
  ToneModule.setNarrowbandOrder(order);
}

export function getOrder(): number{
  return ToneModule.getOrder();
}

export function getNoiseThreshold(): number{
  return ToneModule.getNoiseThreshold();
}
