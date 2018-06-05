/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Resources;

import com.aim.guessapi.Controllers.DBController;
import com.aim.guessapi.Objects.User;
import com.aim.guessapi.Objects.UserObj;
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
import org.codehaus.jackson.annotate.JsonAutoDetect.Visibility;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author burak
 */

@Path("user")
public class UserResource {
    
    UserObj JSON;
    List<User> users = new ArrayList<>();
    final StringWriter sw = new StringWriter();
    final ObjectMapper mapper = new ObjectMapper();
    DBController db = new DBController();
    
    @GET
    @Path("/get/id/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUserByID(@PathParam("id") int id) throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, Visibility.ANY);
        users = db.getUserByID(id);
        JSON = new UserObj(users);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @GET
    @Path("/get/name/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUserByName(@PathParam("name") String name) throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, Visibility.ANY);
        users = db.getUserByName(name);
        JSON = new UserObj(users);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @GET
    @Path("/get/all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllUsersDesc() throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, Visibility.ANY);
        users = db.getAllPlayersDesc();
        JSON = new UserObj(users);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @POST
    @Path("/new")
    @Produces(MediaType.TEXT_PLAIN)
    public String newUser(String JSONmsg) throws IOException {
        User u = mapper.readValue(JSONmsg, User.class);
        return db.addNewUser(u);
    }
    
    @POST
    @Path("/team")
    @Produces(MediaType.TEXT_PLAIN)
    public String setTeam(String JSONmsg) throws IOException {
        User u = mapper.readValue(JSONmsg, User.class);
        return db.setTeam(u);
    }
    
}
