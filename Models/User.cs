using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleMapMongoDb.Models
{
    public class User
    {
        [BsonId]
        public int Id { get; set; }
        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Name { get; set; }
        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Email { get; set; }
        [BsonElement]
        public Address Address { get; set; }
        [BsonIgnoreIfNull]
        public int? TotalPages { get; set; }
    }
}
