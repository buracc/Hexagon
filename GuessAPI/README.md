### API documentation

This is the Java backend which handles all HTTP requests that are sent through the application, which are then used to manipulate data in the MySQL database.

The API is split in three parts:
- Controllers
- Objects
- Resources

#### Controllers
This package contains the DBController class. This class handles everything related to the MySQL database, and executes queries.

#### Objects
This package contains all objects that will be created when data is being gathered or manipulated. For example, a User() object will be created when retrieving data about a User from the database.

#### Resources
This package contains the methods that handle HTTP requests. For example, when I want to retrieve data of a User from the database, I send a request through www.api-url.com/api/user/get/userid, and it sends me a JSON response containing an array with the information about the user I requested. This JSON response is used in the application itself.

