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
public class Bet {
    
    private int id;
    private String name;
    private double multiplier;

    public Bet(int id, String name, double multiplier) {
        this.id = id;
        this.name = name;
        this.multiplier = multiplier;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMultiplier() {
        return multiplier;
    }

    public void setMultiplier(double multiplier) {
        this.multiplier = multiplier;
    }
    
    
}
