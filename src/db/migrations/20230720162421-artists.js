module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            await db.createCollection("artists", {
              capped: false,
              autoIndexId: true,
              validator: {
                $jsonSchema: {
                  title: "Artist Object Validation",
                  bsonType: "object",
                  required: [ "name" ],
                  properties: {
                    name: {
                      bsonType: "string",
                      description: "Artist Name must be string and required"
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
            await db.dropCollection("artists");
        });
    } finally {
      await session.endSession();
    }
  }
};
