using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleMapMongoDb.Models
{
    public class Comment
    {
        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        [BsonIgnoreIfNull]
        public string Author { get; set; }

        [BsonElement]
        [BsonIgnoreIfNull]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Text { get; set; }
    }
}
