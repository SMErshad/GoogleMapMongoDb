using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleMapMongoDb.Models
{
    public class Service
    {
        //[BsonId]
        //public int Id { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Name { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Type { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Description { get; set; }        

        [BsonElement]
        //[BsonRepresentation(MongoDB.Bson.BsonType.Double)]
        public Double[] serviceRating { get; set; }

        [BsonElement]
        //[BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string[] serviceComments { get; set; }
    }
}
