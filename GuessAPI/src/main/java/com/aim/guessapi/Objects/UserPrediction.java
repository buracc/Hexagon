/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Objects;

/**
 *
 * @author burak
 */
public class UserPrediction {
    
    private String name;
    private int amount, potential;

    public UserPrediction(String name, int amount, int potential) {
        this.name = name;
        this.amount = amount;
        this.potential = potential;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getPotential() {
        return potential;
    }

    public void setPotential(int potential) {
        this.potential = potential;
    }
    
    
}
