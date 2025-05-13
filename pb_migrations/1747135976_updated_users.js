migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "u8dvtqyn",
        name: "teams",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "o286g391952tjiv",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: null,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // remove
    collection.schema.removeField("u8dvtqyn");

    return dao.saveCollection(collection);
  },
);
