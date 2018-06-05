/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Objects;

import java.util.List;

/**
 *
 * @author burak
 */
public class PredictionObj {
    
    private List<Prediction> pred;
    
    public PredictionObj(List<Prediction> preds) {
        this.pred = preds;
    }
    
    public PredictionObj() {
        
    }

    @Override
    public String toString() {
        return "PredictionObj{" + "pred=" + pred + '}';
    }
    
    
}
