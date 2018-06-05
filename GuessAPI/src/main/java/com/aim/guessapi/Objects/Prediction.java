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
public class Prediction {
    
    public int id, amount, Bet_id, User_id;

    public Prediction(int id, int amount, int Bet_id, int User_id) {
        this.id = id;
        this.amount = amount;
        this.Bet_id = Bet_id;
        this.User_id = User_id;
    }
    
    public Prediction() {
        
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getBet_id() {
        return Bet_id;
    }

    public void setBet_id(int Bet_id) {
        this.Bet_id = Bet_id;
    }

    public int getUser_id() {
        return User_id;
    }

    public void setUser_id(int User_id) {
        this.User_id = User_id;
    }
    
    
}
