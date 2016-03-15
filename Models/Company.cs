using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleMapMongoDb.Models
{
   
    public class Company
    {
        //[BsonId]
        //public ObjectId _id { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string PlaceId { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Name { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonIgnoreIfNull]
        public string Email { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.Double)]
        public Double Rating { get; set; }

        [BsonElement]
        [BsonIgnoreIfNull]
        public Department Department { get; set; }

        [BsonElement]
        [BsonIgnoreIfNull]
        public Product Product { get; set; }

        [BsonElement]
        [BsonIgnoreIfNull]
        public Service[] Services { get; set; }



        public Comment[] Comments { get; set; }
        //[BsonElement]
        //public Address Address { get; set; }
        //[BsonIgnoreIfNull]
        //public int? TotalPages { get; set; }
        public string[] UsersComments { get; set; }
    }
}
