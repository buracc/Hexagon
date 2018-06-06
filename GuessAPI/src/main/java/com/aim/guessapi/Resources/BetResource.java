/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Resources;

import com.aim.guessapi.Controllers.DBController;
import com.aim.guessapi.Objects.Bet;
import com.aim.guessapi.Objects.BetObj;
import java.io.IOException;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author burak
 */
@Path("bet")
public class BetResource {
    
    BetObj JSON;
    List<Bet> bets = new ArrayList<>();
    final StringWriter sw = new StringWriter();
    final ObjectMapper mapper = new ObjectMapper();
    DBController db = new DBController();
    
    @GET
    @Path("/get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getBetByID(@PathParam("id") int id) throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        bets = db.getBetByID(id);
        JSON = new BetObj(bets);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @GET
    @Path("/get/all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllBets() throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        bets = db.getAllBets();
        JSON = new BetObj(bets);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @POST
    @Path("/change")
    @Produces(MediaType.TEXT_PLAIN)
    public String predictionResult(String JSONmsg) throws IOException {
        Bet b = mapper.readValue(JSONmsg, Bet.class);
        return db.changeOdds(b);
    }
}
