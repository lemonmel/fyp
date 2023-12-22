package expo.modules.tone

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ToneModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  private val tone = Tone()
  private val narrowband = NarrowbandNoise()
  private val notched = NotchedNoise()
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('Tone')` in JavaScript.
    Name("Tone")

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Audio function 
    Function("narrowbandPlay") {
      narrowband.play(tone.getFrequency(), tone.getPan())
      tone.play()
    }

    Function("narrowbandOnlyPlay") {
      narrowband.play(tone.getFrequency(), tone.getPan())
    }

    Function("notchedPlay") {
      notched.play(tone.getFrequency(), tone.getPan())
      tone.play()
    }

    Function("notchedOnlyPlay") {
      notched.play(tone.getFrequency(), tone.getPan())
    }

    Function("increaseThreshold") {
      tone.increaseThreshold()
    }

    Function("decreaseThreshold") {
      tone.decreaseThreshold()
    }

    Function("nextFreq") {
      tone.nextFreq()
      narrowband.setCurrentThreshold(tone.getFrequency())
      notched.setCurrentThreshold(tone.getFrequency())
    }

    // getter and setter
    Function("getThreshold") {
      return@Function tone.getThreshold()
    }

    Function("getDB") {
      return@Function tone.getDB()
    }

    Function("getFrequency") {
      return@Function tone.getFrequency()
    }

    Function("getAllFrequency") {
      return@Function tone.getAllFrequency()
    }

    Function("getDuration") {
      return@Function tone.getDuration()
    }

    Function("getPan") {
      return@Function tone.getPan()
    }

    Function("setPan") { pan: Int ->
      tone.setPan(pan);
    }

    Function("setFrequency") { frequency: IntArray ->
      tone.setFrequency(frequency);
    }

    Function("setThreshold") { threshold: Double ->
      tone.setThreshold(threshold);
    }

    Function("isAllTested") {
      return@Function tone.isAllTested() 
    }

    Function("revertSettings"){
      tone.revertSettings()
    }

    // result
    Function("addNarrowbandResult") { result: Double ->
      narrowband.pushResult(result)
    }

    Function("addNotchedResult") { result: Double ->
      notched.pushResult(result)
    }

    Function("resetResult") { 
      narrowband.resetResult()
      notched.resetResult()
    }

    Function("getNarrowbandResult"){ 
      return@Function narrowband.getResult()
    }

    Function("getNotchedResult"){ 
      return@Function notched.getResult()
    }

    // For lab test purpose
    // Function("stop") { 
    //  tone.stop()
    //  narrowband.stop()
    //  notched.stop()
    // }

    Function("tonePlay") { 
      tone.play()
    }

    Function("setNoiseThreshold"){ threshold: Double ->
      narrowband.setThreshold(threshold)
      notched.setThreshold(threshold)
    }

    Function("getNoiseThreshold"){ 
      return@Function narrowband.getThreshold()
    }

    Function("setNarrowbandOrder"){ order: Int ->
      narrowband.setOrder(order)
    }

    Function("setNotchedOrder"){ order: Int ->
      narrowband.setOrder(order)
    }

    Function("getOrder"){ 
      return@Function narrowband.getOrder()
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(ToneView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: ToneView, prop: String ->
        println(prop)
      }
    }
  }
}
