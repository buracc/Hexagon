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
public class User {
    private int id, pts, Team_id;
    private String name, team_name;

    public User(int id, int pts, int Team_id, String name, String team_name) {
        this.id = id;
        this.pts = pts;
        this.Team_id = Team_id;
        this.name = name;
        this.team_name = team_name;
    }
    
    public User() {
        
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPts() {
        return pts;
    }

    public void setPts(int pts) {
        this.pts = pts;
    }

    public int getTeam_id() {
        return Team_id;
    }

    public void setTeam_id(int Team_id) {
        this.Team_id = Team_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }
    
    
    
}
