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
public class Team {
    
    private int id, pts;
    private String name;

    public Team(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    public Team(int id, String name, int pts) {
        this.id = id;
        this.name = name;
        this.pts = pts;
    }
    
    public Team() {
        
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

    public int getPts() {
        return pts;
    }

    public void setPts(int pts) {
        this.pts = pts;
    }
    
    
}
