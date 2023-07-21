module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            await db.createCollection("songs", {
              capped: false,
              autoIndexId: true,
              validator: {
                $jsonSchema: {
                  title: "Song Object Validation",
                  bsonType: "object",
                  required: [ "title", "artist_ids", "url", "count" ],
                  properties: {
                    title: {
                      bsonType: "string",
                      description: "Song Name must be string and required"
                    },
                    artist_ids: {
                      bsonType: "array",
                      minItems: 1,
                      items: {
                        bsonType: "objectId",
                        description: "Artist ID must be UUID"
                      },
                      description: "Artist ID array must contain min 1 UUID and required"
                    },
                    url: {
                      bsonType: "string",
                      description: "Song Link must be string and required"
                    },
                    count: {
                      bsonType: "number",
                      description: "Song Count must be number and required"
                    }
                  }
                }
              }
            });
        });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            await db.dropCollection("songs");
        });
    } finally {
      await session.endSession();
    }
  }
};
