using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleMapMongoDb.Models
{
    public class Address
    {
        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string City { get; set; }
        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string State { get; set; }
        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Zip { get; set; }
    }
}
