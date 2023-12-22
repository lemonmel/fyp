package expo.modules.tone;

import java.util.ArrayList;

public class Noise {
    double duration = 0.5;
    int sampleRate = 44100;
    double threshold = 0.1;
    int order = 10;
    private ArrayList<Double> result = new ArrayList<>();

    public void setThreshold(double threshold) {
        this.threshold = threshold;
    }

    public void setCurrentThreshold(int frequency) {
        if (frequency == 500 || frequency == 1000 || frequency == 4000) {
            setThreshold(0.1);
        } else if (frequency == 2000) {
            setThreshold(0.05);
        } else if (frequency == 8000) {
            setThreshold(0.04);
        }
    }

    public double getThreshold() {
        return this.threshold;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public int getOrder() {
        return this.order;
    }

    public void pushResult(double result) {
        // if (pan == 0) {
        // this.leftResult.add(result);
        // } else {
        // this.rightResult.add(result);
        // }
        this.result.add(result);
    }

    public ArrayList<Double> getResult() {
        // if (pan == 0) {
        // return this.leftResult;
        // } else {
        // return this.rightResult;
        // }
        return this.result;
    }

    public void resetResult() {
        // this.leftResult = new ArrayList<>();
        // this.rightResult = new ArrayList<>();
        this.result = new ArrayList<>();
        this.threshold = 0.1;
    }
}
