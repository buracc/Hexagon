package com.aim.guessapi.Controllers;

import com.aim.guessapi.Objects.Bet;
import com.aim.guessapi.Objects.Prediction;
import com.aim.guessapi.Objects.Team;
import com.aim.guessapi.Objects.User;
import com.aim.guessapi.Objects.UserPrediction;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author burak
 */
public class DBController {
    
    private Connection conn;
    private PreparedStatement pst;
    private ResultSet rs;
    
    private final String IP = "79.143.178.40";
    private final String USER = "chin";
    private final String PASS = "112123";
    
    public void Connect() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return;
        }

        try {
            conn = DriverManager.getConnection("jdbc:mysql://" + IP + ":3306/pred", USER, PASS);
        } catch (SQLException e) {
            System.out.println("sql failed to connect");
            e.printStackTrace();
        }
    }
    
    public List<User> getUserByID(int id) throws SQLException {
        String q = "SELECT u.*, t.name as team_name FROM User u, Team t WHERE t.id = u.Team_id AND u.id = '" + id + "'";
        return fetchUserFromDB(q);
    }
    
    public List<User> getUserByName(String name) throws SQLException {
        String q = "SELECT u.*, t.name as team_name FROM User u, Team t WHERE t.id = u.Team_id AND u.name = '" + name + "'";
        return fetchUserFromDB(q);
    }
    
    public List<User> getAllPlayersDesc() throws SQLException {
        String q = "SELECT u.*, t.name as team_name FROM User u, Team t WHERE t.id = u.Team_id ORDER BY u.pts DESC";
        return fetchUserFromDB(q);
    }
    
    public List<Bet> getBetByID(int id) throws SQLException {
        String q = "SELECT * FROM Bet WHERE id = '" + id + "'";
        return fetchBetFromDB(q);
    }
    
    public List<Bet> getAllBets() throws SQLException {
        String q = "SELECT * FROM Bet";
        return fetchBetFromDB(q);
    }
    
    public List<Team> getAllTeams() throws SQLException {
        String q = "SELECT * FROM Team";
        return fetchTeamFromDB(q);
    }
    
    public List<Prediction> getPredictionsByUserID(int userid) throws SQLException {
        String q = "SELECT * FROM Prediction WHERE User_id = '" + userid + "'";
        return fetchPredictionsFromDB(q);
    }
    
    public List<Prediction> getAllPredictions() throws SQLException {
        String q = "SELECT * FROM Prediction";
        return fetchPredictionsFromDB(q);
    }
    
    public List<UserPrediction> getUserPredictions(int userid) throws SQLException {
        String q =  "SELECT b.name, p.amount, (p.amount * b.multiplier) as potential\n" +
                    "FROM Bet b, Prediction p, User u\n" +
                    "WHERE b.id = p.Bet_id\n" +
                    "AND u.id = p.User_id\n" +
                    "AND u.id = " + userid;
        return fetchUserPredictionsFromDB(q);
    }
    
    public List<User> fetchUserFromDB(String q) throws SQLException {
        Connect();
        List<User> users = new ArrayList();
        
        try {
            pst = conn.prepareStatement(q);
            rs = pst.executeQuery();
            
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int pts = rs.getInt("pts");
                int Team_id = rs.getInt("Team_id");
                String team_name = rs.getString("team_name");
                
                User u = new User(id, pts, Team_id, name, team_name);
                users.add(u);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        conn.close();
        return users;
    }
    
    public List<Bet> fetchBetFromDB(String q) throws SQLException {
        Connect();
        List<Bet> bets = new ArrayList();
        
        try {
            pst = conn.prepareStatement(q);
            rs = pst.executeQuery();
            
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                double multiplier = rs.getDouble("multiplier");
                
                if (name.startsWith("eom_")) {
                   if (name.endsWith("win_a")) {
                       name = "Team A to win the entire match.";
                   } 
                   if (name.endsWith("win_b")) {
                       name = "Team B to win the entire match.";
                   }
                   if (name.endsWith("objective")) {
                       name = "Match will have more objective wins.";
                   }
                   if (name.endsWith("kills")) {
                       name = "Match will have more kill wins.";
                   }
                }
                
                if (name.startsWith("live_")) {
                   if (name.endsWith("round_a")) {
                       name = "Team A to win this round.";
                   } 
                   if (name.endsWith("round_b")) {
                       name = "Team B to win this round.";
                   }
                   if (name.endsWith("fb_a")) {
                       name = "Team A to get the first kill.";
                   }
                   if (name.endsWith("fb_b")) {
                       name = "Team B to get the first kill.";
                   }
                }
                Bet b = new Bet(id, name, multiplier);
                bets.add(b);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        conn.close();
        return bets;
    }
    
    public List<Team> fetchTeamFromDB(String q) throws SQLException {
        Connect();
        List<Team> teams = new ArrayList();
        
        try {
            pst = conn.prepareStatement(q);
            rs = pst.executeQuery();
            
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                
                Team t = new Team(id, name);
                teams.add(t);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        conn.close();
        return teams;
    }
    
    public List<Prediction> fetchPredictionsFromDB(String q) throws SQLException {
        Connect();
        List<Prediction> predictions = new ArrayList();
        
        try {
            pst = conn.prepareStatement(q);
            rs = pst.executeQuery();
            
            while (rs.next()) {
                int id = rs.getInt("id");
                int amount = rs.getInt("amount");
                int Bet_id = rs.getInt("Bet_id");
                int User_id = rs.getInt("User_id");
                
                Prediction p = new Prediction(id, amount, Bet_id, User_id);
                predictions.add(p);
                
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        conn.close();
        return predictions;
    }
    
    public List<UserPrediction> fetchUserPredictionsFromDB(String q) throws SQLException {
        Connect();
        List<UserPrediction> userpreds = new ArrayList();
        
        try {
            pst = conn.prepareStatement(q);
            rs = pst.executeQuery();
            
            while (rs.next()) {
                String name = rs.getString("name");
                int amount = rs.getInt("amount");
                int potential = rs.getInt("potential");
                
                if (name.startsWith("eom_")) {
                   if (name.endsWith("win_a")) {
                       name = "Team A to win the entire match.";
                   } 
                   if (name.endsWith("win_b")) {
                       name = "Team B to win the entire match.";
                   }
                   if (name.endsWith("objective")) {
                       name = "Match will have more objective wins.";
                   }
                   if (name.endsWith("kills")) {
                       name = "Match will have more kill wins.";
                   }
                }
                
                if (name.startsWith("live_")) {
                   if (name.endsWith("round_a")) {
                       name = "Team A to win this round.";
                   } 
                   if (name.endsWith("round_b")) {
                       name = "Team B to win this round.";
                   }
                   if (name.endsWith("fb_a")) {
                       name = "Team A to get the first kill.";
                   }
                   if (name.endsWith("fb_b")) {
                       name = "Team B to get the first kill.";
                   }
                }
                
                UserPrediction up = new UserPrediction(name, amount, potential);
                userpreds.add(up);
                
            }
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        conn.close();
        return userpreds;
    }
    
    public String addNewUser(User u) {
        Connect();
        String q = "INSERT INTO User (name, pts, Team_id) VALUES (?, ?, 4)";
        
        try {
            pst = conn.prepareStatement(q);
            pst.setString(1, u.getName());
            pst.setInt(2, u.getPts());
            pst.executeUpdate();
            conn.close();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
    public String setTeam(User u) {
        Connect();
        String q = "UPDATE User u SET u.Team_id = (SELECT id from Team t where t.name = ?) WHERE u.name = ?";
        
        try {
            pst = conn.prepareStatement(q);
            pst.setString(1, u.getTeam_name());
            pst.setString(2, u.getName());
            pst.executeUpdate();
            conn.close();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
    public String newPrediction(Prediction p) {
        Connect();
        String q = "UPDATE pred.User SET pts = (pts - ?) WHERE id = ?;";
        String q2 = "INSERT INTO pred.Prediction (amount, Bet_id, User_id) VALUES (?, ?, ?);";
        
        try {
            pst = conn.prepareStatement(q);
            PreparedStatement pst2 = conn.prepareStatement(q2);
            
            pst.setInt(1, p.getAmount());
            pst.setInt(2, p.getUser_id());
            pst2.setInt(1, p.getAmount());
            pst2.setInt(2, p.getBet_id());
            pst2.setInt(3, p.getUser_id());
            
            pst.executeUpdate();
            pst2.executeUpdate();
            conn.close();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
    public String predictionResult(Prediction p) {
        Connect();
        String q = "CALL give_pts(?, ?);";
        
        try {
            pst = conn.prepareStatement(q);
            
            pst.setInt(1, p.getBet_id());
            pst.setInt(2, p.getId());
            
            pst.executeUpdate();
            conn.close();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
    public String changeOdds(Bet b) {
        Connect();
        String q = "UPDATE Bet SET multiplier = ? WHERE id = ?;";
        
        try {
            pst = conn.prepareStatement(q);
            
            pst.setDouble(1, b.getMultiplier());
            pst.setInt(2, b.getId());
            
            pst.executeUpdate();
            conn.close();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return null;
    }
    
}
