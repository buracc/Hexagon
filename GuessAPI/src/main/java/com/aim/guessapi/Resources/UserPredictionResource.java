/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Resources;

import com.aim.guessapi.Controllers.DBController;
import com.aim.guessapi.Objects.PredictionObj;
import com.aim.guessapi.Objects.UserPrediction;
import com.aim.guessapi.Objects.UserPredictionObj;
import java.io.IOException;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
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
@Path("userpreds")
public class UserPredictionResource {
    UserPredictionObj JSON;
    List<UserPrediction> userpreds = new ArrayList<>();
    final StringWriter sw = new StringWriter();
    final ObjectMapper mapper = new ObjectMapper();
    DBController db = new DBController();
    
    @GET
    @Path("/get/{userid}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPredictionByID(@PathParam("userid") int userid) throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        userpreds = db.getUserPredictions(userid);
        JSON = new UserPredictionObj(userpreds);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @GET
    @Path("/get/all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllPredictions() throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        userpreds = db.getAllUserPredictions();
        JSON = new UserPredictionObj(userpreds);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
}
