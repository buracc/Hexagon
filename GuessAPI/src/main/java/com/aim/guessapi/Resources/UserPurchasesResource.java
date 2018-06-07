/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Resources;

import com.aim.guessapi.Controllers.DBController;
import com.aim.guessapi.Objects.Bet;
import com.aim.guessapi.Objects.BetObj;
import com.aim.guessapi.Objects.Reward;
import com.aim.guessapi.Objects.UserObj;
import com.aim.guessapi.Objects.UserPurchases;
import com.aim.guessapi.Objects.UserPurchasesObj;
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

@Path("userpurchases")
public class UserPurchasesResource {
    
    UserPurchasesObj JSON;
    List<UserPurchases> userpurchases = new ArrayList<>();
    final StringWriter sw = new StringWriter();
    final ObjectMapper mapper = new ObjectMapper();
    DBController db = new DBController();
    
    @GET
    @Path("/get/all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllUserPurchases() throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        userpurchases = db.getAllUserPurchases();
        JSON = new UserPurchasesObj(userpurchases);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @GET
    @Path("/get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPurchaseById(@PathParam("id") int id) throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        userpurchases = db.getPurchasesById(id);
        JSON = new UserPurchasesObj(userpurchases);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @POST
    @Path("/buy")
    @Produces(MediaType.TEXT_PLAIN)
    public String buyItem(String JSONmsg) throws IOException {
        UserPurchases u = mapper.readValue(JSONmsg, UserPurchases.class);
        return db.buyReward(u);
    }
    
}
