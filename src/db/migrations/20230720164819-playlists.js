module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            await db.createCollection("playlists", {
              capped: false,
              autoIndexId: true,
              validator: {
                $jsonSchema: {
                  title: "Playlist Object Validation",
                  bsonType: "object",
                  required: [ "song_id" ],
                  properties: {
                    song_id: {
                      bsonType: "objectId",
                      description: "Playlist Song ID must be UUID and required"
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
            await db.dropCollection("playlists");
        });
    } finally {
      await session.endSession();
    }
  }
};
