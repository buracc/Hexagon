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
public class UserPurchases {
    
    private int id, Reward_id, User_id;
    private String date, username, name;
    
    public UserPurchases(int id, int Reward_id, int User_id, String name, String username, String date) {
        this.id = id;
        this.Reward_id = Reward_id;
        this.User_id = User_id;
        this.date = date;
        this.name = name;
        this.username = username;
    }

    public UserPurchases(int id, int Reward_id, int User_id, String date) {
        this.id = id;
        this.Reward_id = Reward_id;
        this.User_id = User_id;
        this.date = date;
    }
    
    public UserPurchases(String name, String username, String date) {
        this.name = name;
        this.username = username;
        this.date = date;
    }

    public UserPurchases() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getReward_id() {
        return Reward_id;
    }

    public void setReward_id(int Reward_id) {
        this.Reward_id = Reward_id;
    }

    public int getUser_id() {
        return User_id;
    }

    public void setUser_id(int User_id) {
        this.User_id = User_id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    
    
    
}
